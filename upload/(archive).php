// if ( isset ( $_POST["lataa"] ) ) {

//   $folder = "uploads/";

//   $file = basename($_FILES['file']['name']);
//   $file_location = $folder . $file;
//   $file_type = strtolower( pathinfo($file_location, PATHINFO_EXTENSION) );
//   $file_size = $_FILES['file']['size'];

//   $files = array_slice( scandir($folder), 2 );

//   if ( empty($file) )
//     echo "<p style = 'color: red'>Tiedostoa ei valittu</p>";
//   else if ( in_array( $file, $files ) )
//     echo "<p style = 'color: red'>Valittu tiedosto on jo ladattu</p>";
//   else if ( !in_array( $file_type, array("txt", "pdf") ) )
//     echo "<p style = 'color: red'>Ladattavan tiedoston oltava txt- tai pdf-tiedosto</p>";
//   else if ( $file_size >= 1 * 1024 * 1024 )
//     echo "<p style = 'color: red'>Tiedostokoon oltava alle 1 MB</p>";
//   else if ( move_uploaded_file($_FILES['file']['tmp_name'], $file_location) ) {
//     echo "<p style = 'color: green'>Tiedosto ladattu</p>";
//   } 
//   else
//     echo "<p style = 'color: red'>Tiedoston lataaminen ei onnistunut</p>";

//   $files = array_slice( scandir($folder), 2 );

// }

// else {
//   echo "<br>";
// }