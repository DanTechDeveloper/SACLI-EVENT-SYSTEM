<?php
include 'connect.php';

$type = isset($_GET['type']) ? $_GET['type'] : 'Announcement';
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'ASC';

function getStats($conn, $type)
{
    switch ($type) {
        case 'totalPosts':
            $sql = "SELECT COUNT(*) FROM saqliqdb";
            break;
        case 'totalAnnouncement':
            $sql = "SELECT COUNT(*) FROM saqliqdb WHERE type ='Announcement'";
            break;
        case 'totalEvents':
            $sql = "SELECT COUNT(*) FROM saqliqdb WHERE type = 'Event'";
            break;
        default:
            return 0;
    }
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetchColumn();
}

function populateData($conn, $type, $sort)
{
    $direction = strtoupper($sort) === 'DESC' ? 'DESC' : 'ASC';
    switch ($type) {
        case 'Event':
            $sql = "SELECT * FROM saqliqdb WHERE type = 'Event' ORDER BY id $direction";
            break;
        case 'Announcement':
        default:
            $sql = "SELECT * FROM saqliqdb WHERE type = 'Announcement' ORDER BY id $direction";
            break;
    }
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}



echo json_encode([
    "success" => true,
    "data" => [
        "totalAnnouncement" => getStats($conn, 'totalAnnouncement'),
        "totalPosts" => getStats($conn, 'totalPosts'),
        "totalEvents" => getStats($conn, 'totalEvents'),
        "allAnnouncements" => populateData($conn, $type, $sort),

    ]
]);
?>
