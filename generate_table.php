<?php

include("config.php");

$table   = $_REQUEST["table"];
$columns = $_REQUEST["columns"];

$db = in_array($table, $haipro_tables) ? "haipro" : "verkkokurssit";

$conn = new PDO("sqlsrv:Server=$server;Database=$db", $user_db, $pwd_db);

if ( $columns == "*" ) {

    $sql = "SELECT NAME FROM SYS.COLUMNS WHERE OBJECT_ID = OBJECT_ID(?)";

    $stmt = $conn -> prepare($sql);

    $stmt -> execute([$table]);

    $columns = $stmt -> fetchAll(PDO::FETCH_COLUMN);

    $columns = array_diff($columns, array("verkkolaskutusosoite", "laskutusosoite", "laskutusosoite2"));

} else {

    $columns = explode(",", $columns);

}

$html = "<table>";

// Headers
$headers = "<thead><tr>";
foreach ( $columns as $column ) {
    $headers .= "<th>" . $column . "</th>";
}
$headers .= "</tr></thead>";

$html .= $headers;

$columns = preg_replace("/^/", "[", $columns);
$columns = preg_replace("/$/", "]", $columns);

// Data
$sql = "SELECT " . implode(", ", $columns) . " FROM $table ORDER BY CAST($columns[0] AS INT)";

$rows = $conn -> query($sql);

$columns = preg_replace("/^\[/", "", $columns);
$columns = preg_replace("/\]$/", "", $columns);

$data = "<tbody>";

foreach ( $rows as $row ) {

    $data .= "<tr>";

    foreach ( $columns as $column ) {

        $value = $row[$column];
        $value = is_numeric($value) && strpos($value, ".") !== false ? number_format($value, 1, "." , "") : $value;
        $data .= "<td>" . $value . "</td>";

    }

    $data .= "</tr>";
}

$html .= $data;
$html .= "</tbody>";

// Edit table
$html = str_replace("<table>", "<table border = '1' id = 'table' class = 'table w3'>", $html);
$html = str_replace("<th>", "<th><div>", $html);
$html = str_replace("</th>", "</div></th>", $html);
$html = str_replace("<td", "<td contenteditable = 'true'", $html);
$html = str_replace("</td>", "<input type = 'button' class = 'btn btn-primary save' value = 'Tallenna'></td>", $html);
$html = str_replace("</td>", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>", $html);
$html = str_replace('style="text-align: right;"', "", $html);
$html = preg_replace("/>\s+<\/td>/", ">&nbsp;</td>", $html);
$html = preg_replace("/\s+/", " ", $html);

$html .= "</table>";

// Check malicious code
if ( strpos($html, "<script") !== false ) {
    die("<p style = 'color: red;'>Syötteessä vahingollista koodia, ohjelman suoritus keskeytetty</p>");
}

// Return table
echo $html;

?>