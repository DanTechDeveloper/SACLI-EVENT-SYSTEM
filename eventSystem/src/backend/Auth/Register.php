<?php
include '../connect.php';

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
    $studentID = trim($data['studentID'] ?? '');
    $password = $data['password'] ?? '';
    $course = trim($data['course'] ?? '');

    // 3. Basic Validation
    if (empty($fullName) || empty($studentID) || empty($password) || empty($course)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }

    // 4. Check if user already exists
    $checkStmt = $conn->prepare("SELECT id FROM students WHERE studentID = :studentID");
    $checkStmt->execute([':studentID' => $studentID]);
    if ($checkStmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Student ID is already registered']);
        exit;
    }

    // 5. Securely hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // 6. Insert new record
    $insertStmt = $conn->prepare("INSERT INTO students (fullName, studentID, password, course) VALUES (:fullName, :studentID, :password, :course)");
    $insertStmt->execute([
        ':fullName'  => $fullName,
        ':studentID' => $studentID,
        ':password'  => $hashedPassword,
        ':course'  => $course
    ]);

    echo json_encode(['success' => true, 'message' => 'Registration successful!']);

} catch (\Throwable $e) {
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}