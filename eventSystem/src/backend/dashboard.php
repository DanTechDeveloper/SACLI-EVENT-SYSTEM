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

function readAnnouncement($conn)
{
    $sql = "SELECT * FROM announcements ORDER BY date_posted DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($rows) === 0) {
        echo json_encode([
            "success"=> false,
            "message" => "No current announcements or events at this time.",
            "data" => []
        ]);
    }
   return $rows;
}


function readEvents($conn){
    try {

    $sql = "SELECT * FROM events";
    $conn->exec("SET time_zone = '+08:00';");
    $sql = "SELECT id, title, description, category, DATE_FORMAT(date, '%M %d, %Y') as date, TIME_FORMAT(time, '%h:%i %p') as time, criteria, location FROM events ORDER BY created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $rows;
} catch (Exception $th) {
    echo json_encode(["success" => false, "message" => "Error: " . $th->getMessage()]);
}
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
?>
