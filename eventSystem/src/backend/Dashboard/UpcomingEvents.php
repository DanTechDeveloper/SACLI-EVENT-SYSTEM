<?php
include '../connect.php';

header('Content-Type: application/json');

try {
    $conn->exec("SET time_zone = '+08:00';");

    $baseQuery = "
        SELECT 
            id, 
            title, 
            category, 
            event_author AS author, 
            criteria,
            DATE_FORMAT(event_date, '%M %d, %Y') AS date, 
            TIME_FORMAT(event_time, '%h:%i %p') AS time,
            event_date,
            event_time
        FROM events
        WHERE status = 'approved'
    ";

    // =========================
    // 1. THIS WEEK
    // Tomorrow → end of current week (Sunday)
    // =========================
    $sqlWeek = $baseQuery . "
        AND event_date BETWEEN DATE_ADD(CURDATE(), INTERVAL 1 DAY)
        AND DATE_ADD(CURDATE(), INTERVAL (8 - DAYOFWEEK(CURDATE())) % 7 DAY)
        ORDER BY event_date ASC, event_time ASC
    ";

    $stmtWeek = $conn->query($sqlWeek);
    $weekEvents = $stmtWeek->fetchAll(PDO::FETCH_ASSOC);

    // =========================
    // 2. THIS YEAR (after this week → end of current year)
    // Events in 2026 that are beyond the current week
    // =========================
    $sqlMonth = $baseQuery . "
        AND event_date > DATE_ADD(CURDATE(), INTERVAL (8 - DAYOFWEEK(CURDATE())) % 7 DAY)
        AND YEAR(event_date) = YEAR(CURDATE())
        ORDER BY event_date ASC, event_time ASC
    ";

    $stmtMonth = $conn->query($sqlMonth);
    $monthEvents = $stmtMonth->fetchAll(PDO::FETCH_ASSOC);

    // =========================
    // 3. NEXT YEAR AND BEYOND (2027+)
    // =========================
    $sqlYear = $baseQuery . "
        AND YEAR(event_date) > YEAR(CURDATE())
        ORDER BY event_date ASC, event_time ASC
    ";

    $stmtYear = $conn->query($sqlYear);
    $yearEvents = $stmtYear->fetchAll(PDO::FETCH_ASSOC);

    // =========================
    // RESPONSE
    // =========================
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