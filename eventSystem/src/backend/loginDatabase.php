<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'connect.php';
session_start();


try {
    // Get the request data
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if action is login
    if (isset($data['action']) && $data['action'] === 'login') {
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        // Validate inputs
        if (empty($email) || empty($password)) {
            echo json_encode([
                'success' => false,
                'message' => 'Email and password are required'
            ]);
            exit;
        }

        // Fetch user from database by email
        $stmt = $conn->prepare("SELECT id, fullName, email, password FROM register WHERE email = ?");
        $stmt->execute([$email]);

        if ($stmt->rowCount() === 0) {
            echo json_encode([
                'success' => false,
                'message' => 'Invalid email or password'
            ]);
            exit;
        }

        // Get user data
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verify password using password_verify
        if (!password_verify($password, $user['password'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Invalid email or password'
            ]);
            exit;
        }

        // Password matches, login successful
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['fullName'] = $user['fullName'];
        $_SESSION['email'] = $user['email'];

        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => [
                'id' => $user['id'],
                'fullName' => $user['fullName'],
                'email' => $user['email']
            ]
        ]);
    } elseif (isset($data['action']) && $data['action'] === 'googleLogin') {
        $accessToken = $data['token'] ?? '';

        if (empty($accessToken)) {
            echo json_encode(['success' => false, 'message' => 'Access token is missing']);
            exit;
        }

        // 1. Verify token with Google
        // Use @ to suppress warnings if the request fails (handled by the check below)
        $googleUserResponse = @file_get_contents("https://www.googleapis.com/oauth2/v1/userinfo?access_token=$accessToken");

        if ($googleUserResponse === false) {
            echo json_encode(['success' => false, 'message' => 'Invalid Google token']);
            exit;
        }

        $user = json_decode($googleUserResponse, true);
        $email = $user['email'] ?? '';
        $fullName = $user['name'] ?? 'Google User';
        $profile_picture = $user['picture'];

        // 2. Connect to DB and insert/check user
        $checkStmt = $conn->prepare("SELECT id, fullName, profile_picture FROM register WHERE email = ?");
        $checkStmt->execute([$email]);

        if ($checkStmt->rowCount() > 0) {
            // User exists, fetch details
            $existingUser = $checkStmt->fetch(PDO::FETCH_ASSOC);
            $_SESSION['user_id'] = $existingUser['id'];
            $_SESSION['fullName'] = $existingUser['fullName'];
            $_SESSION['profile_picture'] = $existingUser['profile_picture'];
        } else {
            // User does not exist, register them
            // Generate a random secure password since they are logging in via Google
            $randomPassword = bin2hex(random_bytes(16));
            $hashedPassword = password_hash($randomPassword, PASSWORD_DEFAULT);

            $insertStmt = $conn->prepare("INSERT INTO register (fullName, email, profile_picture, password) VALUES (?, ?, ?, ?)");
            $insertStmt->execute([$fullName, $email, $profile_picture, $hashedPassword]);

            $_SESSION['user_id'] = $conn->lastInsertId();
            $_SESSION['fullName'] = $fullName;
        }

        // 3. Set remaining session and return response
        $_SESSION['email'] = $email;

        echo json_encode([
            'success' => true,
            'message' => 'Google login successful',
            'user' => [
                'fullName' => $_SESSION['fullName'],
                'email' => $_SESSION['email']
            ]
        ]);
    }
} catch (\Throwable $th) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $th->getMessage()
    ]);
}
