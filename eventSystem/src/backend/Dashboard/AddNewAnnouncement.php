<?php
try {

    include '../connect.php';

   $data = json_decode(file_get_contents("php://input"), true);
      if ($data) {
        $title = $data['title'];
        $description = $data['message'];
        $category = $data['category'];
        $author = $data['author'];

        $sql = "INSERT INTO announcements (title, description, category, author) VALUES (:title, :description, :category, :author)";
        $stmt = $conn->prepare($sql);

        $stmt->bindValue(':title', $title);
        $stmt->bindValue(':description', $description);
        $stmt->bindValue(':category', $category);
        $stmt->bindValue(':author', $author);
        
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
