<?php

include("config.php");

$table = $_REQUEST["table"];
$value = $_REQUEST["value"];

$table = str_replace("<space>", " ", $table);
$value = str_replace("<space>", " ", $value);

$db = in_array($table, $haipro_tables) ? "haipro" : "verkkokurssit";

$conn = new PDO("sqlsrv:Server=$server;Database=$db", $user_db, $pwd_db);

$sql = "UPDATE crm_marks SET marks = ? WHERE tbl = ?";

$stmt = $conn -> prepare($sql);

$stmt -> execute([$value, $table]);
  
?>