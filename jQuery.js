$(document).ready( function() {

  // Instructions
  $("#instructions").click( function() {

    $("#modal_instructions")
      .empty()
      .append("<p style = 'text-align: center; font-weight: bold'>Ohje</p>")
      .append("<hr>")
      .append("<p>- Taulunvalinnassa saa sarakevalintanäkymän esiin painamlla taulun nimeä hiiren oikealla painikkeella")
      .append("<p>- Taulun sarakkeet voi järjestää aakkos-/numerojärjestykseen painamalla hiiren oikealla napilla sarakkeen nimeä")
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

    "asiakkaat"                 : "Asiakkaat",
    "asiakkaat_sopimukset"      : "Sopimukset",
    "asiakkaat_tarjoukset"      : "Tarjoukset",
    "asiakkaat_koulutukset"     : "Koulutukset",
    "asiakkaat_laskut"          : "Laskut",
    "asiakkaat_tuotteet"        : "Asiakkaat - Tuotteet",
    "asiakkaat_tuotteet_hinnat" : "Asiakkaat - Tuotteet - Hinnat",
    "asiakkaat_lisatiedot"      : "Lisätiedot",
    "tuotteet"                  : "Tuotteet",
    "tuotteet_lomakkeet"        : "Lomakkeet",

    "tj_kohteet"                : "Kaikki TJ-kohteet",
    "apro_kohteet"              : "APro-kohteet",
    "eki_kohteet"               : "EKI-kohteet",
    "haipro_asiakkaat"          : "HaiPro-kohteet",
    "posipro_kohteet"           : "POS-kohteet",
    "potra_kohteet"             : "PotRa-kohteet",
    "qpro_kohteet"              : "QPro-kohteet",
    "rapro_kohteet"             : "RaPro-kohteet",
    "samra_kohteet"             : "SamRa-kohteet",
    "spro_kohteet"              : "SPro-kohteet",
    "vakapro_kohteet"           : "VakaPro-kohteet",
    "vpn_kohteet"               : "VPN-kohteet",
    "wb_kohteet"                : "Whistleblowing-kohteet",
    "wpro_kohteet"              : "WPro-kohteet",

    "haipro_pk_kohteet"         : "PK-kohteet",

    "tj_irtisanotut"            : "Irtisanotut",
    "tj_arkistokanta"           : "Arkistokanta",

    "haipro_kohde_laskut"       : "HaiPro-laskut",
    "wpro_kohde_laskut"         : "WPro-laskut",

    "LOVe_asiakkaat"            : "LOVe-asiakkaat",
    "LOVe_laskut"               : "LOVe-laskut",

    "SAVe_asiakkaat"            : "SÄVe-asiakkaat",
    "SAVe_laskut"               : "SÄVe-laskut",

    "eloki_asiakkaat"           : "eLOKI-asiakkaat"

  }

  // Positioning
  $("#instructions").css("color", "blue").css("position", "absolute").css("margin-left", "1160px");
  $("#logo").css("margin-left", "750px").css("margin-bottom", "-5px");
  $("#table_selection").css("margin-left", "525px");
  $("#header").css("margin-left", "640px").css("margin-bottom", "15px");
  $("#tables").css("margin-left", "500px");
  $("#tables label, #valitse_tiedot_txt, label:contains('Valitse kaikki'), #variables label").css("white-space", "nowrap");
  $("#tables_alataulut").css("margin-top", "100px");
  $("#valitse_tiedot").css("margin-top", "10px").css("margin-left", "765px");
  $("#valitse_tiedot_txt").css("margin-left", "10px");
  $("input[type=submit]").css("margin-top", "10px").css("margin-bottom", "20px").css("margin-left", "780px");

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

  // Disable new tables
  $("input[value^=asiakkaat]").prop("disabled", "true");

  // Select table
  $("#table_selection input").click( function() {

    table   = $(this).val();
    columns = "*";

    $("#table_name").text(tables[table]);
    $("#selected_table").text(table);

    // Generate table
    $("#table_element").load("generate_table.php?table=" + table + "&columns=" + columns, function() { afterTableGenerated(); });

  });

  // Column selection
  $(document).on("contextmenu", "#table_selection label", function() {

    table = $(this).find("input").val();
    
    $(this).find("input").prop("checked", true);

    $("#modal_column_selection")
      .empty()
      .append("<p><b>" + tables[table] + "</b></p>")
      .append("<p>Valitse tiedot</p>")
      .append("<hr>")
      .append("<br><label style = 'color: brown'><input type = 'checkbox' name = 'checkAll' value = 'Valitse kaikki'> Valitse kaikki</label>")
      .append("<br><br>")

    $("#columns").load("get_columns.php?table=" + table, function() {

      var columns = $(this).text();
          
      columns = columns.split(",");

      var column;

      for ( var i = 0; i < columns.length; i++ ) {

        column = columns[i];

        $("#modal_column_selection").append("<div><label><input type = 'checkbox' name = 'columns' value = '" + column + "'> " + column + "</label></div>");

      }

      $("#modal_column_selection")
        .append("<br>")
        .append("<input type = 'button' id = 'show_table' value = 'Näytä taulu'><br>");

      $("#modal_column_selection p").css("text-align", "center");
      $("#modal_column_selection label").has("input[type=checkbox]").css("margin-left", "130px");
      $("#modal_column_selection input[type=button]").css("margin-left", "175px");

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

      $("#modal_column_selection").on($.modal.AFTER_CLOSE, function() {
        $("#table th").css("position", "sticky");
      });

      $("#show_table").click( function() {

        $("#table_name").text(tables[table]);
        $("#selected_table").text(table);

        var columns = [];

        $("input[name='columns']:checked").each( function() {
          column = $(this).val();
          columns.push(column);
        });

        columns = columns.join(",");

        // Generate table
        $("#table_element").load("generate_table.php?table=" + table + "&columns=" + columns, function() { afterTableGenerated(); });

        // Close modal
        $.modal.close();

      })

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

    $("#id_col").text(id_col);

    // Column infos
    if ( table == "haipro_asiakkaat" )
      $("th:contains(pt_kayttajamaara) div").append(" ( <abbr title = 'todellinen käyttäjämäärä, ei ole vähennetty perusmaksuun sisältyviä' style = 'color: red'>?</abbr> )");
    if ( table == "wpro_kohteet" )
      $("th:contains(tt_kayttajamaara) div").append(" ( <abbr title = 'todellinen käyttäjämäärä, ei ole vähennetty perusmaksuun sisältyviä' style = 'color: red'>?</abbr> )");
    if ( table == "spro_kohteet" )
      $("th:contains(kayttajamaara) div").append(" ( <abbr title = 'todellinen käyttäjämäärä, ei ole vähennetty perusmaksuun sisältyviä' style = 'color: red'>?</abbr> )");

    // Read marks
    $("#get_marks").load("get_marks.php?table=" + table, function() {

      var marks = $(this).text();

      marks = marks.trim() == "" ? "[]" : marks;
      marks = JSON.parse(marks);

      for ( var i = 0; i < marks.length; i++ ) {

        id_val = marks[i][1];
        column = marks[i][0];

        var p_id = $("th:contains(" + id_col + ")").index();

        var n_id = $("#table tr").find("td:eq(" + p_id + ")").filter( function() { return $(this).text().trim() == id_val;  } ).closest("tr").index();
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
    $("head").append("<link href = 'style.css' rel = 'stylesheet' />");

    $("#addRow, #deleteRow").show();

  }

  // Highlight columns
  $(document).on({

    mouseenter: function() {

      var n = $(this).index();

      $("#table tr").each( function() {
        $(this).find("td:eq(" + n + ")").addClass("highlight");
      });

    },

    mouseleave: function() {

      var n = $(this).index();

      $("#table tr").each( function() {
        $(this).find("td:eq(" + n + ")").removeClass("highlight");
      });

    }

  }, "th");

  // Click column
  $(document).on("click", "th", function(event) {

    var column  = $(this).closest("th").text().replace(" Ok", "");
    var $target = $(event.target);

    if ( !$(this).find("input").length ) {
      $(this).append("<input type = 'text' class = 'filter_text' name = '" + column + "' placeholder = 'Suodata...' autocomplete = 'off'>");
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

    if ( table == "asiakkaat_tuotteet" && ( p == p_tuote || p == p_osio ) )
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

    var n = $button.closest("tr").index();
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

    $("#update_table").load("update_table.php?table=" + table + "&column=" + column + "&value=" + value + "&id_col=" + id_col + "&id=" + id, function () {

        var error = $(this).text() != "";

        var color = error ? "red" : "#05e310";

        $button.closest("td").css("background-color", color);

        $(this).css("color", color);

    });

  });

  // Mark cell with right mouse click
  $(document).on("contextmenu", "#table td", function() {

    var $td = $(this);

    var n = $td.closest("tr").index();
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

      $("#save_marks").load("save_marks.php?table=" + table + "&value=" + JSON.stringify(marks));

    } else {

      for ( var i = 0; i < marks.length; i++ ) {

        if ( marks[i][0] == column && marks[i][1] == id )
          marks.splice(i, 1);

      }

      $td.removeClass("marked");

      $("#get_marks").text( JSON.stringify(marks) );

      $("#save_marks").load("save_marks.php?table=" + table + "&value=" + JSON.stringify(marks));

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
          $("#table_element").load("generate_table.php?table=" + table + "&columns=" + columns, function() { afterTableGenerated(); });

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
          $("#table_element").load("generate_table.php?table=" + table + "&columns=" + columns, function() { afterTableGenerated(); });

    });

  });

  // Click outside table
  $(document).click( function (event) {

    var $target = $(event.target);

    if ( !$target.closest("#table").length ) {

      $(":button").not("#show_table, #addRow, #deleteRow").css("visibility", "hidden");
      $(".filter_text").each( function() { if ( $(this).val().trim() == "" ) { $(this).remove(); } });

    }

  });

});