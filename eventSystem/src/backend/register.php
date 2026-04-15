<?php
require_once 'connect.php';

try {
    // 1. Get the raw POST data (from fetch application/json)
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
        exit;
    }

    // 2. Extract and sanitize
    $fullName = trim($data['fullName'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';

    // 3. Basic Validation
    if (empty($fullName) || empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }

    // 4. Check if user already exists
    $checkStmt = $conn->prepare("SELECT id FROM students WHERE email = :email");
    $checkStmt->execute([':email' => $email]);
    if ($checkStmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Email is already registered']);
        exit;
    }

    // 5. Securely hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // 6. Insert new record
    $insertStmt = $conn->prepare("INSERT INTO students (fullName, email, password) VALUES (:name, :email, :pass)");
    $insertStmt->execute([
        ':name'  => $fullName,
        ':email' => $email,
        ':pass'  => $hashedPassword
    ]);

    echo json_encode(['success' => true, 'message' => 'Registration successful!']);

} catch (\Throwable $e) {
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}