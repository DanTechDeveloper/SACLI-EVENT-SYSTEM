<?php
include 'connect.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if ($data) {
        $title = $data['title'];
        $description = $data['description'];
        $category = $data['category'];
        $date = $data['date'];
        $time = $data['time'];
        $criteria = $data['criteria'];
        $location = $data['location'];
        $sql = "INSERT INTO events (title, description, category, date, time, criteria, location) 
                VALUES (:title, :description, :category, :date, :time, :criteria, :location)";

        $stmt = $conn->prepare($sql);
        $stmt->bindValue(":title", $title);
        $stmt->bindValue(":description", $description);
        $stmt->bindValue(":category", $category);
        $stmt->bindValue(":date", $date);
        $stmt->bindValue(":time", $time);
        $stmt->bindValue(":criteria", $criteria);
        $stmt->bindValue(":location", $location);
        $stmt->execute();

        echo json_encode(["success" => true, "message" => "Event created successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid input"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>