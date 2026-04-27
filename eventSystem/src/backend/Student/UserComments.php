<?php

include '../connect.php';
session_start();
// Ensure PHP uses the same timezone as the DB for accurate relative time calculations
date_default_timezone_set('Asia/Manila'); 

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Unauthorized."]);
    exit;
}

/**
 * Converts a datetime string into a human-readable relative format.
 */
function formatTimeAgo($datetime) {
    $time = strtotime($datetime);
    $diff = time() - $time;

    if ($diff < 60) {
        return "Just Now";
    }

    $intervals = [
        31536000 => 'year',
        2592000  => 'month',
        604800   => 'w',
        86400    => 'd',
        3600     => 'h',
        60       => 'm'
    ];

    foreach ($intervals as $seconds => $label) {
        if ($diff >= $seconds) {
            $quantity = floor($diff / $seconds);
            return $quantity . $label . " ago";
        }
    }
    return "Just Now";
}

try {
    $conn->exec("SET time_zone = '+08:00';");
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'POST') {
        $data = file_get_contents("php://input");
        $data = json_decode($data, true);
        $participation_id = $data['participation_id'] ?? null;
        $comment_description = $data['comment_description'] ?? null;

        if (!$participation_id || !$comment_description) {
            echo json_encode(["success" => false, "message" => "Comment description and participation ID are required."]);
            exit;
        }

        $sql = "INSERT INTO users_comment (event_participant_id, comment_description) 
                VALUES (:event_participant_id, :comment_description) ";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ':event_participant_id' => $participation_id,
            ':comment_description' => $comment_description,
        ]);
        echo json_encode(["success" => true, "message" => "Comment posted successfully."]);
    } else if ($method === 'GET') {
        $participation_id = $_GET['participation_id'] ?? null;
        if (!$participation_id) {
            echo json_encode(["success" => false, "message" => "Participation ID is required."]);
            exit;
        }

        $sql = "SELECT 
    s.fullName, 
    c.comment_description,
    c.created_at
FROM users_comment c
JOIN event_participants ep ON c.event_participant_id = ep.id
JOIN students s ON ep.student_id = s.id
WHERE c.event_participant_id = :participation_id";

$stmt = $conn->prepare($sql);
$stmt->execute(['participation_id' => $participation_id]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($result as &$row) {
    $row['created_at'] = formatTimeAgo($row['created_at']);
}

echo json_encode(["success" => true, "commentData" => $result]);
    }
} catch (\Throwable $th) {
    echo json_encode(["success" => false, "message" => $th->getMessage()]);
}

?>