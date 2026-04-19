<?php
include 'connect.php';

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

function updateAnnouncementStatus($conn, $id, $status) {
    $sql = "UPDATE announcements SET status = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$status, $id]);
    return $stmt->rowCount() > 0;
}

try {
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $status = isset($_GET['status']) ? $_GET['status'] : null;

    // Only attempt update if parameters are actually provided
    if ($id !== null && $status !== null) {
        updateAnnouncementStatus($conn, $id, $status);
    }
    
    echo json_encode([
        "success" => true,
        "data" => [
            "allAnnouncements" => readAnnouncement($conn),
            "getAnnouncementCategoryCount" => getAnnouncementCategoryCounts($conn)
        ]
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Server Error: " . $e->getMessage()
    ]);
}
?>
