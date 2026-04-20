<?php
include '../connect.php';

session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Not authorized"]);
    exit;
}

try {
    $student_id = $_SESSION['user_id'];
    $conn->exec("SET time_zone = '+08:00';");

    $sql = "
        SELECT 
            e.id,
            e.title,
            e.description,
            e.category,
            DATE_FORMAT(e.event_date, '%M %d, %Y') AS date,
            TIME_FORMAT(e.event_time, '%h:%i %p') AS time,
            e.criteria,
            e.location
        FROM events e
        INNER JOIN event_participants eu
            ON e.id = eu.event_id
        WHERE eu.student_id = :student_id
        ORDER BY e.created_at DESC;
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':student_id', $student_id, PDO::PARAM_INT);
    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true, 
        "data" => $rows
    ]);

} catch (Exception $th) {
    echo json_encode(["success" => false, "message" => "Error: " . $th->getMessage()]);
}
?>