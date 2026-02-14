<?php
include 'connect.php';
try {

    $sql = "SELECT * FROM events";
    $conn->exec("SET time_zone = '+08:00';");
    $sql = "SELECT id, title, description, category, DATE_FORMAT(date, '%M %d, %Y') as date, TIME_FORMAT(time, '%h:%i %p') as time, criteria, location FROM events";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // if (count($rows) === 0) {
    //     echo json_encode([
    //         "success" => true,
    //         "message" => "No current announcements or events at this time.",
    //         "data" => []
    //     ]);
    //     return;
    // }
    echo json_encode(["success" => true, "data" => $rows]);
} catch (Exception $th) {
    echo json_encode(["success" => false, "message" => "Error: " . $th->getMessage()]);
}
?>