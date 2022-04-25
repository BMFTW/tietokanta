<?php
      
include("config.php");

$table = $_REQUEST["table"];

$db = in_array($table, $haipro_tables) ? "haipro" : "verkkokurssit";

$conn = new PDO("sqlsrv:Server=$server;Database=$db", $user_db, $pwd_db);

$sql = "SELECT NAME FROM SYS.COLUMNS WHERE OBJECT_ID = OBJECT_ID(?)";

$stmt = $conn -> prepare($sql);

$stmt -> execute([$table]);

$columns = $stmt -> fetchAll(PDO::FETCH_COLUMN);

$columns = array_diff($columns, array("verkkolaskutusosoite", "laskutusosoite", "laskutusosoite2"));

$columns = implode(",", $columns);

echo $columns;
    
?>