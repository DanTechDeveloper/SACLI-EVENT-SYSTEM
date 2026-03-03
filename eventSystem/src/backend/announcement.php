<?php
include 'connect.php';

function getAnnouncementCategoryCounts($conn) {
 $sql = "SELECT 
                SUM(CASE WHEN category = 'EVENT' THEN 1 ELSE 0 END) AS total_event,
                SUM(CASE WHEN category = 'IMPORTANT' THEN 1 ELSE 0 END) AS total_important,
                SUM(CASE WHEN category = 'REMINDER' THEN 1 ELSE 0 END) AS total_reminder,
                SUM(CASE WHEN category = 'GENERAL' THEN 1 ELSE 0 END) AS total_general,
                SUM(CASE WHEN category = 'ACHIEVEMENT' THEN 1 ELSE 0 END) AS total_achievement,
                SUM(CASE WHEN category = 'EMERGENCY' THEN 1 ELSE 0 END) AS total_emergency
              
            FROM announcements";
            
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function readAnnouncement($conn)
{
    $sql = "SELECT * FROM announcements ORDER BY date_posted DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
   return $rows;
}

    echo json_encode([
        "success" => true,
        "data" => [
            "allAnnouncements" => readAnnouncement($conn),
            "announcementCount" => getAnnouncementCategoryCounts($conn)
        ]
    ]);
?>
