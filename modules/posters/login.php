<?php
session_start();
$user = $_POST['username'] ?? '';
$pass = $_POST['password'] ?? '';
if (!$user || !$pass) die("Missing credentials");

foreach (file('users.txt', FILE_IGNORE_NEW_LINES) as $line) {
    list($u, $h) = explode(':', $line);
    if ($u === $user && password_verify($pass, $h)) {
        $_SESSION['user'] = $user;
        header("Location: index.php");
        exit;
    }
}
die("Invalid login");
