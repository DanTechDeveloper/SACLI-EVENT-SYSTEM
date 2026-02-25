<?php
include 'connect.php';

try {
    // 1. Handle JSON input (standard for React/Vue/Angular) or Form Data
    $inputData = json_decode(file_get_contents("php://input"), true);
   

    if (isset($inputData['action']) && $inputData['action'] === 'register') {

        $fullName = $inputData['fullName'] ?? '';
        $email = $inputData['email'] ?? '';
        $password = $inputData['password'] ?? '';

    // 2. Input validation
    if (empty($fullName) || empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }

    // 3. Hash the password for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // 4. Prepare and bind the query
    $stmt = $conn->prepare("INSERT INTO students (fullName, email, password) VALUES (:fullName, :email, :password)");
    $stmt->bindValue(':fullName', $username, PDO::PARAM_STR);
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    $stmt->bindValue(':password', $hashedPassword, PDO::PARAM_STR);

    // 5. Execute and return response
    $stmt->execute();
    echo json_encode(['success' => true, 'message' => 'Student registered successfully!']);
    
    }
    } catch (Exception $e) {
        // 6. Return actual error message on failure
    echo json_encode(['success' => false, 'message' => 'Registration failed: ' . $e->getMessage()]);
}

?>