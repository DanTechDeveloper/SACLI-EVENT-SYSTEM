<?php

include '../connect.php';

session_start();
try {
    
    
    $sql = "SELECT * FROM users_comments;";
    $result = $conn->query($sql);
    $data = $result->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(array("success" => true, "data" => $data));
} catch (\Throwable $th) {
    //throw $th;
}

?>