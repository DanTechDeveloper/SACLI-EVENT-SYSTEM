<?php
include '../connect.php';

session_start();


function convertDateAndTime($date, $time){
    // HTML5 date is Y-m-d, time is H:i (24h)
    $dt = DateTime::createFromFormat('Y-m-d H:i', $date . ' ' . $time);

    if (!$dt) {
        throw new Exception("Invalid Date or Time format provided.");
    }
    return $dt;
}

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if ($data) {
        $title = $data['title'];
        $description = $data['description'];
        $category = $data['category'];
        $criteria = $data['criteria'];
        $location = $data['location'];
        $dateAndTimeConvert = convertDateAndTime($data['date'], $data['time']);
        $author = $data['author'];
        
        // The user ID who created this event (assuming your table has a created_by column)
        $created_by = $_SESSION['user_id'];

        $sql = "INSERT INTO events (title, description, category, event_date, event_time, criteria, location, event_author) 
                VALUES (:title, :description, :category, :event_date, :event_time, :criteria, :location, :event_author)";

        $stmt = $conn->prepare($sql);
        $stmt->bindValue(":title", $title);
        $stmt->bindValue(":description", $description);
        $stmt->bindValue(":category", $category);
        $stmt->bindValue(":event_date", $dateAndTimeConvert->format('Y-m-d'));
        $stmt->bindValue(":event_time", $dateAndTimeConvert->format('H:i:s'));
        $stmt->bindValue(":criteria", $criteria);
        $stmt->bindValue(":location", $location);
        $stmt->bindValue(":event_author", $author);
    $stmt->execute();

        echo json_encode(["success" => true, "message" => "Event created successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid input"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>