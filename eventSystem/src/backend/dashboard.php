<?php
include 'connect.php';
function countAllPosts($conn)
{
    $sql = "SELECT COUNT(*) As 'totalPosts' FROM saqliqdb";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetch(PDO::FETCH_ASSOC);
    return $rows['totalPosts'];
}
function countAllAnnouncement($conn)
{
    $sql = "SELECT COUNT(*) As 'totalAnnouncement' FROM saqliqdb WHERE type ='Announcement'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetch(PDO::FETCH_ASSOC);
    return $rows['totalAnnouncement'];
}
function countAllEvent($conn)
{
    $sql = "SELECT COUNT(*) As 'totalEvents' FROM saqliqdb WHERE type = 'Event'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetch(PDO::FETCH_ASSOC);
    return $rows['totalEvents'];
}

echo json_encode([
    "success" => true,
    "data" => [
        "totalAnnouncement" => countAllAnnouncement($conn),
        "totalPosts" => countAllPosts($conn),
        "totalEvents" => countAllEvent($conn),

    ]
]);
