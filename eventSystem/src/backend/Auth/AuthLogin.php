<?php
include '../connect.php';

header('Content-Type: application/json');

function getUpcomingEventImages($conn){
    // Using PDO based on what is commonly used in this project
    $sql = "
        SELECT 
            e.event_image as image_path,
            e.title,
            e.category,
            DATE_FORMAT(e.event_date, '%M %d, %Y') as formatted_date
        FROM events e
        WHERE e.status = 'approved'
        AND e.event_date >= CURDATE()
        AND e.event_image IS NOT NULL
        AND e.event_image != ''
        ORDER BY e.event_date ASC
    ";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

try {
    $images = getUpcomingEventImages($conn);
    echo json_encode(["success" => true, "images" => $images]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>