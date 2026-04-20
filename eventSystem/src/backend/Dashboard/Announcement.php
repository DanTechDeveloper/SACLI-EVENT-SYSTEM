<?php
include '../connect.php';

function getAnnouncementCategoryCounts($conn) {
    $sql = "SELECT 
                IFNULL(SUM(CASE WHEN category = 'EVENT' THEN 1 ELSE 0 END), 0) AS total_event,
                IFNULL(SUM(CASE WHEN category = 'IMPORTANT' THEN 1 ELSE 0 END), 0) AS total_important,
                IFNULL(SUM(CASE WHEN category = 'REMINDER' THEN 1 ELSE 0 END), 0) AS total_reminder,
                IFNULL(SUM(CASE WHEN category = 'GENERAL' THEN 1 ELSE 0 END), 0) AS total_general,
                IFNULL(SUM(CASE WHEN category = 'ACHIEVEMENT' THEN 1 ELSE 0 END), 0) AS total_achievement,
                IFNULL(SUM(CASE WHEN category = 'EMERGENCY' THEN 1 ELSE 0 END), 0) AS total_emergency
            FROM announcements WHERE status = 'approved'";
            
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC) ?: [];
}

function readAnnouncement($conn)
{
    $sql = "SELECT 
                id, 
                title, 
                description, 
                category, 
                DATE_FORMAT(created_at, '%M %d, %Y %h:%i %p') AS date_posted 
            FROM announcements 
            WHERE status = 'approved' ORDER BY created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
}

function handleAction($conn, $status, $id, $data){
    if ($status === "edit"){
        $title = isset($data['title']) ? $data['title'] : null;
        $description = isset($data['description']) ? $data['description'] : null;
        $category = isset($data['category']) ? $data['category'] : null;
        $sql = "UPDATE announcements SET title = ?, description = ?, category = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$title, $description, $category, $id]);
    } else if ($status === "delete"){
        $sql = "DELETE FROM announcements WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id]);
    }
  
}


try {
    $status = isset($_GET['status']) ? $_GET['status'] : null;
    $id = isset($_GET["id"]) ? $_GET["id"] : null;
    $data = json_decode(file_get_contents("php://input"), true);
    $conn->exec("SET time_zone = '+08:00';");
  
    echo json_encode([
        "success" => true,
        "data" => [
            "allAnnouncements" => readAnnouncement($conn),
            "getAnnouncementCategoryCount" => getAnnouncementCategoryCounts($conn),
            "handleAction" => handleAction($conn, $status, $id, $data),
        ]
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Server Error: " . $e->getMessage()
    ]);
}
?>
