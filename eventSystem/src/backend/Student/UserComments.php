<?php

include '../connect.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Unauthorized."]);
    exit;
}

try {
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        // Kumuha ng comments para sa specific na event
        $event_id = $_GET['event_id'] ?? null;
        if (!$event_id) {
            echo json_encode(["success" => false, "message" => "Missing event_id."]);
            exit;
        }
        $sql = "SELECT uc.*, u.fullName 
                FROM users_comments uc
                JOIN users u ON uc.student_id = u.id
                WHERE uc.event_id = :event_id
                ORDER BY uc.created_at DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute([':event_id' => $event_id]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(["success" => true, "data" => ["tableRows" => $data]]);

    } elseif ($method === 'POST') {
        $body             = json_decode(file_get_contents("php://input"), true);
        $comment          = $body['comment']            ?? null;
        $participation_id = $body['participation_id']   ?? null;

        if (!$comment || !$participation_id) {
            echo json_encode(["success" => false, "message" => "Missing required fields."]);
            exit;
        }

        // Kunin ang event_id at student_id mula sa DB — hindi na kailangan pa sa frontend
        // At i-verify na ang participation_id ay talaga pag-aari ng current session user
        $checkSql = "SELECT event_id, student_id FROM event_participants 
                     WHERE id = :participation_id AND student_id = :session_user";
        $checkStmt = $conn->prepare($checkSql);
        $checkStmt->execute([
            ':participation_id' => $participation_id,
            ':session_user'     => $_SESSION['user_id'],
        ]);
        $participant = $checkStmt->fetch(PDO::FETCH_ASSOC);

        if (!$participant) {
            echo json_encode(["success" => false, "message" => "Invalid participation or unauthorized."]);
            exit;
        }

        $sql = "INSERT INTO users_comments (event_id, student_id, participation_id, comment) 
                VALUES (:event_id, :student_id, :participation_id, :comment)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ':event_id'         => $participant['event_id'],
            ':student_id'       => $participant['student_id'],
            ':participation_id' => $participation_id,
            ':comment'          => $comment,
        ]);
        echo json_encode(["success" => true, "message" => "Comment posted successfully."]);
    }

} catch (\Throwable $th) {
    echo json_encode(["success" => false, "message" => $th->getMessage()]);
}

?>