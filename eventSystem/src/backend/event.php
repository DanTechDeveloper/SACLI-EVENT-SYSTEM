<?php
include 'connect.php';

function getCategoryCounts($conn) {
    $sql = "SELECT 
                SUM(CASE WHEN category = 'Technology' THEN 1 ELSE 0 END) AS total_technology,
                SUM(CASE WHEN category = 'Social' THEN 1 ELSE 0 END) AS total_social,
                SUM(CASE WHEN category = 'Business' THEN 1 ELSE 0 END) AS total_business,
                SUM(CASE WHEN category = 'Outdoors' THEN 1 ELSE 0 END) AS total_outdoors,
                SUM(CASE WHEN category = 'Arts' THEN 1 ELSE 0 END) AS total_arts,
                SUM(CASE WHEN category = 'Programming' THEN 1 ELSE 0 END) AS total_programming,
                SUM(CASE WHEN category = 'School Activity' THEN 1 ELSE 0 END) AS total_school_activity,
                SUM(CASE WHEN category = 'Campus Program' THEN 1 ELSE 0 END) AS total_campus_program,
                SUM(CASE WHEN category = 'Community' THEN 1 ELSE 0 END) AS total_community,
                SUM(CASE WHEN category = 'Health' THEN 1 ELSE 0 END) AS total_health
            FROM events";
            
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}



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
    echo json_encode(["success" => true, "data" => ["tableRows" => $rows, "categoryCounts" => getCategoryCounts($conn)]]);
    // echo json_encode(["success" => true, "data" => $rows);
} catch (Exception $th) {
    echo json_encode(["success" => false, "message" => "Error: " . $th->getMessage()]);
}
?>