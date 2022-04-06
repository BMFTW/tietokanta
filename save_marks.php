<?php

session_start();

include "functions.php";

$table = $_REQUEST["table"];
$value = $_REQUEST["value"];

$table = str_replace("<space>", " ", $table);
$value = str_replace("<space>", " ", $value);

saveMarks($table, $value);
  
?>