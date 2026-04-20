<?php

function getStats($conn, $type)
{
    switch ($type) {
        case 'totalPosts':
            $sql = "SELECT (SELECT COUNT(*) FROM announcements) + (SELECT COUNT(*) FROM events WHERE status = 'approved')";
            $stmt = $conn->prepare($sql);
            break;
        case 'totalAnnouncement':
            $sql = "SELECT COUNT(*) FROM announcements WHERE status = 'approved'";
            $stmt = $conn->prepare($sql);
            break;
        case 'totalEvents':
            $sql = "SELECT COUNT(*) FROM events WHERE status = 'approved'";
            $stmt = $conn->prepare($sql);
            break;
        default:
            return 0;
    }
    $stmt->execute();
    return $stmt->fetchColumn();
}

function readAnnouncement($conn)
{
    $sql = "SELECT id, title, description, category, DATE_FORMAT(created_at, '%M %d, %Y %h:%i %p') AS date_posted FROM announcements WHERE status = 'pending' ORDER BY created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $rows;
}


function readEvents($conn){
    try {
        $conn->exec("SET time_zone = '+08:00';");
        $sql = "SELECT id, title, description, category, DATE_FORMAT(event_date, '%M %d, %Y') as date, TIME_FORMAT(event_time, '%h:%i %p') as time, criteria, location, event_author AS author FROM events WHERE status = 'pending' ORDER BY created_at DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $rows;
    } catch (Exception $th) {
        return [];
    }
}


function handleApproveEvent($conn, $id, $status) {

    $newStatus = ($status === "approved") ? "approved" : "rejected";

    $sql = "UPDATE events SET status = :status WHERE id = :id";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':status', $newStatus, PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    $stmt->execute();
}

function handleApproveAnnouncement($conn, $id, $status) {

    $newStatus = ($status === "approved") ? "approved" : "rejected";

    $sql = "UPDATE announcements SET status = :status WHERE id = :id";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':status', $newStatus, PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    $stmt->execute();
}

// require_once must be outside the try-catch to ensure CORS headers 
// from connect.php are sent even if the database logic fails.

try {
    include  '../connect.php';
    $eventID = isset($_GET['eventID']) ? $_GET['eventID'] : null;
    $eventStatus = isset($_GET['eventStatus']) ? $_GET['eventStatus']: null;

    $announcementID = isset($_GET['announcementID']) ? $_GET['announcementID'] : null;
    $announcementStatus = isset($_GET['announcementStatus']) ? $_GET['announcementStatus'] : null;

    $type = isset($_GET['type']) ? $_GET['type'] : 'Announcement';
    $sort = isset($_GET['sort']) ? $_GET['sort'] : 'ASC';

    // Only attempt updates if the specific parameters are provided
    $eventResult = null;
    if ($eventID && $eventStatus) {
        $eventResult = handleApproveEvent($conn, $eventID, $eventStatus);
    }

    $announcementResult = null;
    if ($announcementID && $announcementStatus) {
        $announcementResult = handleApproveAnnouncement($conn, $announcementID, $announcementStatus);
    }
    
    echo json_encode([
        "success" => true, 
        "data" => [
            "totalAnnouncement" => getStats($conn, 'totalAnnouncement'),
            "totalPosts" => getStats($conn, 'totalPosts'),
            "totalEvents" => getStats($conn, 'totalEvents'),
            'readAnnouncement'=> readAnnouncement($conn),
            'readEvent'=> readEvents($conn),
        ]
    ]);
} catch (\Throwable $th) {
    echo json_encode(["success" => false, "message" => "Error: " . $th->getMessage()]);
}

/* 
MENTOR NOTE: 
1. Fix the casing in your frontend fetch call: 
   Change 'backend/dashboard/DashContent.php' to 'backend/Dashboard/DashContent.php'.
2. By moving require_once outside the try-catch, you guarantee that connect.php 
   runs first. If the database connection fails, connect.php itself 
   already has a try-catch that echoes a JSON error WITH the proper CORS headers.
*/
?>