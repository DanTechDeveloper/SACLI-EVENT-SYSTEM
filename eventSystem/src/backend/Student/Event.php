<?php
include '../connect.php';

session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Unauthorized access."]);
    exit;
}

try {
    $filter = isset($_GET['filter']) ? $_GET['filter'] : 'all';
    $student_id = $_SESSION['user_id'];

    $conn->exec("SET time_zone = '+08:00';");

    $sql = "
     SELECT 
    e.id,
    e.title,
    e.description,
    e.category,
    DATE_FORMAT(e.event_date, '%M %d, %Y') AS date,
    TIME_FORMAT(e.event_time, '%h:%i %p') AS time,
    TIME_FORMAT(e.event_time_end, '%h:%i %p') AS time_end,
    e.criteria,
    e.location,
    e.event_author,
    eu.status AS joined,
    CASE 
        WHEN e.event_date < CURDATE() THEN 'Past'
        WHEN e.event_date = CURDATE() THEN 'Ongoing'
        ELSE 'Upcoming'
    END AS timing_status
FROM events e
LEFT JOIN event_participants eu
    ON e.id = eu.event_id
   AND eu.student_id = :student_id
WHERE e.status = 'approved'";
    // Handle the specific "Upcoming Events" filter temporal logic
    if ($filter === 'upcoming_week') {
        // Tomorrow → end of current week (Sunday)
        $sql .= " AND e.event_date BETWEEN DATE_ADD(CURDATE(), INTERVAL 1 DAY)
                  AND DATE_ADD(CURDATE(), INTERVAL (8 - DAYOFWEEK(CURDATE())) % 7 DAY) ";
    } elseif ($filter === 'upcoming_this_year') {
        // After this week → end of current year
        $sql .= " AND e.event_date > DATE_ADD(CURDATE(), INTERVAL (8 - DAYOFWEEK(CURDATE())) % 7 DAY)
                  AND YEAR(e.event_date) = YEAR(CURDATE()) ";
    } elseif ($filter === 'upcoming_next_year') {
        // Next year and beyond
        $sql .= " AND YEAR(e.event_date) > YEAR(CURDATE()) ";
    } elseif ($filter === 'upcoming_events') {
        $sql .= " AND e.event_date >= CURDATE() ";
    } elseif ($filter === 'ongoing_events') {
        $sql .= " AND e.event_date = CURDATE() ";
    } elseif ($filter === 'pastEvents') {
        $sql .= " AND e.event_date < CURDATE() ";
    } elseif ($filter !== 'all') {
        $sql .= " AND e.criteria = :filter ";
    }

    $sql .= " ORDER BY e.created_at DESC;";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':student_id', $student_id, PDO::PARAM_INT);
    // Only bind :filter if we are actually filtering by criteria (not time-based filters)
    $timeBased = ['all', 'upcoming_events', 'upcoming_week', 'upcoming_this_year', 'upcoming_next_year', 'ongoing_events', 'pastEvents'];
    if (!in_array($filter, $timeBased)) {
        $stmt->bindParam(':filter', $filter, PDO::PARAM_STR);
    }
    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    

    echo json_encode([
        "success" => true, 
        "data" => [
            "tableRows" => $rows, 
        ]
    ]);

} catch (Exception $th) {
    echo json_encode(["success" => false, "message" => "Error: " . $th->getMessage()]);
}

?>