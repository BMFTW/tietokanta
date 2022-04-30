<!DOCTYPE html>

<html>

	<head>
		
		<!-- Title -->
		<title>Tietokantakäyttöliittymä</title>  

		<!-- CSS -->
		<link href = "style.css" rel = "stylesheet" />
		<link href = "https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" rel = "stylesheet" />
		<link href = "https://cdn.jsdelivr.net/gh/aaaakshat/cm-web-fonts@latest/fonts.css" rel="stylesheet">
	
		<!-- JavaScript -->
		<script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<script src = "jQuery.js?<?php echo filemtime("jQuery.js"); ?>"></script>
		<script src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
		<script src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
		<script src = "https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
		
	</head>

	<body>

			<!-- Ohje -->
			<a id = "instructions" href = "javascript:void(0);">Ohje</a> <br>

			<!-- Logo -->
			<img id = "logo" src = "logo.png">

			<!-- Header -->
			<img id = "header" src = "header.png"></h1> <br>
				
			<!-- Table selection -->
			<table id = "table_selection">

				<tr>

					<!-- "Vanhat" -->
					<td id = "tables_vanhat">

						<label> <input type = "radio"  name = "table"  value = "crm_tj_kohteet">          Kaikki TJ-kohteet      </label> <br> <br>

						<label> <input type = "radio"  name = "table"  value = "crm_apro_kohteet">        APro-kohteet           </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_haipro_kohteet">      HaiPro-kohteet         </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_potra_kohteet">       PotRa-kohteet          </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_qpro_kohteet">        QPro-kohteet           </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_rapro_kohteet">       RaPro-kohteet          </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_samra_kohteet">       SamRa-kohteet          </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_spro_kohteet">        SPro-kohteet           </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_vakapro_kohteet">     VakaPro-kohteet        </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_wb_kohteet">          Whistleblowing-kohteet </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_wpro_kohteet">        WPro-kohteet           </label> <br> <br>
						
						<label> <input type = "radio"  name = "table"  value = "crm_tj_irtisanotut">      Irtisanotut            </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_tj_arkistokanta">     Arkistokanta           </label> <br> <br>

						<label> <input type = "radio"  name = "table"  value = "crm_haipro_kohde_laskut"> HaiPro-laskut          </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_wpro_kohde_laskut">   WPro-laskut            </label> <br> <br>
						
						<label> <input type = "radio"  name = "table"  value = "crm_LOVe_asiakkaat">      LOVe-asiakkaat         </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_LOVe_laskut">         LOVe-laskut            </label> <br> <br>

						<label> <input type = "radio"  name = "table"  value = "crm_SAVe_asiakkaat">      SÄVe-asiakkaat         </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_SAVe_laskut">         SÄVe-laskut            </label> <br> <br>

						<label> <input type = "radio"  name = "table"  value = "crm_eloki_asiakkaat">     eLOKI-asiakkaat        </label> <br> <br>

					</td>

					<!-- Alataulut -->
					<td id = "tables_alataulut">

						<b>Alataulut</b> <br>

						<label> <input type = "radio"  name = "table"  value = "crm_eki_kohteet">     EKI-kohteet </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_posipro_kohteet"> POS-kohteet </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_vpn_kohteet">     VPN-kohteet </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_pk_kohteet">      PK-kohteet  </label> <br>

					</td>

					<!-- "Uudet" -->
					<td id = "tables_uudet">
							
						<!-- Asiakkaat -->
						<b>Asiakkaat</b> <br>

						<label> <input type = "radio"  name = "table"  value = "crm_asiakkaat">                 Asiakkaat            </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_asiakkaat_sopimukset">      Sopimukset           </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_asiakkaat_tarjoukset">      Tarjoukset           </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_asiakkaat_koulutukset">     Koulutukset          </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_asiakkaat_laskut">          Laskut               </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_asiakkaat_tuotteet">        Tuotteet             </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_asiakkaat_tuotteet_hinnat"> Tuotteiden hinnat    </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_asiakkaat_lisatiedot">      Lisätiedot           </label> <br> <br>
						
						<!-- Tuotteet -->
						<b>Tuotteet</b> <br>
						
						<label> <input type = "radio"  name = "table"  value = "crm_tuotteet">           Tuotteet             </label> <br>
						<label> <input type = "radio"  name = "table"  value = "crm_tuotteet_lomakkeet"> Tuotteet - Lomakkeet </label> <br> <br>

					</td>

				</tr>

			</table>

			<br>
			
			<!-- Table name -->
			<div>
				<h3 id = "table_name"></h3>
			<div>

			<!-- Table update error messages -->
			<p id = "update_table"></p>
			
			<!-- Table -->
			<div id = "table_element"></div>

			<br>

			<!-- Add row -->
			<input type = "button" class = "hidden" id = "addRow" value = "Lisää rivi">

			&nbsp;

			<!-- Delete row -->
			<input type = "button" class = "hidden" id = "deleteRow" value = "Poista rivi">

			<!-- Hidden data -->
			<div class = "hidden">

				<p id = "selected_table"></p>
				<p id = "id_col">        </p>
				<p id = "columns">       </p>
				<p id = "get_marks">     </p>
				<p id = "save_marks">    </p>
				<p id = "insert_row">  	 </p>
				<p id = "delete_row">    </p>
				
				<!-- Modal -->
				<div class = "modal" id = "modal_instructions"></div>
				<div class = "modal" id = "modal_column_selection"></div>

			</div>

	</body>

</html>