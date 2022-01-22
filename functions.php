<?php

// Login data
$server = "83.150.87.73";
$user   = "haipro";
$pwd    = "haipro";

// HaiPro tables
$haipro_tables = array(

  "asiakkaat",
  "asiakkaat_sopimukset",
  "asiakkaat_tarjoukset",
  "asiakkaat_koulutukset",
  "asiakkaat_laskut",
  "asiakkaat_tuotteet",
  "asiakkaat_tuotteet_hinnat",
  "asiakkaat_lisatiedot",
  "tuotteet",
  "tuotteet_osiot",
  "apro_kohteet",
  "eki_kohteet",
  "haipro_kohteet",
  "posipro_kohteet",
  "qpro_kohteet",
  "spro_kohteet",
  "vakapro_kohteet",
  "vpn_kohteet",
  "wb_kohteet",
  "wpro_kohteet",
  "potra_kohteet",
  "rapro_kohteet",
  "haipro_kohde_laskut",
  "wpro_kohde_laskut"

);

// Get columns
function getColumns($table) {
      
  global $server, $user, $pwd, $haipro_tables;

  $db = in_array($table, $haipro_tables) ? "haipro" : "verkkokurssit";
  
  $conn = new PDO("sqlsrv:Server=$server;Database=$db", $user, $pwd);

  $sql = "SELECT NAME FROM SYS.COLUMNS WHERE OBJECT_ID = OBJECT_ID(?)";
  
  $stmt = $conn -> prepare($sql);

  $stmt -> execute([$table]);

  $columns = $stmt -> fetchAll(PDO::FETCH_COLUMN);

  $columns = array_diff($columns, array("verkkolaskutusosoite", "laskutusosoite", "laskutusosoite2"));
  
  return($columns); 
    
}

// Generate table
function generateTable($table, $columns) {

  global $server, $user, $pwd, $haipro_tables;

  $html = "<table>";

  $columns = $columns == "*" ? getColumns($table) : $columns;

  // Headers
  $headers = "<tr>";
  foreach ( $columns as $column ) {
    $headers .= "<th>" . $column . "</th>";
  }
  $headers .= "</tr>";

  $html .= $headers;

  $columns = preg_replace("/^/", "[", $columns);
  $columns = preg_replace("/$/", "]", $columns);

  $db = in_array($table, $haipro_tables) ? "haipro" : "verkkokurssit";

  $conn = new PDO("sqlsrv:Server=$server;Database=$db", $user, $pwd);
  $sql = "SELECT " . implode(", ", $columns) . " FROM $table ORDER BY CAST($columns[0] AS INT)";
  $rows = $conn -> query($sql);

  $columns = preg_replace("/^\[/", "", $columns);
  $columns = preg_replace("/\]$/", "", $columns);

  // Data
  $data = "";

  foreach ( $rows as $row ) {
    $data .= "<tr>";
    foreach ( $columns as $column ) {
      $value = $row[$column];
      $value = is_numeric($value) && strpos($value, '.') !== false ? number_format($value, 1, '.' , '') : $value;
      $data .= "<td>" . $value . "</td>";
    }
    $data .= "</tr>";
  }

  $html .= $data;

  // Edit table
  $html = str_replace("<table>", "<table border = '1' id = 'table' class = 'w3'>", $html);
  $html = str_replace("<th>", "<th><div>", $html);
  $html = str_replace("</th>", "</div></th>", $html);
  $html = str_replace("<td", "<td contenteditable = 'true'", $html);
  $html = str_replace("</td>", "<input type = 'button' class = 'save' value = 'Tallenna'></td>", $html);
  $html = str_replace("</td>", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>", $html);
  $html = str_replace('style="text-align: right;"', "", $html);
  $html = preg_replace("/>\s+<\/td>/", ">&nbsp;</td>", $html);
  $html = preg_replace("/\s+/", " ", $html);

  $html .= "</table>";

  $html .= "<p id = 'sql' class = 'hidden'>$sql</p>";

  // Check malicious code
  if ( strpos($html, "<script") !== false ) {
    die("<p style = 'color: red;'>Syötteessä vahingollista koodia, ohjelman suoritus keskeytetty</p>");
  }

  // Return table
  return($html);
    
}

// Generate filtered table
function generate_filtered_table($sql) {

  global $server, $user, $pwd, $haipro_tables;

  $sql = str_replace("<temp>", "", $sql);

  // Extract table
  $pattern = "/(?<=FROM )[^\s]+/";
  preg_match($pattern, $sql, $table);
  $table = $table[0];

   // Extract columns
  $pattern = "/(?<=SELECT ).+(?= FROM)/";
  preg_match($pattern, $sql, $columns);
  $columns = $columns[0];
  $columns = str_replace("[", "", $columns);
  $columns = str_replace("]", "", $columns);
  $columns = explode(", ", $columns);

  $html = "<table>";

  // Headers
  $headers = "<tr>";
  foreach ( $columns as $column ) {
    $headers .= "<th>" . $column . "</th>";
  }
  $headers .= "</tr>";

  $html .= $headers;

  $columns = preg_replace("/^/", "[", $columns);
  $columns = preg_replace("/$/", "]", $columns);

  $db = in_array($table, $haipro_tables) ? "haipro" : "verkkokurssit";

  preg_match("/ ORDER.+(?= (WHERE|AND))/", $sql, $order_by);
  $order_by = $order_by[0];
  $sql = str_replace($order_by, "", $sql);
  $sql = $sql . $order_by;

  $conn = new PDO("sqlsrv:Server=$server;Database=$db", $user, $pwd);
  $rows = $conn -> query($sql);

  $columns = preg_replace("/^\[/", "", $columns);
  $columns = preg_replace("/\]$/", "", $columns);

  // Data
  $data = "";
  foreach ( $rows as $row ) {
    $data .= "<tr>";
    foreach ( $columns as $column ) {
      $value = $row[$column];
      $value = is_numeric($value) && strpos($value, '.') !== false ? number_format($value, 1, '.' , '') : $value;
      $data .= "<td>" . $value . "</td>";
    }
    $data .= "</tr>";
  }

  $html .= $data;

  // Edit table
  $html = str_replace("<table>", "<table border = '1' id = 'table' class = 'w3'>", $html);
  $html = str_replace("<th>", "<th><div>", $html);
  $html = str_replace("</th>", "</div></th>", $html);
  $html = str_replace("<td", "<td contenteditable = 'true'", $html);
  $html = str_replace("</td>", "<input type = 'button' class = 'save' value = 'Tallenna'></td>", $html);
  $html = str_replace("</td>", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>", $html);
  $html = str_replace('style="text-align: right;"', "", $html);
  $html = preg_replace("/>\s+<\/td>/", ">&nbsp;</td>", $html);
  $html = preg_replace("/\s+/", " ", $html);

  $html .= "</table>";

  $html .= "<p id = 'sql' class = 'hidden'>$sql</p>";

  // Check malicious code
  if ( strpos($html, "<script") !== false ) {
    die("<p style = 'color: red;'>Syötteessä vahingollista koodia, ohjelman suoritus keskeytetty</p>");
  }

  // Return table
  return($html);
    
}

// Update table values
function updateTable($table, $column, $value, $id_col, $id) {

  global $server, $user, $pwd, $haipro_tables;

  $db = in_array($table, $haipro_tables) ? "haipro" : "verkkokurssit";

  $conn = new PDO("sqlsrv:Server=$server;Database=$db", $user, $pwd);

  $conn -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

  $column = preg_replace("/^/", "[", $column);
  $column = preg_replace("/$/", "]", $column);

  if ( $value == "" || strtolower($value) == "null" ) {
    $value = null;
  }

  $sql = "UPDATE $table SET $column = ? WHERE $id_col = ?";

  try {

    $stmt = $conn -> prepare($sql);
    
    $stmt -> execute([$value, $id]);

  } catch ( PDOException $e ) {

    echo "<b>Tallennus epäonnistui. Virheilmoitus:</b><br><i>" . $e -> getMessage() . "</i>";
    
  }

}

// Insert row
function insertRow($table, $id_col, $value) {

  global $server, $user, $pwd, $haipro_tables;

  $db = in_array($table, $haipro_tables) ? "haipro" : "verkkokurssit";

  $conn = new PDO("sqlsrv:Server=$server;Database=$db", $user, $pwd);

  $conn -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

  $sql = "INSERT INTO $table ($id_col) VALUES (?)";
  
  try {

    $stmt = $conn -> prepare($sql);

    $stmt -> execute([$value]);

  } catch ( PDOException $e ) {

    echo "<b>Lisäys epäonnistui. Virheilmoitus:</b><br><i>" . $e -> getMessage() . "</i>";

  }
  
}

// Delete row
function deleteRow($table, $id_col, $value) {

  global $server, $user, $pwd, $haipro_tables;

  $db = in_array($table, $haipro_tables) ? "haipro" : "verkkokurssit";

  $conn = new PDO("sqlsrv:Server=$server;Database=$db", $user, $pwd);

  $conn -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

  $sql = "DELETE FROM $table WHERE $id_col = ?";
  
  try {

  	$stmt = $conn -> prepare($sql);

    $stmt -> execute([$value]);

  } catch ( PDOException $e ) {

    echo "<b>Poisto epäonnistui. Virheilmoitus:</b><br><i>" . $e -> getMessage() . "</i>";

  }
  
}

?>