<?php
session_start();
if (!isset($_SESSION['user'])) die("Not logged in");

$user = $_SESSION['user'];
$baseDir = "uploads";

function listFiles($dir, $isAdmin) {
    if (!is_dir($dir)) return [];
    $files = [];
    foreach (scandir($dir) as $f) {
        if ($f === '.' || $f === '..') continue;
        $path = "$dir/$f";
        if (is_dir($path) && $isAdmin) {
            echo "<h3>User: " . htmlspecialchars(basename($path)) . "</h3>";
            listFiles($path, $isAdmin);
        } elseif (is_file($path)) {
            $url = htmlspecialchars($path);
            echo "<li><a href='$url' target='_blank'>$url</a></li>";
        }
    }
}

echo "<h2>Uploaded Files</h2>";
echo "<p><a href='index.php'>Back</a></p>";

if ($user === 'admin') {
    listFiles($baseDir, true);
} else {
    $userDir = "$baseDir/$user";
    echo "<h3>Your files</h3>";
    echo "<ul>";
    listFiles($userDir, false);
    echo "</ul>";
}
