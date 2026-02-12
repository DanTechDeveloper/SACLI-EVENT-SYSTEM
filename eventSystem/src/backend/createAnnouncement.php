<?php
include 'connect.php';


try {

    include 'connect.php';

    if (isset($_POST['publishAnnouncement'])) {
        $title = $_POST['title'];
        $content = $_POST['content'];
        $category = $_POST['category'] ?? "";
        $date = $_POST['date'];

        $sql = "INSERT INTO saqliqdb (title,content,category,date,type)
            VALUES(:title, :content, :category, :date, :type)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(":title", $title);
        $stmt->bindValue(":content", $content);
        $stmt->bindValue(":category", $category);
        $stmt->bindValue(":date", $date);
        $stmt->bindValue(":type", "Announcement");
        $stmt->execute();
    }
} catch (Exception $th) {
    echo "Error in: " . $th->getMessage();
}
