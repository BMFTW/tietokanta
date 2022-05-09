$(document).ready( function() {

  // Jumbotron
  $(".jumbotron")
    .hover( function() { $("#table_selection").slideDown(); } )
    .children()
    .css("margin-right", "50px");

  // Instructions
  $("#instructions").click( function() {

    $("#modal_instructions")
      .empty()
      .append("<p style = 'text-align: center; font-weight: bold'>Ohje</p>")
      .append("<hr>")
      .append("<p>- Tauluvalinnassa saa sarakevalintanäkymän esiin painamlla taulun nimeä hiiren oikealla painikkeella")
      .append("<p>- Taulun sarakkeet voi järjestää aakkos-/ numerojärjestykseen painamalla hiiren oikealla napilla sarakkeen nimeä")
      .append("<p>- Taulun rivejä voi suodattaa klikkamalla sarakkeen nimen solua ja kirjoittamalla avautuvaan teksikenttään suodatuskriteerin, esimerkiksi 'helsinki', '< 10', 'onarvo' (suodattaa pois tyhjät arvot), 'NOT keuruu' (rivit, joissa sarakkeen arvo ei sisällä kirjainyhdistelmää keuruu), 'tyhjä' (rivit, joissa kyseisen sarakkeen arvo on tyhjä) tai 'huom' (rivit, joissa sarakkeen arvossa on huomioväri). Kaikki suodatukset voi poistaa kerralla painamalla ESC")
      .append("<p>- Sarakkeiden leveyttä voi muuttaa klikkaamalla sarakesolun oikeaa alakulmaa ja rahaamalla hiirtä nappi pohjassa")
      .append("<p>- Taulun solua klikkaamalla tekstiä voi muokata ja tallenusnappia painamalla tallentaa tiedot tietokantaan. Jos tallennus onnistui, niin solun taustaväri muuttuu vihreäksi ja punaiseksi, jos tallennus epäonnistui")
      .append("<p>- Taulun soluihin voi jättää huomiovärin klikkaamalla solua hiiren oikealla napilla")
      .append("<p>- Tauluun voi lisätä rivejä painamalla taulun alla olevaa Lisää rivi -nappia")
      .append("<p>- Taulun rivejä voi poistaa painamalla taulun alla olevaa Poista rivi -nappia");

    $("#table th").css("position", "static");
    $("#modal_instructions p:gt(0)").css("text-align", "justify");

    $("#modal_instructions").modal({
      showClose: false
    });

    $("#modal_column_selection").on($.modal.AFTER_CLOSE, function() {
      $("#table th").css("position", "sticky");
    });


  });

  // Tables
  var tables = {

    "crm_asiakkaat"                 : "Asiakkaat",
    "crm_asiakkaat_sopimukset"      : "Sopimukset",
    "crm_asiakkaat_tarjoukset"      : "Tarjoukset",
    "crm_asiakkaat_koulutukset"     : "Koulutukset",
    "crm_asiakkaat_laskut"          : "Laskut",
    "crm_asiakkaat_tuotteet"        : "Asiakkaat - Tuotteet",
    "crm_asiakkaat_tuotteet_hinnat" : "Asiakkaat - Tuotteet - Hinnat",
    "crm_asiakkaat_lisatiedot"      : "Lisätiedot",
    "crm_tuotteet"                  : "Tuotteet",
    "crm_tuotteet_lomakkeet"        : "Lomakkeet",

    "crm_tj_kohteet"                : "Kaikki TJ-kohteet",
    "crm_apro_kohteet"              : "APro-kohteet",
    "crm_eki_kohteet"               : "EKI-kohteet",
    "crm_kpi_kohteet"               : "KPI-kohteet",
    "crm_haipro_kohteet"            : "HaiPro-kohteet",
    "crm_posipro_kohteet"           : "POS-kohteet",
    "crm_potra_kohteet"             : "PotRa-kohteet",
    "crm_qpro_kohteet"              : "QPro-kohteet",
    "crm_rapro_kohteet"             : "RaPro-kohteet",
    "crm_samra_kohteet"             : "SamRa-kohteet",
    "crm_spro_kohteet"              : "SPro-kohteet",
    "crm_vakapro_kohteet"           : "VakaPro-kohteet",
    "crm_vpn_kohteet"               : "VPN-kohteet",
    "crm_wb_kohteet"                : "Whistleblowing-kohteet",
    "crm_wpro_kohteet"              : "WPro-kohteet",

    "crm_pk_kohteet"                : "PK-kohteet",

    "crm_tj_irtisanotut"            : "Irtisanotut",
    "crm_tj_arkistokanta"           : "Arkistokanta",

    "crm_haipro_kohde_laskut"       : "HaiPro-laskut",
    "crm_wpro_kohde_laskut"         : "WPro-laskut",

    "crm_LOVe_asiakkaat"            : "LOVe-asiakkaat",
    "crm_LOVe_laskut"               : "LOVe-laskut",

    "crm_SAVe_asiakkaat"            : "SÄVe-asiakkaat",
    "crm_SAVe_laskut"               : "SÄVe-laskut",

    "crm_eloki_asiakkaat"           : "eLOKI-asiakkaat"

  }

  // Disable new tables
  $("input[value^=crm_asiakkaat]").prop("disabled", "true");

  // Color table names
  $("label").has("input[value$=kohteet]").css("color", "blue");
  $("label").has("input[value=crm_haipro_kohteet]").css("color", "blue");
  $("label").has("input[value^=crm_tj]").css("color", "grey");
  $("label").has("input[value=crm_tj_kohteet]").css("color", "red");
  $("label").has("input[value$=_kohde_laskut]").css("color", "brown");
  $("label").has("input[value^=crm_LOVe]").css("color", "YellowGreen");
  $("label").has("input[value^=crm_SAVe]").css("color", "CadetBlue");
  $("label").has("input[value=crm_eloki_asiakkaat]").css("color", "Tomato");
  $("label").has("input[value^=crm_asiakkaat]").css("color", "LightGrey");
  $("label").has("input[value^=crm_tuotteet]").css("color", "green");

  // Select table
  $("#table_selection input").click( function() {

    var table   = $(this).val();
    var columns = "*";

    $("#table_name").text(tables[table]);
    $("#selected_table").text(table);

    // Generate table
    $("#table_element").load("generate_table.php?table=" + table + "&columns=" + columns + "&uniqueID=" + new Date().getTime(), function() { afterTableGenerated(); });

  });

  // Column selection
  $(document).on("contextmenu", "#table_selection label", function() {

    var table = $(this).find("input").val();
    
    $(this).find("input").prop("checked", true);

    $("#modal_column_selection")
      .empty()
      .append("<p style = 'margin-top: 10px'><b>" + tables[table] + "</b></p>")
      .append("<p>Valitse tiedot</p>")
      .append("<hr>")
      .append("<div style = 'margin-top: 30px'></div>")
      .append("<label style = 'color: brown;'><input type = 'checkbox' name = 'checkAll' value = 'Valitse kaikki'> Valitse kaikki</label>")
      .append("<br><br>");

    $("#columns").load("get_columns.php?table=" + table + "&uniqueID=" + new Date().getTime(), function() {

      var columns = $(this).text();
          
      columns = columns.split(",");

      var column;

      for ( var i = 0; i < columns.length; i++ ) {

        column = columns[i];

        $("#modal_column_selection").append("<label><input type = 'checkbox' name = 'columns' value = '" + column + "'> " + column + "</label><br>");

      }

      $("#modal_column_selection")
        .append("<br>")
        .append("<hr>")
        .append("<br>")

      $("#modal_column_selection p").css("text-align", "center");
      $("#modal_column_selection label").has("input[type=checkbox]").css("margin-bottom", "-15px").css("margin-left", "130px");

      // Always checked
      var uudet  = ["asiakasID", "ASID", "ATID", "AKID", "ALID", "ATUID", "ATHID", "tuoteID", "OID"];
      var vanhat = ["ID", "Kohde_ID", "KohdeID", "KL_ID", "lasku_nro", "Asiakas_ID", "LID"];
      var always_checked = uudet.concat(vanhat);
      var $always_checked = $(asInputs(always_checked));
      $always_checked.prop("checked", true);

      $always_checked.click( function() {
        if ( !$(this).is(':checked') ) {
          $(this).prop("checked", true);
        }
      });

      // (pakollinen)
      $always_checked.closest("label").append("<span style = 'color: grey;'> (pakollinen)</span>");

      // Check by default
      var check_by_default  = ["Kohde_nimi", "KohdeNimi", "kohde_ID", "Asiakas_nimi", "asiakas_ID"];
      var $check_by_default = $(asInputs(check_by_default));
      $check_by_default.prop("checked", true);

      // As inputs
      function asInputs(values) {
        var output = [];
        for ( var i = 0; i < values.length; i++ )
          output.push("input[value='" + values[i] + "']");
        output = output.join(",");
        return output;
      }

      // Open modal
      $("#modal_column_selection").modal({
        showClose: false
      });

      // Prevent column names from popping up
      $("#table th").css("position", "static");

      // Modal closing
      $("#modal_column_selection").unbind().on( $.modal.AFTER_CLOSE, function() {

          $("#table_name").text(tables[table]);
          $("#selected_table").text(table);

          $("#table_element").empty();

          var columns = [];

          $("input[name=columns]:checked").each( function() {
            column = $(this).val();
            columns.push(column);
          });

          columns = columns.join(",");

          // Generate table
          $("#table_element").load("generate_table.php?table=" + table + "&columns=" + columns + "&uniqueID=" + new Date().getTime(), function() { afterTableGenerated(); });

      });

    });

    return false;

  });

  // Check all checkboxes
  $(document).on("click", "input[name=checkAll]", function() {

    var checked = $(this).is(":checked");

    $("input[type=checkbox]").each( function() {

      if ( $(this).is(":checked") != checked ) {
        $(this).click();
      }

    });

  });

  // Table generated
  function afterTableGenerated() {

    var table = $("#selected_table").text();

    // Hide table selection
    $("#table_selection").slideUp();

    // ID column
    var id_col;

    if ( table == "crm_asiakkaat" || table == "crm_asiakkaat_sopimukset" || table == "crm_asiakkaat_tarjoukset" || table == "crm_asiakkaat_koulutukset" || table == "crm_asiakkaat_laskut" || table == "crm_asiakkaat_tuotteet" || table == "crm_asiakkaat_lisatiedot" )
      id_col = "asiakasID";
    else if ( table == "crm_asiakkaat_tuotteet_hinnat" )
      id_col = "ATUID";
    else if ( table == "crm_tuotteet" )
      id_col = "tuoteID";
    else if ( table == "crm_tuotteet_lomakkeet" )
      id_col = "OID";
    else if ( table == "crm_tj_kohteet" || table == "crm_apro_kohteet" || table == "crm_eki_kohteet" || table == "crm_kpi_kohteet" || table == "crm_haipro_kohteet" || table == "crm_posipro_kohteet" || table == "crm_spro_kohteet" || table == "crm_vakapro_kohteet" || table == "crm_vpn_kohteet" || table == "crm_wb_kohteet" || table == "crm_wpro_kohteet" || table == "crm_potra_kohteet" || table == "crm_rapro_kohteet" || table == "crm_samra_kohteet" || table == "crm_tj_irtisanotut" || table == "crm_tj_arkistokanta" || table == "crm_pk_kohteet" )
      id_col = "Kohde_ID";
    else if ( table == "crm_qpro_kohteet" )
      id_col = "KohdeID";
    else if ( table == "crm_haipro_kohde_laskut" || table == "crm_wpro_kohde_laskut" || table == "crm_LOVe_laskut" || table == "crm_SAVe_laskut" )
      id_col = "lasku_nro";
    else if ( table == "crm_LOVe_asiakkaat" || table == "crm_SAVe_asiakkaat" || table == "crm_eloki_asiakkaat" )
      id_col = "Asiakas_ID";

    $("#id_col").text(id_col);

    // Column infos
    if ( table == "crm_haipro_kohteet" )
      $("th:contains(pt_kayttajamaara) div").append(" ( <abbr title = 'todellinen käyttäjämäärä, ei ole vähennetty perusmaksuun sisältyviä' style = 'color: red'>?</abbr> )");
    if ( table == "crm_wpro_kohteet" )
      $("th:contains(tt_kayttajamaara) div").append(" ( <abbr title = 'todellinen käyttäjämäärä, ei ole vähennetty perusmaksuun sisältyviä' style = 'color: red'>?</abbr> )");
    if ( table == "crm_spro_kohteet" )
      $("th:contains(kayttajamaara) div").append(" ( <abbr title = 'todellinen käyttäjämäärä, ei ole vähennetty perusmaksuun sisältyviä' style = 'color: red'>?</abbr> )");

    // Read marks
    $("#get_marks").load("get_marks.php?table=" + table + "&uniqueID=" + new Date().getTime(), function() {

      var marks = $(this).text();

      marks = marks.trim() == "" ? "[]" : marks;
      marks = JSON.parse(marks);

      for ( var i = 0; i < marks.length; i++ ) {

        id_val = marks[i][1];
        column = marks[i][0];

        var p_id = $("th:contains(" + id_col + ")").index();

        var n_id = $("#table tr").find("td:eq(" + p_id + ")").filter( function() { return $(this).text().trim() == id_val;  } ).closest("tr").index();
            n_id = n_id != "-1" ? n_id + 1 : n_id;

        var p = $("th:contains(" + column + ")").index();

        if ( n_id != "-1" && p != "-1" )
          $("#table").find("tr:eq(" + n_id + ")").find("td:eq(" + p + ")").addClass("marked");

      }

    });

    // Filter rows
    var $table_rows = $("#table tr:gt(0)");
    var num_cols    = $("#table th").length;

    $(document).on("keyup", ".filter_text", function(e) {

      var code  = ( e.keyCode || e.which );
      var codes = [ 9, 16, 17, 18, 37, 38, 39, 40, 144 ];
      if ( codes.includes(code) )
        return;

      var filter = "1".repeat(num_cols);

      $table_rows.data("filter", filter);

      $(".filter_text").each( function() {

        var col_num   = $(this).closest("th").index();
        var criterion = $(this).val().toLowerCase().trim();
        var $tr, $td, value;

        if ( criterion != "" )
          $(this).closest("th").css("background-color", "blue");
        else
          $(this).closest("th").css("background-color", "#4CAF50");

        $table_rows.each( function() {

          $tr    = $(this);
          $td    = $tr.find("td:eq(" + col_num + ")");
          value  = $td.text().toLowerCase().trim();
          filter = $tr.data("filter");

          if      ( value.includes(criterion) )                                                                   { filter = replaceCharAt( filter, col_num, 1 ); $tr.data("filter", filter); }
          else if ( criterion == "tyhjä"     && value == "" )                                                     { filter = replaceCharAt( filter, col_num, 1 ); $tr.data("filter", filter); }
          else if ( criterion == "onarvo"    && value != "" )                                                     { filter = replaceCharAt( filter, col_num, 1 ); $tr.data("filter", filter); }
          else if ( criterion == "huom"      && $td.hasClass("marked") )                                          { filter = replaceCharAt( filter, col_num, 1 ); $tr.data("filter", filter); }
          else if ( /^not /.test(criterion)  && !value.includes( criterion.replace("not ", "") ) )                { filter = replaceCharAt( filter, col_num, 1 ); $tr.data("filter", filter); }
          else if ( criterion.includes("<")  && parseFloat(value) <  parseFloat( criterion.replace(/\D/g, "") ) ) { filter = replaceCharAt( filter, col_num, 1 ); $tr.data("filter", filter); }
          else if ( criterion.includes("<=") && parseFloat(value) <= parseFloat( criterion.replace(/\D/g, "") ) ) { filter = replaceCharAt( filter, col_num, 1 ); $tr.data("filter", filter); }
          else if ( criterion.includes(">")  && parseFloat(value) >  parseFloat( criterion.replace(/\D/g, "") ) ) { filter = replaceCharAt( filter, col_num, 1 ); $tr.data("filter", filter); }
          else if ( criterion.includes(">=") && parseFloat(value) >= parseFloat( criterion.replace(/\D/g, "") ) ) { filter = replaceCharAt( filter, col_num, 1 ); $tr.data("filter", filter); }
          else                                                                                                    { filter = replaceCharAt( filter, col_num, 0 ); $tr.data("filter", filter); }

          if ( $tr.data("filter").split("").every( e => e == "1" ) )
            $tr.show();
          else
            $tr.hide();

        });

      });

    });

    function replaceCharAt( str, i, replacement ) {

      var output;

      output    = str.split("");
      output[i] = replacement;
      output    = output.join("");

      return output;

    }

    // Press ESC to remove filters
    $(document).keyup( function(e) {

      if ( e.key === "Escape" ) {

        $(".filter_text").each( function() {
          $(this).val("").keyup().remove();
        });

      }

    });

    // Reapply CSS
    $("head").append("<link href = 'style.css" + new Date().getTime() + "' rel = 'stylesheet' />");

    $("#table th").css("position", "sticky");

    $("#addRow, #deleteRow").show();

  }

  // Hide table selection when hovering over table
  $(document).on({

    mouseenter: function() {

      $("#table_selection").slideUp();

    }

  }, "#table");

  // Click column
  $(document).on("click", "th", function(event) {

    var column  = $(this).closest("th").text();
    var $target = $(event.target);

    if ( !$(this).find("input").length ) {
      $(this).append("<input type = 'text' class = 'form-control filter_text' name = '" + column + "' placeholder = 'Suodata...' autocomplete = 'off'>");
      $(this).find(".filter_text").focus();
    } else if ( !$target.is(".filter_text") && $(this).find(".filter_text").val().trim() == "" ) {
        $(this).empty();
        $(this).html("<div>" + column + "</div>");
    }

  })

  // Sort table
  $(document).on("contextmenu", "#table th", function() {

    var $table      = $("#table");
    var $table_rows = $("#table tr:gt(0)");
    var n           = $(this).index(); 

    var rows = $table_rows.toArray().sort(comparer(n));

    this.asc = !this.asc;

    if ( !this.asc ) { rows = rows.reverse(); }

    for ( var i = 0; i < rows.length; i++ ) { $table.append(rows[i]); }

    return false;

  });

  function comparer(index) {

    return function(a, b) {

        var valA = getCellValue(a, index);
        var valB = getCellValue(b, index);

        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);

    }

  }

  function getCellValue(row, index) { return $(row).find("td").eq(index).text(); }

  // Click table cell
  $(document).on("click", "td", function() {

    table  = $("#selected_table").text();
    id_col = $("#id_col").text();

    var $td = $(this);

    var p       = $td.index();
    var p_id    = $("th:contains(" + id_col + ")").index();
    var p_tuote = $("th:contains(tuoteID)").index();
    var p_osio  = $("th:contains(osioID)").index();

    if ( table == "crm_asiakkaat_tuotteet" && ( p == p_tuote || p == p_osio ) )
      return true;

    $(":button").not("#addRow, #deleteRow").css("visibility", "hidden");

    if ( p == p_id )
      $td.removeAttr("contenteditable");
    else
      $td.find(":button").css("visibility", "visible").css('float', 'right');

  });

  // Save
  $(document).on("click", ".save", function() {

    table  = $("#selected_table").text();
    id_col = $("#id_col").text();

    var $button = $(this);

    var n = $button.closest("tr").index() + 1;
    var p = $button.closest("td").index();

    var p_id = $("th:contains(" + id_col + ")").index();

    var column = $("#table").find("tr:eq(0)").find("th:eq(" + p + ")").text();
    var value  = $("#table").find("tr:eq(" + n + ")").find("td:eq(" + p + ")").text();
    var id     = $("#table").find("tr:eq(" + n + ")").find("td:eq(" + p_id + ")").text();

    table  = table.trim().replace(/\s+/g, "<space>");
    column = column.trim().replace("( ? )", "").replace(/\s+/g, "<space>").replace(/<space>Ok$/, "");
    value  = value.trim().replace(/\s+/g, "<space>").replace(/Valitse.+/, "");
    id     = id.trim().replace(/\s+/g, "<space>");

    value  =  value.replace(/<script/g, "");

    $("#update_table").load("update_table.php?table=" + table + "&column=" + column + "&value=" + value + "&id_col=" + id_col + "&id=" + id + "&uniqueID=" + new Date().getTime(), function () {

        var error = $(this).text() != "";

        var color = error ? "red" : "#05e310";

        $button.closest("td").css("background-color", color);

        $(this).css("color", color);

    });

  });

  // Mark cell with right mouse click
  $(document).on("contextmenu", "#table td", function() {

    var table = $("#selected_table").text();

    var $td = $(this);

    var n = $td.closest("tr").index() + 1;
    var p = $td.closest("td").index();

    id_col = $("#id_col").text();

    var p_id = $("th:contains(" + id_col + ")").index();

    var column = $("#table").find("tr:eq(0)").find("th:eq(" + p + ")").text().trim();
    var id     = $("#table").find("tr:eq(" + n + ")").find("td:eq(" + p_id + ")").text().trim();

    marks = $("#get_marks").text();
    marks = marks.trim() == "" ? "[]" : marks;
    marks = JSON.parse(marks);

    if ( !$td.hasClass("marked") ) {

      marks.push([column, id]);

      $td.addClass("marked");

      $("#get_marks").text( JSON.stringify(marks) );

      $("#save_marks").load("save_marks.php?table=" + table + "&value=" + JSON.stringify(marks) + "&uniqueID=" + new Date().getTime());

    } else {

      for ( var i = 0; i < marks.length; i++ ) {

        if ( marks[i][0] == column && marks[i][1] == id )
          marks.splice(i, 1);

      }

      $td.removeClass("marked");

      $("#get_marks").text( JSON.stringify(marks) );

      $("#save_marks").load("save_marks.php?table=" + table + "&value=" + JSON.stringify(marks) + "&uniqueID=" + new Date().getTime());

    }

    return false;

  });

  // Add row
  $("#addRow").click( function() {

    // Table
    table  = $("#selected_table").text();
    id_col = $("#id_col").text();

    // Columns
    var columns = [];
    var column;

    $("#table th div").each( function() {
      column = $(this).text();
      columns.push(column);
    });

    columns = columns.join(",").replace(" ( ? )", "");

    if ( table == "crm_asiakkaat_tarjoukset" || table == "crm_asiakkaat_koulutukset" || table == "crm_asiakkaat_laskut" || table == "crm_asiakkaat_tuotteet" || table == "crm_asiakkaat_lisatiedot" )
      id_col = "asiakasID";
    else if ( table == "crm_asiakkaat_tuotteet_hinnat" )
      id_col = "ATUID";
    else if ( table == "crm_tuotteet_lomakkeet" )
      id_col = "tuoteID";

    var txt   = "Anna uuden rivin sarakkeen " + id_col + " arvo:";
    var value = prompt(txt).trim();

    $("#insert_row").load("insert_row.php?table=" + table + "&id_col=" + id_col + "&value=" + value + "&uniqueID=" + new Date().getTime(), function () {

        var error = $(this).text() != "";

        if ( error )
          $(this).css("color", "red");
        else
          $("#table_element").load("generate_table.php?table=" + table + "&columns=" + columns + "&uniqueID=" + new Date().getTime(), function() { afterTableGenerated(); });

    });

  });

  // Delete row
  $("#deleteRow").click( function () {

    // Table
    table = $("#selected_table").text();
    id_col = $("#id_col").text();

    // Columns
    var columns = [];
    var column;

    $("#table th div").each( function() {
      column = $(this).text();
      columns.push(column);
    });

    columns = columns.join(",").replace(" ( ? )", "");

    if ( table == "crm_asiakkaat_sopimukset" )
      id_col = "ASID";
    else if ( table == "crm_asiakkaat_tarjoukset" )
      id_col = "ATID";
    else if ( table == "crm_asiakkaat_koulutukset" )
      id_col = "AKID";
    else if ( table == "crm_asiakkaat_laskut" )
      id_col = "ALID";
    else if ( table == "crm_asiakkaat_tuotteet" )
      id_col = "ATUID";
    else if ( table == "crm_asiakkaat_tuotteet_hinnat" )
      id_col = "ATHID";
    else if ( table == "crm_asiakkaat_lisatiedot" )
      id_col = "ALID";
    else if ( table == "crm_tuotteet_lomakkeet" )
      id_col = "OID";

    var txt = "Anna poistettavan rivin sarakkeen " + id_col + " arvo:";
    var value = prompt(txt).trim();

    $("#delete_row").load("delete_row.php?table=" + table + "&id_col=" + id_col + "&value=" + value + "&uniqueID=" + new Date().getTime(), function () {

        var error = $(this).text() != "";

        if ( error )
          $(this).css("color", "red");
        else
          $("#table_element").load("generate_table.php?table=" + table + "&columns=" + columns + "&uniqueID=" + new Date().getTime(), function() { afterTableGenerated(); });

    });

  });

  // Click outside table
  $(document).click( function (event) {

    var $target = $(event.target);

    if ( !$target.closest("#table").length ) {

      $(":button").not(".close, #show_table, #addRow, #deleteRow").css("visibility", "hidden");
      $(".filter_text").each( function() { if ( $(this).val().trim() == "" ) { $(this).remove(); } });

    }

  });

});