<?php
session_start();
include 'connect.php';

$data = json_decode(file_get_contents("php://input"), true);

$userOtp = $data["code"] ?? null;
$phoneNumber = $data["phoneNumber"] ?? null;

// basic validation
if (!$userOtp || !$phoneNumber) {
    echo json_encode([
        "success" => false,
        "message" => "Missing OTP or phone number"
    ]);
    exit;
}

// check if OTP exists in session
if (!isset($_SESSION["otp"]) || !isset($_SESSION["phoneNumber"])) {
    echo json_encode([
        "success" => false,
        "message" => "No OTP found. Please request again."
    ]);
    exit;
}

// check expiry
if (isset($_SESSION["otp_expiry"]) && time() > $_SESSION["otp_expiry"]) {
    unset($_SESSION["otp"]);
    echo json_encode([
        "success" => false,
        "message" => "OTP expired"
    ]);
    exit;
}

// verify phone match (important security check)
if ($phoneNumber !== $_SESSION["phoneNumber"]) {
    echo json_encode([
        "success" => false,
        "message" => "Phone mismatch"
    ]);
    exit;
}

// compare OTP
if ($userOtp == $_SESSION["otp"]) {

    // success → destroy OTP (one-time use)
    unset($_SESSION["otp"]);
    unset($_SESSION["otp_expiry"]);

    // OPTIONAL: mark user as logged in
    $_SESSION["authenticated"] = true;

echo json_encode([
        "success" => true,
        "message" => "OTP verified"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Invalid OTP"
    ]);
}