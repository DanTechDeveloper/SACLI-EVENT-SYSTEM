<?php
include '../connect.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);

    $oldID = $data['oldID'];
    $newID = $data['newID'];
    $sql = "UPDATE students SET studentID = :newID WHERE studentID = :oldID";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":newID", $newID);
    $stmt->bindParam(":oldID", $oldID);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Student ID updated successfully"]);
} catch (\Exception  $th) {
    //throw $th;
}
?>