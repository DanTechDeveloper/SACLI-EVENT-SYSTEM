<?php
include 'connect.php';

$type = isset($_GET['type']) ? $_GET['type'] : 'Announcement';
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'ASC';

function getStats($conn, $type)
{
    switch ($type) {
        case 'totalPosts':
            $sql = "SELECT COUNT(*) FROM saqliqdb";
            $stmt = $conn->prepare($sql);
            break;
        case 'totalAnnouncement':
            $sql = "SELECT COUNT(*) FROM saqliqdb WHERE type = :type";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(':type', 'Announcement', PDO::PARAM_STR);
            break;
        case 'totalEvents':
            $sql = "SELECT COUNT(*) FROM saqliqdb WHERE type = :type";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(':type', 'Event', PDO::PARAM_STR);
            break;
        default:
            return 0;
    }
    $stmt->execute();
    return $stmt->fetchColumn();
}

function populateData($conn, $type, $sort)
{
    $direction = strtoupper($sort) === 'DESC' ? 'DESC' : 'ASC';
    $validType = ($type === 'Event') ? 'Event' : 'Announcement';

    $sql = "SELECT * FROM saqliqdb WHERE type = :type ORDER BY id $direction";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':type', $validType, PDO::PARAM_STR);
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
