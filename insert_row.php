<?php

session_start();

include "functions.php";

$table  = $_REQUEST["table"];
$id_col = $_REQUEST["id_col"];
$value  = $_REQUEST["value"];

insertRow($table, $id_col, $value);
  
?>