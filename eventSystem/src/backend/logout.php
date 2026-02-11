<?php
include 'connect.php';
// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Resume the existing session
session_start();

// Unset all session variables
session_unset();

// Destroy the session data on the server
session_destroy();

echo json_encode(["success" => true]);
