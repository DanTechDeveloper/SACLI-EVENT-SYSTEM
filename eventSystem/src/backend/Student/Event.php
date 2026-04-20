<?php
include '../connect.php';
session_start();

try {
    $filter = isset($_GET['filter']) ? $_GET['filter'] : 'all';
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
    e.location,
    CASE 
        WHEN eu.event_id IS NULL THEN 0 
        ELSE 1 
    END AS joined
FROM events e
LEFT JOIN event_participants eu
    ON e.id = eu.event_id
   AND eu.student_id = :student_id
WHERE e.status = 'approved'
    ";
    if ($filter !== 'all') {
        $sql .= " AND e.criteria = :filter ";
    }

    $sql .= " ORDER BY e.created_at DESC;";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':student_id', $student_id, PDO::PARAM_INT);
    if ($filter !== 'all') {
        $stmt->bindParam(':filter', $filter, PDO::PARAM_STR);
    }
    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    

    echo json_encode([
        "success" => true, 
        "data" => [
            "tableRows" => $rows, 
        ]
    ]);

} catch (Exception $th) {
    echo json_encode(["success" => false, "message" => "Error: " . $th->getMessage()]);
}

?>