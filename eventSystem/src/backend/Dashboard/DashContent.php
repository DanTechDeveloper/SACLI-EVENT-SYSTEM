<?php

function getStats($conn, $type)
{
    switch ($type) {
        case 'totalPosts':
            $sql = "SELECT (SELECT COUNT(*) FROM announcements WHERE status = 'approved') + (SELECT COUNT(*) FROM events WHERE status = 'approved')";
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
    $sql = "SELECT id, title, description, category, author, DATE_FORMAT(created_at, '%M %d, %Y %h:%i %p') AS date_posted FROM announcements WHERE status = 'pending' ORDER BY created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $rows;
}


function readEvents($conn){
    try {
        $conn->exec("SET time_zone = '+08:00';");
        $sql = "SELECT id, title, description, category, event_author, DATE_FORMAT(event_date, '%M %d, %Y') as date, TIME_FORMAT(event_time, '%h:%i %p') as time, criteria, location FROM events WHERE status = 'pending' ORDER BY created_at DESC";
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


require_once '../connect.php';

try {
    $eventID = isset($_GET['eventID']) ? $_GET['eventID'] : null;
    $eventStatus = isset($_GET['eventStatus']) ? $_GET['eventStatus']: null;

    $announcementID = isset($_GET['announcementID']) ? $_GET['announcementID'] : null;
    $announcementStatus = isset($_GET['announcementStatus']) ? $_GET['announcementStatus'] : null;

    $type = isset($_GET['type']) ? $_GET['type'] : 'Announcement';
    $sort = isset($_GET['sort']) ? $_GET['sort'] : 'ASC';

    // Only attempt updates if the specific parameters are provided
    if ($eventID !== null && $eventStatus !== null) {
        handleApproveEvent($conn, $eventID, $eventStatus);
    }

    if ($announcementID !== null && $announcementStatus !== null) {
       handleApproveAnnouncement($conn, $announcementID, $announcementStatus);
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
?>