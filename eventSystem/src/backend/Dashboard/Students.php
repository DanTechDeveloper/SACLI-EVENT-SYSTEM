<?php
include '../connect.php';

try {
    // Fetch students with their joined events count.
    // Course is dynamically mocked since it is not part of the database schema.
    $sql = "SELECT 
                s.id, 
                s.fullName, 
                s.fullName AS name,
                s.email, 
                s.profile_picture, 
                s.phone_number,
                COUNT(ep.id) AS eventsJoined
            FROM students s
            LEFT JOIN event_participants ep ON s.id = ep.student_id AND ep.status = 'joined'
            GROUP BY s.id
            ORDER BY s.fullName ASC";
            
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Mock a course dynamically for each student so the UI displays realistic data.
    $courses = ['BSIT', 'BSCS', 'BSHM', 'BSBA'];
    foreach ($students as &$student) {
        $student['course'] = $courses[$student['id'] % count($courses)];
    }

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