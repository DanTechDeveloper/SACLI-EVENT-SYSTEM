<?php
header("Access-Control-Allow-Headers: Content-Type");

include "connect.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? "";

if (!$id) {
  echo json_encode(["error" => "ID is required"]);
  exit;
}

try {
  $sql = "DELETE FROM saqliqdb WHERE id = :id";
  $statement = $conn->prepare($sql);
  $statement->bindValue(":id", $id);
  $statement->execute();
  
  echo json_encode([
    "success" => true,
    "message" => "Note deleted successfully",
    "id" => $id
  ]);
} catch (Exception $th) {
  echo json_encode(["error" => $th->getMessage()]);
}
?>
