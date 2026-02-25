<?php
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($data) {
        $title = $data['title'];
        $description = $data['description'];
        $category = $data['category'];
        $date = $data['date'];

        $sql = "INSERT INTO announcements (title, content, category, date) VALUES (:title, :content, :category, :date)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':title', $title);
        $stmt->bindValue(':content', $content);
        $stmt->bindValue(':category', $category);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Announcement created successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to create announcement']);
        }
    }
    exit;
}

function readAnnouncement($conn, $category)
{
    $sql = "SELECT * FROM saqliqdb WHERE category = :category AND type = 'Announcement' ORDER BY date DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':category', $category, PDO::PARAM_STR);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($rows) === 0) {
        return [];
    }
   return $rows;
}

    echo json_encode(["success" => true,
        "important" => readAnnouncement($conn, "IMPORTANT"),
        "reminder" => readAnnouncement($conn, "REMINDER"),
        "general" => readAnnouncement($conn, "GENERAL"),
        "event" => readAnnouncement($conn, "EVENT"),
        "achievement" => readAnnouncement($conn, "ACHIEVEMENT"),
        "emergency" => readAnnouncement($conn, "EMERGENCY")
    ]);