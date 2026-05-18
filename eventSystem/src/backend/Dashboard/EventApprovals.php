<?php
include '../connect.php';

function countEvent($count, $conn){
    switch ($count){
        case "totalApproved":
            $sql = "SELECT COUNT(*) FROM events WHERE status = 'approved'";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            return $stmt->fetchColumn();
        case "totalPending":
            $sql = "SELECT COUNT(*) FROM events WHERE status = 'pending'";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            return $stmt->fetchColumn();
        case "totalDraft":
            $sql = "SELECT COUNT(*) FROM events WHERE status = 'draft'";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            return $stmt->fetchColumn();
        default:
            return "Invalid count type";
    }
}

function getEvent($status, $conn){
    switch ($status){
        case "approved":
            $sql = "SELECT * FROM events WHERE status = 'approved'";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll();
        case "pending":
            $sql = "SELECT * FROM events WHERE status = 'pending'";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll();
        case "draft":
            $sql = "SELECT * FROM events WHERE status = 'draft'";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll();
        default:
            return "Invalid status type";
    }
}

try {
   $totalApproved = countEvent("totalApproved", $conn);
   $totalPending = countEvent("totalPending", $conn);
   $totalDraft = countEvent("totalDraft", $conn);
   $eventApproved = getEvent("approved", $conn);
   $eventPending = getEvent("pending", $conn);
   $eventDraft = getEvent("draft", $conn);
    echo json_encode(array(
        'success' => true,
        'totalApproved' => $totalApproved,
        'totalPending' => $totalPending,
        'totalDraft' => $totalDraft,
        'eventApproved' => $eventApproved,
        'eventPending' => $eventPending,
        'eventDraft' => $eventDraft
    ));
} catch (Exception $th) {
    echo json_encode(array(
        'success' => false,
        'message' => $th->getMessage()
    ));
}


?>