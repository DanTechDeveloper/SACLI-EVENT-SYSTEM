<?php
include 'connect.php';
session_start();

$data = json_decode(file_get_contents("php://input"), true);

$phoneNumber = $data["phoneNumber"];
$fullName = $data["fullName"];

$otp = rand(100000, 999999);
$_SESSION["otp"] = $otp;
$_SESSION["phoneNumber"] = $phoneNumber;
$_SESSION["otp_expiry"] = time() + 300; 

$apiKey = "sk-2b10oneiv8jyucllu0tpmst3ugivz9ln";
$url = "https://smsapiph.onrender.com/api/v1/send/sms";

$payload = [
    "recipient" => $phoneNumber,
    "message" => "Hi $fullName, your verification code is $otp"
];

$options = [
    "http" => [
        "header" =>
            "Content-Type: application/json\r\n" .
            "x-api-key: $apiKey\r\n",
        "method" => "POST",
        "content" => json_encode($payload)
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

// 4. Return response to frontend
if ($response === false) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to send OTP"
    ]);
    exit;
}

echo json_encode([
    "success" => true,
    "message" => "OTP sent successfully"
]);