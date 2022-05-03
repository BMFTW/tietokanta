<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age = 0");
header("Cache-Control: post-check = 0, pre-check = 0", false);
header("Pragma: no-cache");

?>

<!DOCTYPE html>

<html>

  <head>

    <!-- Title -->
    <title>Tietokantakäyttöliittymä</title>
    <!-- Meta -->
    <meta charset = "utf-8">
    <meta name = "viewport" content = "width = device-width, initial-scale = 1">

    <!-- CSS -->
    <link rel = "stylesheet" href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel = "stylesheet" href = "style_test.css">
    <link href = "https://cdn.jsdelivr.net/gh/aaaakshat/cm-web-fonts@latest/fonts.css" rel = "stylesheet">

    <!-- JavaScript -->
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src = "jQuery.js?<?php echo filemtime("jQuery.js"); ?>"></script>
    <script src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    <script src = "https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>

    <script>

        $(document).ready( function() {

            $(".jumbotron").children().css("margin-right", "50px");

        })

    </script>
    
  </head>
  
  <body>
  
    <!-- Header -->
    <div class = "jumbotron text-center">
      <img src = "logo.png">
      <h5>Tietokantakäyttöliittymä</h5>
      <p><?php echo date("j.n.Y"); ?></p>
    </div>

    <div id = "table_selection" class = "container">

        <div class = "row justify-content-center">

            <!-- "Vanhat" -->
            <div class = "col-md-3 offset-md-1">

                <table class = "table table-responsive">

                    <tbody>
    
                        <!-- <tr><label><input type = "radio" name = "optradio"> Option 1</label></tr> <br> -->

                        <tr><label> <input type = "radio"  name = "table"  value = "crm_tj_kohteet">          Kaikki TJ-kohteet      </label></tr> <br> <br>

                        <tr><label> <input type = "radio"  name = "table"  value = "crm_apro_kohteet">        APro-kohteet           </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_haipro_kohteet">      HaiPro-kohteet         </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_potra_kohteet">       PotRa-kohteet          </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_qpro_kohteet">        QPro-kohteet           </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_rapro_kohteet">       RaPro-kohteet          </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_samra_kohteet">       SamRa-kohteet          </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_spro_kohteet">        SPro-kohteet           </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_vakapro_kohteet">     VakaPro-kohteet        </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_wb_kohteet">          Whistleblowing-kohteet </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_wpro_kohteet">        WPro-kohteet           </label></tr> <br> <br>

                        <tr><label> <input type = "radio"  name = "table"  value = "crm_tj_irtisanotut">      Irtisanotut            </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_tj_arkistokanta">     Arkistokanta           </label></tr> <br> <br>

                        <tr><label> <input type = "radio"  name = "table"  value = "crm_haipro_kohde_laskut"> HaiPro-laskut          </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_wpro_kohde_laskut">   WPro-laskut            </label></tr> <br> <br>

                        <tr><label> <input type = "radio"  name = "table"  value = "crm_LOVe_asiakkaat">      LOVe-asiakkaat         </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_LOVe_laskut">         LOVe-laskut            </label></tr> <br> <br>

                        <tr><label> <input type = "radio"  name = "table"  value = "crm_SAVe_asiakkaat">      SÄVe-asiakkaat         </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_SAVe_laskut">         SÄVe-laskut            </label></tr> <br> <br>

                        <tr><label> <input type = "radio"  name = "table"  value = "crm_eloki_asiakkaat">     eLOKI-asiakkaat        </label></tr> <br> <br>

                    </tbody>
                        
                </table>

            </div>

            <!-- Alataulut -->
            <div class = "col-md-3">

                <table class = "table table-borderless">

                    <tbody>

                        <tr><label> <input type = "radio"  name = "table"  value = "crm_eki_kohteet">     EKI-kohteet </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_posipro_kohteet"> POS-kohteet </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_vpn_kohteet">     VPN-kohteet </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_pk_kohteet">      PK-kohteet  </label></tr> <br>

                    </tbody>

                </table>

            </div>

            <!-- "Uudet" -->
            <div class = "col-md-3">

                <table class = "table table-borderless">

                    <tbody>

                        <!-- Asiakkaat -->
                        <b>Asiakkaat</b> <br>

                        <tr><label> <input type = "radio"  name = "table"  value = "crm_asiakkaat">                 Asiakkaat            </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_asiakkaat_sopimukset">      Sopimukset           </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_asiakkaat_tarjoukset">      Tarjoukset           </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_asiakkaat_koulutukset">     Koulutukset          </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_asiakkaat_laskut">          Laskut               </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_asiakkaat_tuotteet">        Tuotteet             </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_asiakkaat_tuotteet_hinnat"> Tuotteiden hinnat    </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_asiakkaat_lisatiedot">      Lisätiedot           </label></tr> <br> <br>

                        <!-- Tuotteet -->
                        <b>Tuotteet</b> <br>

                        <tr><label> <input type = "radio"  name = "table"  value = "crm_tuotteet">           Tuotteet             </label></tr> <br>
                        <tr><label> <input type = "radio"  name = "table"  value = "crm_tuotteet_lomakkeet"> Tuotteet - Lomakkeet </label></tr> <br> <br>

                    </tbody>

                </table>

            </div>

        </div>

    </div>

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

        <!-- Ohje -->
        <div class = "modal" id = "modal_instructions">

          <div class = "modal-dialog">

            <div class = "modal-content">

              <!-- Modal Header -->
              <div class = "modal-header">
                <h4 class = "modal-title" style = "text-align: center">Ohje</h4>
              </div>

              <!-- Modal body -->
              <div class = "modal-body">
                
                <p>- Taulunvalinnassa saa sarakevalintanäkymän esiin painamlla taulun nimeä hiiren oikealla painikkeella"</p>
                <p>- Taulun sarakkeet voi järjestää aakkos-/numerojärjestykseen painamalla hiiren oikealla napilla sarakkeen nimeä"</p>
                <p>- Taulun rivejä voi suodattaa klikkamalla sarakkeen nimen solua ja kirjoittamalla avautuvaan teksikenttään suodatuskriteerin, esimerkiksi 'helsinki', '< 10', 'onarvo' (suodattaa pois tyhjät arvot), 'NOT keuruu' (rivit, joissa sarakkeen arvo ei sisällä kirjainyhdistelmää keuruu), 'tyhjä' (rivit, joissa kyseisen sarakkeen arvo on tyhjä) tai 'huom' (rivit, joissa sarakkeen arvossa on huomioväri). Kaikki suodatukset voi poistaa kerralla painamalla ESC"</p>
                <p>- Sarakkeiden leveyttä voi muuttaa klikkaamalla sarakesolun oikeaa alakulmaa ja rahaamalla hiirtä nappi pohjassa"</p>
                <p>- Taulun solua klikkaamalla tekstiä voi muokata ja tallenusnappia painamalla tallentaa tiedot tietokantaan. Jos tallennus onnistui, niin solun taustaväri muuttuu vihreäksi ja punaiseksi, jos tallennus epäonnistui"</p>
                <p>- Taulun soluihin voi jättää huomiovärin klikkaamalla solua hiiren oikealla napilla"</p>
                <p>- Tauluun voi lisätä rivejä painamalla taulun alla olevaa Lisää rivi -nappia"</p>
                <p>- Taulun rivejä voi poistaa painamalla taulun alla olevaa Poista rivi -nappia"</p>

              </div>

              <!-- Modal footer -->
              <div class = "modal-footer">
                <button type = "button" class = "btn btn-danger" data-dismiss = "modal">Sulje</button>
              </div>

            </div>

          </div>

        </div>

        <button id = "modal_instructions_button" data-toggle = "modal" data-target = "#modal_instructions"></button>

        <!-- Valitse tiedot -->
        <div class = "modal" id = "select_columns">

          <div class = "modal-dialog">

            <div class = "modal-content">

              <!-- Modal Header -->
              <div class = "modal-header">
                <h4 class = "modal-title" style = "text-align: center">Ohje</h4>
              </div>

              <!-- Modal body -->
              <div class = "modal-body">

                <p>- Taulunvalinnassa saa sarakevalintanäkymän esiin painamlla taulun nimeä hiiren oikealla painikkeella"</p>
                <p>- Taulun sarakkeet voi järjestää aakkos-/numerojärjestykseen painamalla hiiren oikealla napilla sarakkeen nimeä"</p>
                <p>- Taulun rivejä voi suodattaa klikkamalla sarakkeen nimen solua ja kirjoittamalla avautuvaan teksikenttään suodatuskriteerin, esimerkiksi 'helsinki', '< 10', 'onarvo' (suodattaa pois tyhjät arvot), 'NOT keuruu' (rivit, joissa sarakkeen arvo ei sisällä kirjainyhdistelmää keuruu), 'tyhjä' (rivit, joissa kyseisen sarakkeen arvo on tyhjä) tai 'huom' (rivit, joissa sarakkeen arvossa on huomioväri). Kaikki suodatukset voi poistaa kerralla painamalla ESC"</p>
                <p>- Sarakkeiden leveyttä voi muuttaa klikkaamalla sarakesolun oikeaa alakulmaa ja rahaamalla hiirtä nappi pohjassa"</p>
                <p>- Taulun solua klikkaamalla tekstiä voi muokata ja tallenusnappia painamalla tallentaa tiedot tietokantaan. Jos tallennus onnistui, niin solun taustaväri muuttuu vihreäksi ja punaiseksi, jos tallennus epäonnistui"</p>
                <p>- Taulun soluihin voi jättää huomiovärin klikkaamalla solua hiiren oikealla napilla"</p>
                <p>- Tauluun voi lisätä rivejä painamalla taulun alla olevaa Lisää rivi -nappia"</p>
                <p>- Taulun rivejä voi poistaa painamalla taulun alla olevaa Poista rivi -nappia"</p>

              </div>

              <!-- Modal footer -->
              <div class = "modal-footer">
                <button type = "button" class = "btn btn-danger" data-dismiss = "modal">Sulje</button>
              </div>

            </div>

          </div>

        </div>

        <button id = "modal_instructions_button" data-toggle = "modal" data-target = "#modal_instructions"></button>

    </div>
  
  </body>

</html>