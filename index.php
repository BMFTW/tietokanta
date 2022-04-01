<!DOCTYPE html>

<html>

	<head>
		
		<!-- Title -->
		<title>Tietokantakäyttöliittymä</title>  

		<!-- CSS -->
		<link href = "style.css" rel = "stylesheet">

		<!-- JavaScript -->
		<script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<script src = "jQuery.js?<?php echo filemtime("jQuery.js"); ?>"></script>
		<script src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
		<script src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
		
	</head>

	<body>
	
			<!-- Logo -->
			<a href = "https://www.awanic.fi/tietokanta/"><img src = "logo.png"></a>

			<!-- Heading -->
			<h1>Käyttöliittymä tietokantaan</h1>
				
			<!-- Table selection -->
			<form name = "table_selection" method = "get">

				<!-- Tables -->
				<table id = "tables">

					<tr>

						<!-- "Uudet" -->
						<td>
                               
							<!-- Asiakkaat -->
							<b>Asiakkaat</b> <br>

							<label> <input type = "radio"  name = "table"  value = "asiakkaat">                 Asiakkaat            </label> <br>
							<label> <input type = "radio"  name = "table"  value = "asiakkaat_sopimukset">      Sopimukset           </label> <br>
							<label> <input type = "radio"  name = "table"  value = "asiakkaat_tarjoukset">      Tarjoukset           </label> <br>
							<label> <input type = "radio"  name = "table"  value = "asiakkaat_koulutukset">     Koulutukset          </label> <br>
							<label> <input type = "radio"  name = "table"  value = "asiakkaat_laskut">          Laskut               </label> <br>
							<label> <input type = "radio"  name = "table"  value = "asiakkaat_tuotteet">        Tuotteet             </label> <br>
							<label> <input type = "radio"  name = "table"  value = "asiakkaat_tuotteet_hinnat"> Tuotteiden hinnat    </label> <br>
							<label> <input type = "radio"  name = "table"  value = "asiakkaat_lisatiedot">      Lisätiedot           </label> <br> <br>
							
							<!-- Tuotteet -->
							<b>Tuotteet</b> <br>
							
							<label> <input type = "radio"  name = "table"  value = "tuotteet">                  Tuotteet             </label> <br>
							<label> <input type = "radio"  name = "table"  value = "tuotteet_lomakkeet">        Tuotteet - Lomakkeet </label> <br> <br>

						</td>

						<td><script>document.write("&nbsp;".repeat(20))</script></td>

						<!-- "Vanhat" -->
						<td>

							<b>"Vanhat"</b> <br>

							<label> <input type = "radio"  name = "table"  value = "tj_kohteet">          Kaikki TJ-kohteet      </label> <br> <br>

							<label> <input type = "radio"  name = "table"  value = "apro_kohteet">        APro-kohteet           </label> <br>
							<label> <input type = "radio"  name = "table"  value = "eki_kohteet">         EKI-kohteet            </label> <br>
							<label> <input type = "radio"  name = "table"  value = "haipro_asiakkaat">    HaiPro-kohteet         </label> <br>
							<label> <input type = "radio"  name = "table"  value = "posipro_kohteet">     PosiPro-kohteet        </label> <br>
							<label> <input type = "radio"  name = "table"  value = "potra_kohteet">       PotRa-kohteet          </label> <br>
							<label> <input type = "radio"  name = "table"  value = "qpro_kohteet">        QPro-kohteet           </label> <br>
							<label> <input type = "radio"  name = "table"  value = "rapro_kohteet">       RaPro-kohteet          </label> <br>
							<label> <input type = "radio"  name = "table"  value = "spro_kohteet">        SPro-kohteet           </label> <br>
							<label> <input type = "radio"  name = "table"  value = "vakapro_kohteet">     VakaPro-kohteet        </label> <br>
							<label> <input type = "radio"  name = "table"  value = "vpn_kohteet">         VPN-kohteet            </label> <br>
							<label> <input type = "radio"  name = "table"  value = "wb_kohteet">          Whistleblowing-kohteet </label> <br>
							<label> <input type = "radio"  name = "table"  value = "wpro_kohteet">        WPro-kohteet           </label> <br> <br>

							<label> <input type = "radio"  name = "table"  value = "haipro_kohde_laskut"> HaiPro-laskut          </label> <br>
							<label> <input type = "radio"  name = "table"  value = "wpro_kohde_laskut">   WPro-laskut            </label> <br> <br>
							
							<label> <input type = "radio"  name = "table"  value = "LOVe_asiakkaat">      LOVe-asiakkaat         </label> <br>
							<label> <input type = "radio"  name = "table"  value = "LOVe_laskut">         LOVe-laskut            </label> <br> <br>

							<label> <input type = "radio"  name = "table"  value = "SAVe_asiakkaat">      SÄVe-asiakkaat         </label> <br>
							<label> <input type = "radio"  name = "table"  value = "SAVe_laskut">         SÄVe-laskut            </label> <br> <br>

							<label> <input type = "radio"  name = "table"  value = "eloki_asiakkaat">     eLOKI-asiakkaat        </label> <br> <br>

						<td>

					</tr>

				</table>

				<!-- Choose table -->
				<label> <script>document.write("&nbsp;".repeat(30))</script> <input type = "submit" name = "choose_table" value = "Valitse taulu"> </label> <br><br>

			</form>

			<!-- PHP -->
			<?php

				include "functions.php";
				
				// Table is selected
				if ( isset($_GET["choose_table"]) ) {

					// No table selected
					if ( !isset($_GET["table"]) ) {
						echo "<p style = 'color: red;'>Valitse taulu</p>";
						return;
					}

					// Table
					$table = $_GET["table"];
					$table = htmlspecialchars($table);

					// Columns
					$columns = getColumns($table);
					$columns = array_map("htmlspecialchars", $columns);

					// Skip column selection?
					$skip_column_selection = array (

						"asiakkaat",
						"asiakkaat_tarjoukset",
						"asiakkaat_koulutukset",
						"asiakkaat_tuotteet_hinnat",
						"asiakkaat_lisatiedot",

						"tuotteet",
						"tuotteet_lomakkeet",

						"tj_kohteet",
						"eki_kohteet",
						"vpn_kohteet"

					);

					$skip_column_selection = in_array( $table, $skip_column_selection );

					// Checkboxes for column selection
					if ( !isset($_POST["show_table"]) && !$skip_column_selection ) {
					
						echo "<b>Valitse tiedot</b>";

						echo "<br><br>";

						// Choose all
						echo "<label> <input type = 'checkbox' name = 'chooseAll'> Valitse kaikki </label>";

						echo "<br><br>";

						// Checkboxes
						echo "<form name = 'variables' method = 'post'>";

						foreach ( $columns as $column ) {
							echo "<label> <input type = 'checkbox' name = 'selected_columns[]' value = '" . $column . "'>" . $column . "</label>";
							echo "<br>";
						}

						echo "<br>";
						
						// Show table
						echo "<input type = 'submit' name = 'show_table' value = 'Avaa taulu'>";

						echo "</form>";

					}
					
					// Show table
					else {

						// Selected table name
						$tables = array(
							"asiakkaat"                 => "Asiakkaat", 
							"asiakkaat_sopimukset"      => "Sopimukset", 
							"asiakkaat_tarjoukset"      => "Tarjoukset", 
							"asiakkaat_koulutukset"     => "Koulutukset", 
							"asiakkaat_laskut"          => "Laskut", 
							"asiakkaat_tuotteet"        => "Asiakkaat - Tuotteet", 
							"asiakkaat_tuotteet_hinnat" => "Asiakkaat - Tuotteet - Hinnat", 
							"asiakkaat_lisatiedot"      => "Lisätiedot", 
							"tuotteet"                  => "Tuotteet", 
							"tuotteet_lomakkeet"        => "Lomakkeet",
							"tj_kohteet"                => "Kaikki TJ-kohteet",
							"apro_kohteet"              => "APro-kohteet",
							"eki_kohteet"               => "EKI-kohteet",
							"haipro_asiakkaat"          => "HaiPro-kohteet",
							"posipro_kohteet"           => "PosiPro-kohteet",
							"qpro_kohteet"              => "QPro-kohteet",
							"spro_kohteet"              => "SPro-kohteet",
							"vakapro_kohteet"           => "VakaPro-kohteet",
							"vpn_kohteet"               => "VPN-kohteet",
							"wb_kohteet"                => "Whistleblowing-kohteet",
							"wpro_kohteet"              => "WPro-kohteet",
							"potra_kohteet"             => "PotRa-kohteet",
							"rapro_kohteet"             => "RaPro-kohteet",
							"haipro_kohde_laskut"       => "HaiPro-laskut",
							"wpro_kohde_laskut"         => "WPro-laskut",
							"LOVe_asiakkaat"            => "LOVe-asiakkaat",
							"LOVe_laskut"               => "LOVe-laskut",
							"SAVe_asiakkaat"            => "SÄVe-asiakkaat",
							"SAVe_laskut"               => "SÄVe-laskut",
							"eloki_asiakkaat"           => "eLOKI-asiakkaat"
						);
										
						echo "<h3 id = 'table_name'>" . $tables[$table] . "</h3>";

						echo "&nbsp;&nbsp;";

						// Insturctions
						echo "<img id = 'info' src = 'info.gif'>";

						echo "<br>";

						// Update data
						echo "<p id = 'update_table'></p>";
						echo "<p id = 'insert_row'>  </p>";
						echo "<p id = 'delete_row'>  </p>";

						// Filtered table
						echo "<div id = 'new_table'></div>";

						// Generate table
						if ( $skip_column_selection ) {
							$html = generateTable($table, "*");
						} else {
							$selected_columns = $_POST['selected_columns'];
							$html = generateTable($table, $selected_columns);
						}

						echo $html;

						echo "<br>";

						// Add row
						echo "<input type = 'button' id = 'addRow' value = 'Lisää rivi'>";

						echo "&nbsp;&nbsp;&nbsp;";

						// Delete row
						echo "<input type = 'button' id = 'deleteRow' value = 'Poista rivi'>";

						// Hidden data
						echo "<div class = 'hidden'>";
							echo "<p id = 'selected_table'>" . $table . "</p>";
						echo "</div>";

					}

				}

			?>

	</body>

</html>