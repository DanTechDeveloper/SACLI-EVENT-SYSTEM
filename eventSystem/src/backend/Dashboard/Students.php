<?php
include '../connect.php';

try {
    // Fetch students with their joined events count.
    $sql = "SELECT 
                s.id, 
                s.fullName, 
                s.studentID,
                s.email, 
                s.profile_picture, 
                s.phone_number,
                s.course,
                COUNT(ep.id) AS eventsJoined
            FROM students s
            LEFT JOIN event_participants ep ON s.id = ep.student_id AND ep.status = 'joined'
            GROUP BY s.id
            ORDER BY s.fullName ASC";
            
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => $students
    ]);
} catch (\Throwable $th) {
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $th->getMessage()
    ]);
}
?>