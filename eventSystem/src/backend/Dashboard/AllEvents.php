<?php

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
            FROM events WHERE status = 'approved'";
            
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}


function handleAction ($conn, $status, $id, $data){
    if ($status === "delete"){
        $sql = "DELETE FROM events WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id]);
    } else if ($status === "edit"){
        $title = isset($data['title']) ? $data['title'] : null;
        $description = isset($data['description']) ? $data['description'] : null;
        $date = isset($data['date']) ? $data['date'] : null;
        $time = isset($data['time']) ? $data['time'] : null;
        $location = isset($data['location']) ? $data['location'] : null;
        $criteria = isset($data['criteria']) ? $data['criteria'] : null;
        $sql = "UPDATE events SET title = ?, description = ?, date = ?, time = ?, location = ?, criteria = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$title, $description, $date, $time, $location, $criteria, $id]);
    }
}

function tableRows($conn){
    $sql = "SELECT * FROM events WHERE status = 'approved'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

try {
    require_once '../connect.php';
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $status = isset($_GET['status']) ? $_GET['status'] : null;
    $data = json_decode(file_get_contents("php://input"), true);

    if ($id !== null && $status !== null) {
        handleAction($conn, $status, $id, $data);
    }
    
    $conn->exec("SET time_zone = '+08:00';");
    echo json_encode([
        "success" => true, 
        "data" => [
            "tableRows" => tableRows($conn), 
            "categoryCounts" => getCategoryCounts($conn),
        ]
    ]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>