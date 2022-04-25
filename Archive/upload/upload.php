<?php

$folder = $_REQUEST["folder"]; 
$file   = $_REQUEST["file"];

$folder = "uploads/" . $folder . "/";
$file   = str_replace("_", " ", $file);

if ( !file_exists($folder) && !is_dir($folder) ) {
  mkdir($folder);       
}

sleep(1);

rename("uploads/" . $file, $folder . $file);

?>