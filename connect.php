<?php
// --- 1. ALLOW GITHUB TO ACCESS THIS FILE ---
header("Access-Control-Allow-Origin: *"); // Allows any website to connect
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle "Preflight" check (Browser asks permission before sending data)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Set response type to JSON so JavaScript can read it
header('Content-Type: application/json');

// --- 2. DATABASE CONNECTION (UPDATE THESE!) ---


$host = '';
$user = '';          // replace with your DB username
$password = '';          // replace with your DB password
$dbname = '';    // replace with your DB name

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB Connection Failed: " . $conn->connect_error]);
    exit();
}

// --- 3. HANDLE REGISTRATION ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Get text data
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $whatsapp = $_POST['whatsapp'] ?? '';

    // Handle file upload
    if (isset($_FILES['artwork_path']) && $_FILES['artwork_path']['error'] === 0) {
        $fileTmp = $_FILES['artwork_path']['tmp_name'];
        $fileName = basename($_FILES['artwork_path']['name']);
        $fileSize = $_FILES['artwork_path']['size'];
        $fileType = mime_content_type($fileTmp);

        // Validation
        $allowedTypes = ['image/jpeg', 'image/png'];
        if (!in_array($fileType, $allowedTypes)) {
            echo json_encode(["status" => "error", "message" => "Invalid file type. Only JPG/PNG allowed."]);
            exit();
        }
        if ($fileSize > 2 * 1024 * 1024) {
            echo json_encode(["status" => "error", "message" => "File too large (Max 2MB)."]);
            exit();
        }

        // Create uploads folder if not exists
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $targetPath = $uploadDir . uniqid() . "_" . $fileName;

        if (move_uploaded_file($fileTmp, $targetPath)) {
            // Save to Database
            $stmt = $conn->prepare("INSERT INTO registration (name, email, whatsapp, artwork_path) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $name, $email, $whatsapp, $targetPath);

            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Registration Successful!"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Database Error: " . $stmt->error]);
            }
            $stmt->close();
        } else {
            echo json_encode(["status" => "error", "message" => "File Upload Failed."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Please upload an artwork file."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid Request Method"]);
}

$conn->close();
?>
