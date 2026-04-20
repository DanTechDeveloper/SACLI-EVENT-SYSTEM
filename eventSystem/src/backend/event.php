<?php
include 'connect.php';
session_start();

function handleApprove($conn, $id, $status) {

    $newStatus = ($status === "approved") ? "approved" : "rejected";

    $sql = "UPDATE events SET status = :status WHERE id = :id";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':status', $newStatus, PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    $stmt->execute();
}

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
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $status = isset($_GET['status']) ? $_GET['status'] : null;
    $data = json_decode(file_get_contents("php://input"), true);

    echo json_encode([
        "success" => true, 
        "data" => [
            "tableRows" => $rows, 
            "categoryCounts" => getCategoryCounts($conn),
            "handleApprove" => handleApprove($conn, $id, $status)
        ]
    ]);

} catch (Exception $th) {
    echo json_encode(["success" => false, "message" => "Error: " . $th->getMessage()]);
}

?>