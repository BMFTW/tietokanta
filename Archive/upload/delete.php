<?php

$folder = $_REQUEST["folder"]; 
$file   = $_REQUEST["file"];

$folder = "uploads/" . $folder . "/";
$file   = str_replace("_", " ", $file);

$filepath = $folder . $file;

unlink($filepath);

if ( count(scandir($folder)) == 2 )
  rmdir($folder);

?>