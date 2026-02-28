<?php
include 'connect.php';

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

    echo json_encode(["success" => true,
       "data" => readAnnouncement($conn)]);
?>

