<?php

$folder = $_REQUEST["folder"];

$folder = "uploads/" . $folder . "/";

if ( file_exists($folder) && is_dir($folder) ) {

  $files = array_slice( scandir($folder), 2 );

  if ( !empty($files) ) {
    $output = "";
    foreach ( $files as $file )
      $output .= "<a href = 'download.php?file=" . $folder . $file . "'>" . $file . "</a> <span class = 'delete' style = 'color: red'>X</span>". "<br>";
    echo $output;
  }

}

?>