<?php
session_start();
if (isset($_POST['logout'])) {
    session_destroy();
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
<title>File Upload</title>
</head>
<body>
<?php if (!isset($_SESSION['user'])): ?>
<form method="POST" action="login.php">
  <h3>Login</h3>
  <input name="username" placeholder="Username"><br>
  <input type="password" name="password" placeholder="Password"><br>
  <button type="submit">Login</button>
</form>
<a href="register.php">Register</a>

<?php else: ?>
<h3>Welcome, <?=htmlspecialchars($_SESSION['user'])?></h3>

<?php if ($_SESSION['user'] === 'admin'): ?>
  <p><a href="files.php">Manage all uploads (Admin)</a></p>
<?php else: ?>
  <p><a href="files.php">View my uploads</a></p>
<?php endif; ?>

<h2>Upload Files</h2>
<form action="upload.php" method="post" enctype="multipart/form-data">
    <input type="file" name="files[]" multiple>
    <button type="submit">Upload Files</button>
</form>

<h2>Upload Folder</h2>
<form action="upload.php" method="post" enctype="multipart/form-data">
    <input type="file" name="files[]" webkitdirectory directory multiple>
    <button type="submit">Upload Folder</button>
</form>


<form method="POST">
  <button name="logout" value="1">Logout</button>
</form>
<?php endif; ?>
</body>
</html>