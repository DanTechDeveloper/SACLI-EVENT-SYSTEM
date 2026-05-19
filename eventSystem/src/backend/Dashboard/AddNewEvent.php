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
    // When sending FormData from React, use $_POST, not json_decode
    if (!empty($_POST)) {
        $title = $_POST['title'];
        $description = $_POST['description'];
        $category = $_POST['category'];
        $criteria = $_POST['criteria'];
        $location = $_POST['location'];
        $dateAndTimeConvert = convertDateAndTime($_POST['date'], $_POST['time']);
        $timeEndConvert = convertDateAndTime($_POST['date'], $_POST['timeEnd']);
        $author = $_POST['author'];
        
        $imagePath = null;

        // Handle Image Upload
        if (isset($_FILES['event_image']) && $_FILES['event_image']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = '../../uploads/events/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            $fileExtension = pathinfo($_FILES['event_image']['name'], PATHINFO_EXTENSION);
            $fileName = uniqid('event_') . '.' . $fileExtension;
            $targetFile = $uploadDir . $fileName;

            if (move_uploaded_file($_FILES['event_image']['tmp_name'], $targetFile)) {
                $imagePath = 'uploads/events/' . $fileName; // Path to store in DB
            } else {
                throw new Exception("Failed to move uploaded file.");
            }
        }
        

        $sql = "INSERT INTO events (title, description, category, event_date, event_time, event_time_end, criteria, location, event_author, event_image) 
                VALUES (:title, :description, :category, :event_date, :event_time, :event_time_end, :criteria, :location, :event_author, :event_image)";

        $stmt = $conn->prepare($sql);
        $stmt->bindValue(":title", $title);
        $stmt->bindValue(":description", $description);
        $stmt->bindValue(":category", $category);
        $stmt->bindValue(":event_date", $dateAndTimeConvert->format('Y-m-d'));
        $stmt->bindValue(":event_time", $dateAndTimeConvert->format('H:i:s'));
        $stmt->bindValue(":criteria", $criteria);
        $stmt->bindValue(":location", $location);
        $stmt->bindValue(":event_author", $author);
        $stmt->bindValue(":event_time_end", $timeEndConvert->format('H:i:s'));
        $stmt->bindValue(":event_image", $imagePath);
        $stmt->execute();
        

        echo json_encode(["success" => true, "message" => "Event created successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid input"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>