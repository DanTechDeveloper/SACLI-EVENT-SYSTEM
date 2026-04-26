<?php

include '../connect.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Unauthorized."]);
    exit;
}

try {
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'POST') {
        $data = file_get_contents("php://input");
        $data = json_decode($data, true);
        $participation_id = $data['participation_id'];



        $comment_description = $data['comment_description']; // Assuming comment_description is also sent in the input
        $sql = "INSERT INTO users_comment (event_participant_id, comment_description) 
                VALUES (:event_participant_id, :comment_description) ";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ':event_participant_id' => $participation_id,
            ':comment_description' => $comment_description,
        ]);
        echo json_encode(["success" => true, "message" => "Comment posted successfully."]);
    } else if ($method === 'GET') {
$event_id = $_GET['event_id'];
        $sql = "SELECT 
    u.fullName, 
    c.comment_description, 
    u.id
FROM users_comment c
JOIN event_participants ep ON c.event_participant_id = ep.id
JOIN students u ON ep.student_id = u.id
WHERE ep.event_id = :event_id";

$stmt = $conn->prepare($sql);
$stmt->execute(['event_id' => $event_id]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode(["success" => true, "commentData" => $result]);
    }
} catch (\Throwable $th) {
    echo json_encode(["success" => false, "message" => $th->getMessage()]);
}

?>