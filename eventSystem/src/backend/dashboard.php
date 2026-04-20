<?php
include 'connect.php';

$type = isset($_GET['type']) ? $_GET['type'] : 'Announcement';
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'ASC';

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

function handleAnnouncement($conn, $id, $status)
{
    $newStatus = ($status === "approved") ? "approved" : "rejected";
    $sql = "UPDATE announcements SET status = :status WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':status', $newStatus, PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
}

$id = isset($_GET['id']) ? $_GET['id'] : null;
$status = isset($_GET['status']) ? $_GET['status'] : null;
echo json_encode([
    "success" => true,
    "data" => [
        "totalAnnouncement" => getStats($conn, 'totalAnnouncement'),
        "totalPosts" => getStats($conn, 'totalPosts'),
        "totalEvents" => getStats($conn, 'totalEvents'),
        'readAnnouncement'=> readAnnouncement($conn),
        'readEvent'=> readEvents($conn),
        'handleAnnouncement'=> handleAnnouncement($conn, $id, $status),
    ]
]);
?>
