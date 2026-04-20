<?php
include 'connect.php';

session_start();

function handleAction($conn, $status, $id, $data){
    if ($status === "edit"){
        $title = isset($data['title']) ? $data['title'] : null;
        $description = isset($data['description']) ? $data['description'] : null;
        $category = isset($data['category']) ? $data['category'] : null;
        $sql = "UPDATE events SET title = ?, description = ?, category = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$title, $description, $category, $id]);
    } else if ($status === "delete"){
        $sql = "DELETE FROM events WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id]);
    }
  
}

function getCategoryCounts($conn) {
    $sql = "SELECT 
                SUM(CASE WHEN category = 'Technology' THEN 1 ELSE 0 END) AS total_technology,
                SUM(CASE WHEN category = 'Social' THEN 1 ELSE 0 END) AS total_social,
                SUM(CASE WHEN category = 'Business' THEN 1 ELSE 0 END) AS total_business,
                SUM(CASE WHEN category = 'Outdoors' THEN 1 ELSE 0 END) AS total_outdoors,
                SUM(CASE WHEN category = 'Arts' THEN 1 ELSE 0 END) AS total_arts,
                SUM(CASE WHEN category = 'Programming' THEN 1 ELSE 0 END) AS total_programming,
                SUM(CASE WHEN category = 'School Activity' THEN 1 ELSE 0 END) AS total_school_activity,
                SUM(CASE WHEN category = 'Campus Program' THEN 1 ELSE 0 END) AS total_campus_program,
                SUM(CASE WHEN category = 'Community' THEN 1 ELSE 0 END) AS total_community,
                SUM(CASE WHEN category = 'Health' THEN 1 ELSE 0 END) AS total_health
            FROM events WHERE status = 'approved'";
            
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

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
            "handleApprove" => handleApprove($conn, $id, $status),
            "handleAction" => handleAction($conn, $status, $id, $data)
        ]
    ]);

} catch (Exception $th) {
    echo json_encode(["success" => false, "message" => "Error: " . $th->getMessage()]);
}

?>