<?php

include("config.php");

$table  = $_REQUEST["table"];
$id_col = $_REQUEST["id_col"];
$value  = $_REQUEST["value"];

if ( !is_numeric( $value ) ) {
    echo "<b>Lisäys epäonnistui. Virheilmoitus:</b><br><br>Lisättävän arvon tulee olla numero.";
    exit();
}

$db = in_array($table, $haipro_tables) ? "haipro" : "verkkokurssit";

$conn = new PDO("sqlsrv:Server=$server;Database=$db", $user_db, $pwd_db);

$conn -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

$sql = "INSERT INTO $table ($id_col) VALUES (?)";

try {

    $stmt = $conn -> prepare($sql);

    $stmt -> execute([$value]);

} catch ( PDOException $e ) {

    echo "<b>Lisäys epäonnistui. Virheilmoitus:</b><br><i>" . $e -> getMessage() . "</i>";

}
  
?>