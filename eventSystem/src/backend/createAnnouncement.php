<?php
try {

    include 'connect.php';

   $data = json_decode(file_get_contents("php://input"), true);
      if ($data) {
        $title = $data['title'];
        $message = $data['message'];
        $category = $data['category'];

        $sql = "INSERT INTO announcements (title, message, category) VALUES (:title, :message, :category)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':title', $title);
        $stmt->bindValue(':message', $message);
        $stmt->bindValue(':category', $category);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Announcement created successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to create announcement']);
        }
    }
    exit;
} catch (Exception $th) {
    echo "Error in: " . $th->getMessage();
}
