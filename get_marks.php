<?php

include("config.php");

$table = $_REQUEST["table"];
$table = str_replace("<space>", " ", $table);

$db = in_array($table, $haipro_tables) ? "haipro" : "verkkokurssit";

$conn = new PDO("sqlsrv:Server=$server;Database=$db", $user_db, $pwd_db);

$sql = "SELECT marks FROM marks_tbl WHERE tbl = ?";

$stmt = $conn -> prepare($sql);

$stmt -> execute([$table]);

$marks = $stmt -> fetch();

$marks = $marks["marks"];

echo $marks;
  
?>