<?php
include 'connect.php';
header('Content-Type: application/json');

session_start();

if (isset($_SESSION['user_id'])) {
    $userId = $_SESSION['user_id'];

    try {
        // Fetch the latest user info from the database using the session ID
        $stmt = $conn->prepare("SELECT id, fullName, email, profile_picture FROM register WHERE id = ?");
        $stmt->execute([$userId]);

        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'user' => $user]);
        } else {
            echo json_encode(['success' => false, 'message' => 'User not found']);
        }
    } catch (\Throwable $th) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $th->getMessage()]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Not authorized'
    ]);
}
