<?php
include '../connect.php';
session_start();
try {
    $sql = "SELECT * FROM announcements WHERE status = 'approved' ORDER BY created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode([
        "success" => true,
        "data" => [
            "allAnnouncements" => $rows,
        ]
    ]);
} catch (\Throwable $th) {
    echo json_encode(["success" => false, "message" => "Error: " . $th->getMessage()]);
}
?>

