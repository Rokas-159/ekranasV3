<?php
session_start();
if (!isset($_SESSION['user'])) die("Not logged in");

$dir = "uploads/" . $_SESSION['user'];
if (!is_dir($dir)) mkdir($dir, 0777, true);

// allowed extensionai
$allowed_exts = ['pdf', 'png', 'jpg', 'jpeg', 'img', 'docx', 'odf', 'txt', 'json'];

if (empty($_FILES['files'])) die("No files uploaded.");

// keli uploadai vienu metu
foreach ($_FILES['files']['name'] as $i => $name) {
    $tmp = $_FILES['files']['tmp_name'][$i];
    $error = $_FILES['files']['error'][$i];

    if ($error === UPLOAD_ERR_OK && is_uploaded_file($tmp)) {
        $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));

        // duoda adminui nepaisyti tu extensionu ir kelt ka tik sirdis geidzia
        if ($user !== 'admin' && !in_array($ext, $allowed_exts)) {
            echo "<p style='color:red'>Skipped: $name (type not allowed)</p>";
            continue;
        }

        // kazkoks life hack kad pavadinimai failu nekonfliktuotu
        $safeName = preg_replace('/[^a-zA-Z0-9_\.\-]/', '_', $name);
        $target = $dir . "/" . $safeName;

        if (move_uploaded_file($tmp, $target)) {
            echo "<p>Uploaded: $safeName</p>";
        } else {
            echo "<p style='color:red'>Failed: $safeName</p>";
        }
    } else {
        echo "<p style='color:red'>Error uploading $name</p>";
    }
}

echo "<p><a href='index.php'>Back</a></p>";
