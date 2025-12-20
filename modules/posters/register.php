<?php
$user = $_POST['username'] ?? '';
$pass = $_POST['password'] ?? '';
if ($user && $pass) {
    $hash = password_hash($pass, PASSWORD_BCRYPT);
    file_put_contents('./users.txt', "$user:$hash\n", FILE_APPEND);
    echo "Registered! <a href='index.php'>Login</a>";
} else {
?>
<form method="POST">
  <h3>Register</h3>
  <input name="username"><br>
  <input type="password" name="password"><br>
  <button type="submit">Register</button>
</form>
<?php } ?>