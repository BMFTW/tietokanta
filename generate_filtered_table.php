<?php

session_start();

include "functions.php";

$sql = $_REQUEST["sql"];
$sql = str_replace("<space>", " ", $sql);

// $sql = htmlspecialchars($sql);
// $sql = mysql_real_escape_string($sql);

echo generate_filtered_table($sql);
  
?>