<?php
include 'connect.php';
function readAnnouncement($conn, $type)
{
    $sql = "SELECT * from saqliqdb WHERE category='$type'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($rows) === 0) {
        return 'No results found for ' . $type . ' Announcement';
    }
   return $rows;
}

    echo json_encode(["success" => true,
        "academic" => readAnnouncement($conn, "Academic"),
        "holiday" => readAnnouncement($conn, "Holiday"),
        "sports" => readAnnouncement($conn, "Sports")
    ]);