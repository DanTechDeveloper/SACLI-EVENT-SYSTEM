<?php
include '../connect.php';

try {
    $conn->exec("SET time_zone = '+08:00';");

    // Helper to fetch events by range
    function getEventsInRange($conn, $start, $end) {
        $sql = "SELECT id, title, category, event_author as author, criteria,
                DATE_FORMAT(event_date, '%M %d, %Y') as date, 
                TIME_FORMAT(event_time, '%h:%i %p') as time 
                FROM events 
                WHERE status = 'approved' 
                AND event_date BETWEEN :start AND :end 
                ORDER BY event_date ASC, event_time ASC";
        $stmt = $conn->prepare($sql);
        $stmt->execute(['start' => $start, 'end' => $end]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    $today = date('Y-m-d');
    $nextWeek = date('Y-m-d', strtotime('+7 days'));
    $lastDayOfMonth = date('Y-m-t');
    $lastDayOfYear = date('Y-12-31');

    $weekEvents = getEventsInRange($conn, $today, $nextWeek);
    $monthEvents = getEventsInRange($conn, $today, $lastDayOfMonth);
    $yearEvents = getEventsInRange($conn, $today, $lastDayOfYear);

    echo json_encode([
        "success" => true,
        "data" => [
            "thisWeek" => $weekEvents,
            "thisMonth" => $monthEvents,
            "thisYear" => $yearEvents,
            "counts" => [
                "week" => count($weekEvents),
                "month" => count($monthEvents),
                "year" => count($yearEvents)
            ]
        ]
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage(),
    ]);
}
