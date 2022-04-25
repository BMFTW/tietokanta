<?php

include("config.php");

$table  = $_REQUEST["table"];
$id_col = $_REQUEST["id_col"];
$value  = $_REQUEST["value"];

$db = in_array($table, $haipro_tables) ? "haipro" : "verkkokurssit";

$conn = new PDO("sqlsrv:Server=$server;Database=$db", $user_db, $pwd_db);

$conn -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

$sql = "DELETE FROM $table WHERE $id_col = ?";

try {

    $stmt = $conn -> prepare($sql);

    $stmt -> execute([$value]);

} catch ( PDOException $e ) {

    echo "<b>Poisto epäonnistui. Virheilmoitus:</b><br><i>" . $e -> getMessage() . "</i>";

}
  
?>