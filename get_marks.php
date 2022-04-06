<?php

session_start();

include "functions.php";

$table = $_REQUEST["table"];
$table = str_replace("<space>", " ", $table);

echo getMarks($table);
  
?>