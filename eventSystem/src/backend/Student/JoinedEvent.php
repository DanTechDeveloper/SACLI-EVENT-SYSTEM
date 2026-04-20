<?php
include '../connect.php';
session_start();

// Security: Siguraduhing naka-login ang user
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Unauthorized access."]);
    exit;
}

try {
    $data = json_decode(file_get_contents("php://input"), true);
    $event_id = $data['event_id'] ?? null;
    $student_id = $_SESSION['user_id'];

    if (!$event_id) {
        throw new Exception("Missing Event ID.");
    }

    // Check muna kung naka-join na para maiwasan ang duplicate entry
    $checkSql = "SELECT 1 FROM event_participants WHERE event_id = :event_id AND student_id = :student_id";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->execute([':event_id' => $event_id, ':student_id' => $student_id]);

    if ($checkStmt->fetch()) {
        // Kung gusto mong mag-toggle (unjoin), dito ka maglalagay ng DELETE statement.
        // Pero sa registration flow, karaniwan ay "Already joined" ang sasabihin natin.
        echo json_encode(["success" => true, "message" => "You have already joined this event."]);
        exit;
    }

    // INSERT action para maging "Joined" ang status
    $sql = "INSERT INTO event_participants (event_id, student_id) VALUES (:event_id, :student_id)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([':event_id' => $event_id, ':student_id' => $student_id]);

    echo json_encode(["success" => true, "message" => "Successfully joined the event!"]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>