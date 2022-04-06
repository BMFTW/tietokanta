$(document).ready( function() {

  // Table
  var table = $("#selected_table").text();

  // Center
  $("#logo").css("margin-top", "10px").css("margin-left", "750px").css("margin-bottom", "-5px");
  $("#header").css("margin-left", "625px").css("margin-bottom", "25px");
  $("#tables").css("margin-left", "500px");
  $("#tables_alataulut").css("margin-top", "100px");
  $("#valitse_tiedot").css("margin-top", "10px").css("margin-left", "765px");
  $("#valitse_tiedot_txt").css("margin-left", "10px");
  $("input[type=submit]").css("margin-top", "10px").css("margin-bottom", "20px").css("margin-left", "780px");

  $("input[value^=asiakkaat]").prop("disabled", "true");

  // Color table names
  $("label").has("input[value$=kohteet]").css("color", "blue");
  $("label").has("input[value=haipro_asiakkaat]").css("color", "blue");
  $("label").has("input[value^=tj]").css("color", "grey");
  $("label").has("input[value=tj_kohteet]").css("color", "red");
  $("label").has("input[value$=_kohde_laskut]").css("color", "brown");
  $("label").has("input[value^=LOVe]").css("color", "YellowGreen");
  $("label").has("input[value^=SAVe]").css("color", "CadetBlue");
  $("label").has("input[value=eloki_asiakkaat]").css("color", "Tomato");
  $("label").has("input[value^=asiakkaat]").css("color", "LightGrey");
  $("label").has("input[value^=tuotteet]").css("color", "green");
  
  // ID column
  var id_col;

  if ( table == "asiakkaat" || table == "asiakkaat_sopimukset" || table == "asiakkaat_tarjoukset" || table == "asiakkaat_koulutukset" || table == "asiakkaat_laskut" || table == "asiakkaat_tuotteet" || table == "asiakkaat_lisatiedot" )
    id_col = "asiakasID";
  else if ( table == "asiakkaat_tuotteet_hinnat" )
    id_col = "ATUID";
  else if ( table == "tuotteet" )
    id_col = "tuoteID";
  else if ( table == "tuotteet_lomakkeet" )
    id_col = "OID";
  else if ( table == "tj_kohteet" || table == "apro_kohteet" || table == "eki_kohteet" || table == "haipro_asiakkaat" || table == "posipro_kohteet" || table == "spro_kohteet" || table == "vakapro_kohteet" || table == "vpn_kohteet" || table == "wb_kohteet" || table == "wpro_kohteet" || table == "potra_kohteet" || table == "rapro_kohteet" || table == "samra_kohteet" || table == "tj_irtisanotut" || table == "tj_arkistokanta" || table == "haipro_pk_kohteet" )
    id_col = "Kohde_ID";
  else if ( table == "qpro_kohteet" )
    id_col = "KohdeID";
  else if ( table == "haipro_kohde_laskut" || table == "wpro_kohde_laskut" || table == "LOVe_laskut" || table == "SAVe_laskut" )
    id_col = "lasku_nro";
  else if ( table == "LOVe_asiakkaat" || table == "SAVe_asiakkaat" || table == "eloki_asiakkaat" )
    id_col = "Asiakas_ID";

  // Read marks
  $("#get_marks").load("get_marks.php?table=" + table, function() {

    var marks = $(this).text();

    marks = marks == "" ? "[]" : marks;
    marks = JSON.parse(marks);

    for ( var i = 0; i < marks.length; i++ ) {
      
      id_val = marks[i][1];
      column = marks[i][0];

      var p_id = $("th:contains(" + id_col + ")").index();
      
      var n_id = $("#table tr").find("td:eq(" + p_id + ")").filter( function() { return $(this).text().trim() == id_val;  } ).closest("tr").index();
      var p = $("th:contains(" + column + ")").index();

      if ( p != "-1" )
        $("#table").find("tr:eq(" + n_id + ")").find("td:eq(" + p + ")").addClass("marked").css("background-color", "brown"); 

    }

  });

  $("#get_marks, #save_marks").hide();

  // Valitse kaikki
  $("input[name=chooseAll]").click( function() {
    
    var checked = $(this).is(":checked");
  
    $("input[type=checkbox]").each( function() {

      if ( $(this).is(":checked") != checked ) {
        $(this).click();
      }

    });
  
  });

  // As inputs
  function asInputs(values) {
    var output = "";
    for ( var i = 0; i < values.length; i++ )
      output += "input[value='" + values[i] + "'], ";
    output = output.replace(/, $/, "");
    return output;
  }

  // Always checked
  var uudet  = ["asiakasID", "ASID", "ATID", "AKID", "ALID", "ATUID", "ATHID", "tuoteID", "osioID"];
  var vanhat = ["ID", "Kohde_ID", "KohdeID", "KL_ID", "lasku_nro", "Asiakas_ID", "LID"];
  var always_checked = uudet.concat(vanhat);
  var $always_checked = $(asInputs(always_checked));
  $always_checked.prop("checked", true);

  $always_checked.click( function() {
    if ( !$(this).is(':checked') ) {
      $(this).prop("checked", true);
    }
  });

  // Check by default
  var check_by_default  = ["Kohde_nimi", "KohdeNimi", "kohde_ID", "Asiakas_nimi", "asiakas_ID"];
  var $check_by_default = $(asInputs(check_by_default));
  $check_by_default.prop("checked", true);

  // (pakollinen)
  $always_checked.closest("label").append("<span style = 'color: grey;'> (pakollinen)</span>");

  // Table name and info sign on the same line
  $("#table_name, #info").css("display", "inline");

  // Info
  $("#info").click( function() {
        
    var txt = "";
  
    txt += "Ohjeet \n\n";
    txt += "- Taulun sarakkeet voi järjestää aakkos-/numerojärjestykseen painamalla hiiren oikealla napilla sarakkeen nimeä \n\n";
    txt += "- Taulun rivejä voi suodattaa klikkamalla sarakkeen nimen solua ja kirjoittamalla avautuvaan teksikenttään suodatuskriteerin, esimerkiksi 'helsinki', '< 10', 'NOTNULL' (suodattaa pois tyhjät arvot) tai 'NOT keuruu' (rivit, joissa sarakkeen arvo ei sisällä kirjainyhdistelmää keuruu)\n\n";
    txt += "- Sarakkeiden leveyttä voi muuttaa klikkaamalla sarakesolun oikeaa alakulmaa ja rahaamalla hiirtä nappi pohjassa \n\n";
    txt += "- Taulun solua klikkaamalla tekstiä voi muokata ja tallenusnappia painamalla tallentaa tiedot tietokantaan. Jos tallennus onnistui, niin solun taustaväri muuttuu vihreäksi ja punaiseksi, jos tallennus epäonnistui \n\n";
    txt += "- Taulun soluihin voi jättää huomiovärin klikkaamalla solua hiiren oikealla napilla \n\n";
    txt += "- Tauluun voi lisätä rivejä painamalla taulun alla olevaa Lisää rivi -nappia \n\n";
    txt += "- Taulun rivejä voi poistaa painamalla taulun alla olevaa Poista rivi -nappia \n\n";
  
    alert(txt);
  
  })
  
  // Show filter
  $(document).on("click", "th", function(event) {

    var column = $(this).closest("th").text();
        column = column.replace(" Ok", "");

    var $target = $(event.target);
    
    if ( !$(this).find("input").length ) {
      $(this).append("<input type = 'text' class = 'filter_text' name = '" + column + "' placeholder = 'Suodata...'> ");
      $(this).append("<button class = 'filter_button'>Ok</button>");
    } else if ( !$target.is(".filter_text") ) {
      $(this).empty();
      $(this).html("<div>" + column + "</div>");
    }

  })
  
  // Filter
  $(document).on("click", ".filter_button", function() {

    var column = $(this).closest("th").text();
        column = column.replace(" Ok", "");

    var filter = $("input[name=" + column + "").val();
        filter = filter.trim().replace(/\s+/g, " ");

    var sql = $("#sql").text();

    if ( ( sql.match(/WHERE/g) || [] ).length == 0 ) {
      sql += " WHERE [" + column + "] ";
    } else {
      sql += " AND [" + column + "] ";
    }

    if ( filter.startsWith("<") || filter.startsWith(">") )
      sql += filter;
    else if ( filter == "" )
      sql += "IS NULL";
    else if ( filter == "NOTNULL" )
      sql += "IS NOT NULL";
    else if ( filter.startsWith("NOT ") ) {
      filter = filter.replace("NOT ", "");
      sql += "NOT LIKE '%<temp>" + filter + "%'";
    } else
      sql += "LIKE '%<temp>" + filter + "%'";

    $("#sql").text(sql.replace("<temp>", ""))

    sql = sql.replace(/\s/g, "<space>");

    $("#table").remove();
    
    $("#new_table").load("generate_filtered_table.php?sql=" + sql, function () {

        $(document).ready( function() {

          // Table
          var table = $("#selected_table").text();

          // Read marks
          $("#get_marks").load("get_marks.php?table=" + table, function() {

            var marks = $(this).text();

            marks = marks == "" ? "[]" : marks;
            marks = JSON.parse(marks);

            for ( var i = 0; i < marks.length; i++ ) {
              
              id_val = marks[i][1];
              column = marks[i][0];
            
              var n_id = $("#table").find("td:contains('" + id_val  + "')").closest("tr").index();
              var p = $("th:contains(" + column + ")").index();

              if ( p != "-1" )
                $("#table").find("tr:eq(" + n_id + ")").find("td:eq(" + p + ")").addClass("marked").css("background-color", "brown"); 

            }

          });

          $("#get_marks, #save_marks").hide();

          // ID column
          var id_col;

          if ( table == "asiakkaat" || table == "asiakkaat_sopimukset" || table == "asiakkaat_tarjoukset" || table == "asiakkaat_koulutukset" || table == "asiakkaat_laskut" || table == "asiakkaat_tuotteet" || table == "asiakkaat_lisatiedot" )
            id_col = "asiakasID";
          else if ( table == "asiakkaat_tuotteet_hinnat" )
            id_col = "ATUID";
          else if ( table == "tuotteet" )
            id_col = "tuoteID";
          else if ( table == "tuotteet_lomakkeet" )
            id_col = "OID";
          else if ( table == "tj_kohteet" || table == "apro_kohteet" || table == "eki_kohteet" || table == "haipro_asiakkaat" || table == "posipro_kohteet" || table == "spro_kohteet" || table == "vakapro_kohteet" || table == "vpn_kohteet" || table == "wb_kohteet" || table == "wpro_kohteet" || table == "potra_kohteet" || table == "rapro_kohteet" || table == "samra_kohteet" || table == "tj_irtisanotut" || table == "tj_arkistokanta" || table == "haipro_pk_kohteet" )
            id_col = "Kohde_ID";
          else if ( table == "qpro_kohteet" )
            id_col = "KohdeID";
          else if ( table == "haipro_kohde_laskut" || table == "wpro_kohde_laskut" || table == "LOVe_laskut" || table == "SAVe_laskut" )
            id_col = "lasku_nro";
          else if ( table == "LOVe_asiakkaat" || table == "SAVe_asiakkaat" || table == "eloki_asiakkaat" )
            id_col = "Asiakas_ID";

          // Valitse kaikki
          $("input[name=chooseAll]").click( function() {

            var checked = $(this).is(":checked");

            $("input[type=checkbox]").each( function() {

              if ( $(this).is(":checked") != checked ) {
                $(this).click();
              }

            });

          });

          // As inputs
          function asInputs(values) {
            var output = "";
            for ( var i = 0; i < values.length; i++ )
              output += "input[value='" + values[i] + "'], ";
            output = output.replace(/, $/, "");
            return output;
          }

          // Always checked
          var uudet  = ["asiakasID", "ASID", "ATID", "AKID", "ALID", "ATUID", "ATHID", "tuoteID", "osioID"];
          var vanhat = ["ID", "Kohde_ID", "KohdeID", "KL_ID", "lasku_nro", "Asiakas_ID", "LID"];
          var always_checked = uudet.concat(vanhat);
          var $always_checked = $(asInputs(always_checked));
          $always_checked.prop("checked", true);

          $always_checked.click( function() {
            if ( !$(this).is(':checked') ) {
              $(this).prop("checked", true);
            }
          });

          // Check by default
          var check_by_default  = ["Kohde_nimi", "KohdeNimi", "kohde_ID", "Asiakas_nimi", "asiakas_ID"];
          var $check_by_default = $(asInputs(check_by_default));
          $check_by_default.prop("checked", true);

          // (pakollinen)
          $always_checked.closest("label").append("<span style = 'color: grey;'> (pakollinen)</span>");

          // Table name and info sign on the same line
          $("#table_name, #info").css("display", "inline");

          // Info
          $("#info").click( function() {
                
            var txt = "";
          
            txt += "Ohjeet \n\n";
            txt += "- Taulun sarakkeet voi järjestää aakkos-/numerojärjestykseen painamalla hiiren oikealla napilla sarakkeen nimeä \n\n";
            txt += "- Taulun rivejä voi suodattaa klikkamalla sarakkeen nimen solua ja kirjoittamalla avautuvaan teksikenttään suodatuskriteerin, esimerkiksi 'helsinki', '< 10', 'NOTNULL' (suodattaa pois tyhjät arvot) tai 'NOT keuruu' (rivit, joissa sarakkeen arvo ei sisällä kirjainyhdistelmää keuruu)\n\n";
            txt += "- Sarakkeiden leveyttä voi muuttaa klikkaamalla sarakesolun oikeaa alakulmaa ja rahaamalla hiirtä nappi pohjassa \n\n";
            txt += "- Taulun solua klikkaamalla tekstiä voi muokata ja tallenusnappia painamalla tallentaa tiedot tietokantaan. Jos tallennus onnistui, niin solun taustaväri muuttuu vihreäksi ja punaiseksi, jos tallennus epäonnistui \n\n";
            txt += "- Taulun soluihin voi jättää huomiovärin klikkaamalla solua hiiren oikealla napilla \n\n";
            txt += "- Tauluun voi lisätä rivejä painamalla taulun alla olevaa Lisää rivi -nappia \n\n";
            txt += "- Taulun rivejä voi poistaa painamalla taulun alla olevaa Poista rivi -nappia \n\n";
          
            alert(txt);
          
          })

          // Show filter
          $(document).on("click", "#new_table th", function(event) {

            var column = $(this).closest("th").text();
                column = column.replace(" Ok", "");

            var $target = $(event.target);

            if ( !$(this).find("input").length ) {
              $(this).append("<input type = 'text' class = 'filter_text' name = '" + column + "' placeholder = 'Suodata...'> ");
              $(this).append("<button class = 'filter_button'>Ok</button>");
            } else if ( !$target.is(".filter_text") ) {
              $(this).empty();
              $(this).html("<div>" + column + "</div>");
            }

          })

          // Filter
          $(document).on("click", ".filter_button", function() {

            var column = $(this).closest("th").text();
                column = column.replace(" Ok", "");

            var filter = $("input[name=" + column + "").val();
                filter = filter.trim().replace(/\s+/g, " ");

            var sql = $("#sql").text();

            if ( ( sql.match(/WHERE/g) || [] ).length == 0 ) {
              sql += " WHERE [" + column + "] ";
            } else {
              sql += " AND [" + column + "] ";
            }

            if ( filter.startsWith("<") || filter.startsWith(">") )
              sql += filter;
            else if ( filter == "" )
              sql += "IS NULL";
            else if ( filter == "NOTNULL" )
              sql += "IS NOT NULL";
            else if ( filter.startsWith("NOT ") ) {
              filter = filter.replace("NOT ", "");
              sql += "NOT LIKE '%<temp>" + filter + "%'";
            } else
              sql += "LIKE '%<temp>" + filter + "%'";

            $("#sql").text(sql.replace("<temp>", ""))

            sql = sql.replace(/\s/g, "<space>");

            $("#table").remove();

            $("#new_table").load("generate_filtered_table.php?sql=" + sql, function () {




            });

          });

          // Sort table
          $(document).on("contextmenu", "#table th", function() {

            var table = $(this).parents("table").eq(0);
            var rows = table.find("tr:gt(0)").toArray().sort(comparer($(this).index()));
            this.asc = !this.asc;
            if ( !this.asc ) { rows = rows.reverse(); }
            for ( var i = 0; i < rows.length; i++ ) { table.append(rows[i]); }

            return false;

          });

          function comparer(index) {

            return function(a, b) {
                var valA = getCellValue(a, index);
                var valB = getCellValue(b, index);
                return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
            }

          }

          function getCellValue(row, index) { return $(row).children("td").eq(index).text(); }

          // Click table cell
          $(document).on("click", "td", function (event) {

            var $td = $(this);

            var p       = $td.index();
            var p_id    = $("th:contains(" + id_col + ")").index();
            var p_tuote = $("th:contains(tuoteID)").index();
            var p_osio  = $("th:contains(osioID)").index();

            if ( table == "asiakkaat_tuotteet" && ( p == p_tuote || p == p_osio ) )
              return true;

            $(":button").not(".filter_button, #addRow, #deleteRow").css("visibility", "hidden");

            if ( p == p_id )
              $td.removeAttr("contenteditable");
            else
              $td.find(":button").css("visibility", "visible").css('float', 'right');

          });

          // Mark cell with right mouse click
          $(document).on("contextmenu", "#table td", function() {

            var $td = $(this);

            $("#get_marks").load("get_marks.php?table=" + table, function() {

              var marks = $(this).text();

              marks = marks == "" ? "[]" : marks;
              marks = JSON.parse(marks);

              var n = $td.closest("tr").index();
              var p = $td.closest("td").index();
              
              var p_id = $("th:contains(" + id_col + ")").index();
              
              var column = $("#table").find("tr:eq(0)").find("th:eq(" + p + ")").text();
              var id     = $("#table").find("tr:eq(" + n + ")").find("td:eq(" + p_id + ")").text().trim();

              if ( $td.hasClass("marked") ) {

                marks.push([column, id]);

                $td.addClass("marked").css("background-color", "brown");

                $("#save_marks").load("save_marks.php?table=" + table + "&value=" + JSON.stringify(marks));

              } else {

                for ( var i = 0; i < marks.length; i++ ) {

                  if ( marks[i][0] == column && marks[i][1] == id )
                    marks.splice(i, 1);

                }

                $td.removeClass("marked").css("background-color", "white");

                $("#save_marks").load("save_marks.php?table=" + table + "&value=" + JSON.stringify(marks));

              }

            });

            return false;

          });

          // Selection from dropdown list
          $("#table td").hover( function() {

            if ( table != "asiakkaat_tuotteet" )
              return true;

            var $td = $(this);

            var p       = $td.index();
            var p_tuote = $("th:contains(tuoteID)").index();
            var p_osio  = $("th:contains(osioID)").index();

            if ( p != p_tuote || p != p_osio )
              return true;

            $(":button").not(".filter_button, #addRow, #deleteRow").css("visibility", "hidden");
            $td.find("input").css("opacity", "0");

            if ( p == p_tuote )
              var element = "<div class='dropdown'> <button class='dropbtn'>Valitse</button> <div class='dropdown-content'> <a data-value = '1'>HaiPro</a> <a data-value = '2'>WPro</a> <a data-value = '3'>SPro</a> <a data-value = '4'>APro</a> <a data-value = '5'>QPro</a> <a data-value = '6'>PotRa</a> <a data-value = '7'>PosiPro</a> <a data-value = '8'>RaPro</a> <a data-value = '30'>eLOKI</a> <a data-value = '101'>LOVe</a> <a data-value = '102'>SÄVe</a> <a data-value = '103'>Tietosuojapassi</a><a data-value = ''>Tyhjennä</a> </div> </div>";
            else if ( p == p_osio )
              var element = "<div class='dropdown'> <button class='dropbtn'>Valitse</button> <div class='dropdown-content'> <a data-value = '1'>Potilas-/asiakasturvallisuusosio</a> <a data-value = '2'>Työturvallisuusosio</a> <a data-value = '3'>Tietoturva-/tietosuojaosio</a> <a data-value = '4'>Toimintaympäristöosio</a> <a data-value = '5'>PosiPro</a> <a data-value = '6'>Riskienhallinta</a> <a data-value = '7'>Potilaan/asiakkaan vaaratapahtumailmoitus</a> <a data-value = '8'>Potilaan/omaisen tietosuoja-/tietoturvailmoitus</a> <a data-value = '9'>Vakavien käsittely</a> <a data-value = '10'>Moni-ilmoittaminen</a> <a data-value = '11'>Mobiili-ilmoittaminen</a> <a data-value = '12'>VPN</a> <a data-value = '13'>Fyysisen rajaamisen ilmoitus</a><a data-value = ''>Tyhjennä</a> </div> </div>";

            if ( !$td.find(".dropdown").length )
              $td.append(element);
            else
              $td.find(".dropdown").remove();

            var value = $td.html().split("<")[0].trim();
            $td.find("a[data-value=" + value + "]").css("background-color", "green");
            $td.find("a[data-value='']").css("background-color", "red");

          })

          // Save dropdown list selection
          $(document).on("click", "a", function() {

            var $this = $(this);

            var value = $this.data("value");
            var $td   = $this.closest("td");
            var html  = $td.html();

            if ( html.split("<")[0].trim() == "" )
              $td.prepend(value)
            else {
              html = html.replace(/^.+(?=input)/, value + "<");
              $td.html(html);
            }

            var $button = $td.find("input");
            $button.click();

          });

          // Save
          $(document).on("click", ".save", function() {

            var $button = $(this);

            var n = $button.closest("tr").index();
            var p = $button.closest("td").index();

            var p_id = $("th:contains(" + id_col + ")").index();

            var column = $("#table").find("tr:eq(0)").find("th:eq(" + p + ")").text();
            var value  = $("#table").find("tr:eq(" + n + ")").find("td:eq(" + p + ")").text();
            var id     = $("#table").find("tr:eq(" + n + ")").find("td:eq(" + p_id + ")").text();

            table  = table.trim().replace(/\s+/g, "<space>");
            column = column.trim().replace(/\s+/g, "<space>").replace(/<space>Ok$/, "");
            value  = value.trim().replace(/\s+/g, "<space>").replace(/Valitse.+/, "");
            id     = id.trim().replace(/\s+/g, "<space>");

            value  =  value.replace(/<script/g, "");

            $("#update_table").load("update_table.php?table=" + table + "&column=" + column + "&value=" + value + "&id_col=" + id_col + "&id=" + id, function () {

                var error = $(this).text() != "";

                var color = error ? "red" : "#05e310";

                $button.closest("td").css("background-color", color);

                $(this).css("color", color);

            });

          });

          // Click outside table
          $(document).click(function (event) {

            var $target = $(event.target);

            if ( !$target.closest("table").length ) {

              $(":button").not(".filter_button, #addRow, #deleteRow").css("visibility", "hidden");

              $("th").each( function () {
                var column = $(this).text().replace(" Ok", "");
                $(this).empty();
                $(this).html("<div>" + column + "</div>");
              });
            }

          });

          // Add row
          $("#addRow").click( function() {

            if ( table == "asiakkaat_tarjoukset" || table == "asiakkaat_koulutukset" || table == "asiakkaat_laskut" || table == "asiakkaat_tuotteet" || table == "asiakkaat_lisatiedot" )
              id_col = "asiakasID";
            else if ( table == "asiakkaat_tuotteet_hinnat" )
              id_col = "ATUID";
            else if ( table == "tuotteet_lomakkeet" )
              id_col = "tuoteID";

            var txt   = "Anna uuden rivin sarakkeen " + id_col + " arvo:";
            var value = prompt(txt).trim();

            $("#insert_row").load("insert_row.php?table=" + table + "&id_col=" + id_col + "&value=" + value, function () {

                var error = $(this).text() != "";

                if ( error )
                  $(this).css("color", "red");
                else
                  location.reload();

            });

          });

          // Delete row
          $("#deleteRow").click( function () {

            if ( table == "asiakkaat_sopimukset" )
              id_col = "ASID";
            else if ( table == "asiakkaat_tarjoukset" )
              id_col = "ATID";
            else if ( table == "asiakkaat_koulutukset" )
              id_col = "AKID";
            else if ( table == "asiakkaat_laskut" )
              id_col = "ALID";
            else if ( table == "asiakkaat_tuotteet" )
              id_col = "ATUID";
            else if ( table == "asiakkaat_tuotteet_hinnat" )
              id_col = "ATHID";
            else if ( table == "asiakkaat_lisatiedot" )
              id_col = "ALID";
            else if ( table == "tuotteet_lomakkeet" )
              id_col = "OID";

            var txt = "Anna poistettavan rivin sarakkeen " + id_col + " arvo:";
            var value = prompt(txt).trim();

            $("#delete_row").load("delete_row.php?table=" + table + "&id_col=" + id_col + "&value=" + value, function () {

                var error = $(this).text() != "";

                if ( error )
                  $(this).css("color", "red");
                else
                  location.reload();

            });

          });

        });
      
    });

  });
  
  // Sort table
  $(document).on("contextmenu", "#table th", function() {

    var table = $(this).parents("table").eq(0);
    var rows = table.find("tr:gt(0)").toArray().sort(comparer($(this).index()));
    this.asc = !this.asc;
    if ( !this.asc ) { rows = rows.reverse(); }
    for ( var i = 0; i < rows.length; i++ ) { table.append(rows[i]); }

    return false;

  });

  function comparer(index) {

    return function(a, b) {
        var valA = getCellValue(a, index);
        var valB = getCellValue(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
    }

  }

  function getCellValue(row, index) { return $(row).children("td").eq(index).text(); }

  // Click table cell
  $(document).on("click", "td", function (event) {

    var $td = $(this);

    var p       = $td.index();
    var p_id    = $("th:contains(" + id_col + ")").index();
    var p_tuote = $("th:contains(tuoteID)").index();
    var p_osio  = $("th:contains(osioID)").index();

    if ( table == "asiakkaat_tuotteet" && ( p == p_tuote || p == p_osio ) )
      return true;

    $(":button").not(".filter_button, #addRow, #deleteRow").css("visibility", "hidden");

    if ( p == p_id )
      $td.removeAttr("contenteditable");
    else
      $td.find(":button").css("visibility", "visible").css('float', 'right');

  });

  // Mark cell with right mouse click
  $(document).on("contextmenu", "#table td", function() {

    var $td = $(this);

    $("#get_marks").load("get_marks.php?table=" + table, function() {

      var marks = $(this).text();

      marks = marks == "" ? "[]" : marks;
      marks = JSON.parse(marks);

      var n = $td.closest("tr").index();
      var p = $td.closest("td").index();
      
      var p_id = $("th:contains(" + id_col + ")").index();
      
      var column = $("#table").find("tr:eq(0)").find("th:eq(" + p + ")").text();
      var id     = $("#table").find("tr:eq(" + n + ")").find("td:eq(" + p_id + ")").text().trim();

      if ( !$td.hasClass("marked") ) {

        marks.push([column, id]);

        $td.addClass("marked").css("background-color", "brown");

        $("#save_marks").load("save_marks.php?table=" + table + "&value=" + JSON.stringify(marks));

      } else {

        for ( var i = 0; i < marks.length; i++ ) {

          if ( marks[i][0] == column && marks[i][1] == id )
            marks.splice(i, 1);

        }

        $td.removeClass("marked").css("background-color", "white");

        $("#save_marks").load("save_marks.php?table=" + table + "&value=" + JSON.stringify(marks));

      }

    });

    return false;

  });

  // Selection from dropdown list
  $("#table td").hover( function() {

    if ( table != "asiakkaat_tuotteet" )
      return true;

    var $td = $(this);

    var p       = $td.index();
    var p_tuote = $("th:contains(tuoteID)").index();
    var p_osio  = $("th:contains(osioID)").index();

    if ( p != p_tuote || p != p_osio )
      return true;

    $(":button").not(".filter_button, #addRow, #deleteRow").css("visibility", "hidden");
    $td.find("input").css("opacity", "0");

    if ( p == p_tuote )
      var element = "<div class='dropdown'> <button class='dropbtn'>Valitse</button> <div class='dropdown-content'> <a data-value = '1'>HaiPro</a> <a data-value = '2'>WPro</a> <a data-value = '3'>SPro</a> <a data-value = '4'>APro</a> <a data-value = '5'>QPro</a> <a data-value = '6'>PotRa</a> <a data-value = '7'>PosiPro</a> <a data-value = '8'>RaPro</a> <a data-value = '30'>eLOKI</a> <a data-value = '101'>LOVe</a> <a data-value = '102'>SÄVe</a> <a data-value = '103'>Tietosuojapassi</a><a data-value = ''>Tyhjennä</a> </div> </div>";
    else if ( p == p_osio )
      var element = "<div class='dropdown'> <button class='dropbtn'>Valitse</button> <div class='dropdown-content'> <a data-value = '1'>Potilas-/asiakasturvallisuusosio</a> <a data-value = '2'>Työturvallisuusosio</a> <a data-value = '3'>Tietoturva-/tietosuojaosio</a> <a data-value = '4'>Toimintaympäristöosio</a> <a data-value = '5'>PosiPro</a> <a data-value = '6'>Riskienhallinta</a> <a data-value = '7'>Potilaan/asiakkaan vaaratapahtumailmoitus</a> <a data-value = '8'>Potilaan/omaisen tietosuoja-/tietoturvailmoitus</a> <a data-value = '9'>Vakavien käsittely</a> <a data-value = '10'>Moni-ilmoittaminen</a> <a data-value = '11'>Mobiili-ilmoittaminen</a> <a data-value = '12'>VPN</a> <a data-value = '13'>Fyysisen rajaamisen ilmoitus</a><a data-value = ''>Tyhjennä</a> </div> </div>";

    if ( !$td.find(".dropdown").length )
      $td.append(element);
    else
      $td.find(".dropdown").remove();

    var value = $td.html().split("<")[0].trim();
    $td.find("a[data-value=" + value + "]").css("background-color", "green");
    $td.find("a[data-value='']").css("background-color", "red");

  })

  // Save dropdown list selection
  $(document).on("click", "a", function() {

    var $this = $(this);

    var value = $this.data("value");
    var $td   = $this.closest("td");
    var html  = $td.html();
    
    if ( html.split("<")[0].trim() == "" )
      $td.prepend(value)
    else {
      html = html.replace(/^.+(?=input)/, value + "<");
      $td.html(html);
    }

    var $button = $td.find("input");
    $button.click();

  });

  // Save
  $(document).on("click", ".save", function() {
  
    var $button = $(this);
  
    var n = $button.closest("tr").index();
    var p = $button.closest("td").index();
  
    var p_id = $("th:contains(" + id_col + ")").index();
    
    var column = $("#table").find("tr:eq(0)").find("th:eq(" + p + ")").text();
    var value  = $("#table").find("tr:eq(" + n + ")").find("td:eq(" + p + ")").text();
    var id     = $("#table").find("tr:eq(" + n + ")").find("td:eq(" + p_id + ")").text();
  
    table  = table.trim().replace(/\s+/g, "<space>");
    column = column.trim().replace(/\s+/g, "<space>").replace(/<space>Ok$/, "");
    value  = value.trim().replace(/\s+/g, "<space>").replace(/Valitse.+/, "");
    id     = id.trim().replace(/\s+/g, "<space>");

    value  =  value.replace(/<script/g, "");
  
    $("#update_table").load("update_table.php?table=" + table + "&column=" + column + "&value=" + value + "&id_col=" + id_col + "&id=" + id, function () {

        var error = $(this).text() != "";
    
        var color = error ? "red" : "#05e310";
        
        $button.closest("td").css("background-color", color);
        
        $(this).css("color", color);

    });
  
  });

  // Click outside table
  $(document).click(function (event) {

    var $target = $(event.target);

    if ( !$target.closest("table").length ) {

      $(":button").not(".filter_button, #addRow, #deleteRow").css("visibility", "hidden");

      $("th").each( function () {
        var column = $(this).text().replace(" Ok", "");
        $(this).empty();
        $(this).html("<div>" + column + "</div>");
      });
    }
    
  });

  // Add row
  $("#addRow").click( function() {

    if ( table == "asiakkaat_tarjoukset" || table == "asiakkaat_koulutukset" || table == "asiakkaat_laskut" || table == "asiakkaat_tuotteet" || table == "asiakkaat_lisatiedot" )
      id_col = "asiakasID";
    else if ( table == "asiakkaat_tuotteet_hinnat" )
      id_col = "ATUID";
    else if ( table == "tuotteet_lomakkeet" )
      id_col = "tuoteID";

    var txt   = "Anna uuden rivin sarakkeen " + id_col + " arvo:";
    var value = prompt(txt).trim();

    $("#insert_row").load("insert_row.php?table=" + table + "&id_col=" + id_col + "&value=" + value, function () {

        var error = $(this).text() != "";

        if ( error )
          $(this).css("color", "red");
        else
          location.reload();
  
    });

  });

  // Delete row
  $("#deleteRow").click( function () {

    if ( table == "asiakkaat_sopimukset" )
      id_col = "ASID";
    else if ( table == "asiakkaat_tarjoukset" )
      id_col = "ATID";
    else if ( table == "asiakkaat_koulutukset" )
      id_col = "AKID";
    else if ( table == "asiakkaat_laskut" )
      id_col = "ALID";
    else if ( table == "asiakkaat_tuotteet" )
      id_col = "ATUID";
    else if ( table == "asiakkaat_tuotteet_hinnat" )
      id_col = "ATHID";
    else if ( table == "asiakkaat_lisatiedot" )
      id_col = "ALID";
    else if ( table == "tuotteet_lomakkeet" )
      id_col = "OID";

    var txt = "Anna poistettavan rivin sarakkeen " + id_col + " arvo:";
    var value = prompt(txt).trim();

    $("#delete_row").load("delete_row.php?table=" + table + "&id_col=" + id_col + "&value=" + value, function () {

        var error = $(this).text() != "";

        if ( error )
          $(this).css("color", "red");
        else
          location.reload();

    });

  });

});