<?php

include '../connect.php';
function getStats($conn, $type)
{
    switch ($type) {
        case 'totalPosts':
            $sql = "SELECT (SELECT COUNT(*) FROM announcements WHERE status = 'approved') + (SELECT COUNT(*) FROM events WHERE status = 'approved') AS total";
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

function recentEvent($conn){
    $sql = "SELECT * FROM events WHERE status = 'approved' ORDER BY event_date ASC, event_time ASC LIMIT 10";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function recentAnnouncement($conn){
    $sql = "SELECT * FROM announcements WHERE status = 'approved' ORDER BY created_at DESC LIMIT 10";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

try { 

    echo json_encode([
        "success" => true, 
        "data" => [
            "totalAnnouncement" => getStats($conn, 'totalAnnouncement'),
            "totalPosts" => getStats($conn, 'totalPosts'),
            "totalEvents" => getStats($conn, 'totalEvents'),
            "recentEvents" => recentEvent($conn),
            "recentAnnouncements" => recentAnnouncement($conn),
        ]
    ]);
} catch (\Throwable $th) {
    echo json_encode(["success" => false, "message" => "Error: " . $th->getMessage()]);
}
?>