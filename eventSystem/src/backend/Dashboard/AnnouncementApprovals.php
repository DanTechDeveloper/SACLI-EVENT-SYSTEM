<?php
include '../connect.php';

function readAnnouncement($conn)
{
    $sql = "SELECT id, title, description, category, author, DATE_FORMAT(created_at, '%M %d, %Y %h:%i %p') AS date_posted FROM announcements WHERE status = 'pending' ORDER BY created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $rows;
}

function getStats($conn, $type){
    switch ($type){
        case "totalPending":
            $sql = "SELECT COUNT(*) AS count FROM announcements WHERE status = 'pending'";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            return $row['count'];
        case "totalDraft":
            $sql = "SELECT COUNT(*) AS count FROM announcements WHERE status = 'draft'";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            return $row['count'];
        case "getDraft":
            $sql = "SELECT * FROM announcements WHERE status = 'draft' ORDER BY created_at DESC";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $row;
    }
}
function updateAnnouncementStatus($conn, $id, $status)
{
    $sql = "UPDATE announcements SET status = :status WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
}

try {

    $id = $_GET['id'];
    $status = $_GET['status'];
    updateAnnouncementStatus($conn,$id,$status);
    echo json_encode([
        "success" => true, 
        "data" => [
            "readAnnouncement" => readAnnouncement($conn),
            "totalPending" => getStats($conn, "totalPending"),
            "totalDraft" => getStats($conn, "totalDraft"),
            "getDraft" => getStats($conn, "getDraft"),
            
            

        ]
    ]);

   

} catch (\Exception $th) {
    //throw $th;
}

?>