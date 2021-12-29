<?php

session_start();

include "functions.php";

$table  = $_REQUEST["table"];
$column = $_REQUEST["column"];
$value  = $_REQUEST["value"];
$id_col = $_REQUEST["id_col"];
$id     = $_REQUEST["id"];

$table  = str_replace("<space>", " ", $table);
$column = str_replace("<space>", " ", $column);
$value  = str_replace("<space>", " ", $value);
$id_col = str_replace("<space>", " ", $id_col);
$id     = str_replace("<space>", " ", $id);

echo updateTable($table, $column, $value, $id_col, $id);
  
?>