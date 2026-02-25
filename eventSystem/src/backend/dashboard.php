<?php
include 'connect.php';

$type = isset($_GET['type']) ? $_GET['type'] : 'Announcement';
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'ASC';

function getStats($conn, $type)
{
    switch ($type) {
        case 'totalPosts':
            $sql = "SELECT (SELECT COUNT(*) FROM announcements) + (SELECT COUNT(*) FROM events)";
            $stmt = $conn->prepare($sql);
            break;
        case 'totalAnnouncement':
            $sql = "SELECT COUNT(*) FROM announcements";
            $stmt = $conn->prepare($sql);
            break;
        case 'totalEvents':
            $sql = "SELECT COUNT(*) FROM events";
            $stmt = $conn->prepare($sql);
            break;
        default:
            return 0;
    }
    $stmt->execute();
    return $stmt->fetchColumn();
}




echo json_encode([
    "success" => true,
    "data" => [
        "totalAnnouncement" => getStats($conn, 'totalAnnouncement'),
        "totalPosts" => getStats($conn, 'totalPosts'),
        "totalEvents" => getStats($conn, 'totalEvents')
    ]
]);
?>
