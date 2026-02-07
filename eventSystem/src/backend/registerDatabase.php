<?php
include 'connect.php';
header('Content-Type: application/json');
try {
    // Get the request data
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if action is register
    if (isset($data['action']) && $data['action'] === 'register') {
        $fullName = $data['fullName'] ?? '';
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        // Validate inputs
        if (empty($fullName) || empty($email) || empty($password)) {
            echo json_encode([
                'success' => false,
                'message' => 'All fields are required'
            ]);
            exit;
        }

        // Check if email already exists
        $checkEmail = $conn->prepare("SELECT id FROM register WHERE email = ?");
        $checkEmail->execute([$email]);

        if ($checkEmail->rowCount() > 0) {
            echo json_encode([
                'success' => false,
                'message' => 'Email already registered'
            ]);
            exit;
        }

        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insert new user
        $stmt = $conn->prepare("INSERT INTO register (fullName, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$fullName, $email, $hashedPassword]);

        echo json_encode([
            'success' => true,
            'message' => 'Registration successful'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid request'
        ]);
    }
} catch (\Throwable $th) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $th->getMessage()
    ]);
}
