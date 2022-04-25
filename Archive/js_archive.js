// Files column
$("td").each( function() {

  if ( $("th:contains(tiedostot)").index() == $(this).index() ) {

    $(this).empty();

    $(this).append('<form name = "upload" action = "" method = "post" enctype = "multipart/form-data"> <input type = "file" name = "file" value = "Valitse tiedosto"> <br><br> <input type = "submit" name = "lataa" value = "Lataa"> </form>');
    $(this).find("form").css("display", "none");

    var n_id = $(this).closest("tr").index();
    var p_id = $("th:contains(" + id_col + ")").index();
    var id   = $("table").find("tr:eq(" + n_id + ")").find("td:eq(" + p_id + ")").text().trim();

    var folder = table.toLowerCase().replace(/W+/g, "_") + "_" + id;

    $(this).append($('<p>').load('list_files.php?folder=' + folder));

  }

})

// Files column
var target = $(event.target);
if ( $("th:contains(tiedostot)").index() == $(this).index() ) {
  if ( !target.is("span") ) {
    $("form").not("form[name=table_selection]").css("display", "none");
    $(this).find("form").css("display", "inline");
  }
} else {
  $("form").not("form[name=table_selection]").css("display", "none");
}

// Upload
$(document).on('submit', 'form[name=upload]', function() {

  var file = $(this).find("input[type=file]").val().split('\\').pop().replace(/\s+/g, "_");

  var n_id = $(this).closest("tr").index();
  var p_id = $("th:contains(" + id_col + ")").index();
  var id = $("table").find("tr:eq(" + n_id + ")").find("td:eq(" + p_id + ")").text().trim();

  var folder = table.toLowerCase().replace(/W+/g, "_") + "_" + id;

  $(this).load("upload.php?folder=" + folder + "&file=" + file);

})

// Download file
$(document).on("click", "a", function() {
  window.location = $(this).attr("href");
})

// Delete file
$(document).on("click", ".delete", function() {

  var n = $(this).closest("tr").index();
  var p = $("th:contains(" + id_col + ")").index();
  var id = $("table").find("tr:eq(" + n + ")").find("td:eq(" + p + ")").text().trim();
  var folder = table.toLowerCase().replace(/W+/g, "_") + "_" + id;

  var file = $(this).prev("a").attr("href").split("/").pop().replace(/\s+/g, "_");

  $(this).load("delete.php?folder=" + folder + "&file=" + file);

  $(this).prev("a").remove();
  $(this).remove();

})

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

  $(":button").not("#addRow, #deleteRow").css("visibility", "hidden");
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

});

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