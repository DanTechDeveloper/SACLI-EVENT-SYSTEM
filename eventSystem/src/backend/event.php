<?php
include 'connect.php';
header('Content-Type: application/json');
try {

    $sql = "SELECT * FROM saqliqdb WHERE type='Event'";
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
