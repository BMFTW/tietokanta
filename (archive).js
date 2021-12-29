// Files column
// $("td").each( function() {

//   if ( $("th:contains(tiedostot)").index() == $(this).index() ) {

//     $(this).empty();

//     $(this).append('<form name = "upload" action = "" method = "post" enctype = "multipart/form-data"> <input type = "file" name = "file" value = "Valitse tiedosto"> <br><br> <input type = "submit" name = "lataa" value = "Lataa"> </form>');
//     $(this).find("form").css("display", "none");

//     var n_id = $(this).closest("tr").index();
//     var p_id = $("th:contains(" + id_col + ")").index();
//     var id   = $("table").find("tr:eq(" + n_id + ")").find("td:eq(" + p_id + ")").text().trim();

//     var folder = table.toLowerCase().replace(/W+/g, "_") + "_" + id;

//     $(this).append($('<p>').load('list_files.php?folder=' + folder));

//   }

// })

// Files column
// var target = $(event.target);
// if ( $("th:contains(tiedostot)").index() == $(this).index() ) {
//   if ( !target.is("span") ) {
//     $("form").not("form[name=table_selection]").css("display", "none");
//     $(this).find("form").css("display", "inline");
//   }
// } else {
//   $("form").not("form[name=table_selection]").css("display", "none");
// }

// Upload
// $(document).on('submit', 'form[name=upload]', function() {

//   var file = $(this).find("input[type=file]").val().split('\\').pop().replace(/\s+/g, "_");

//   var n_id = $(this).closest("tr").index();
//   var p_id = $("th:contains(" + id_col + ")").index();
//   var id = $("table").find("tr:eq(" + n_id + ")").find("td:eq(" + p_id + ")").text().trim();

//   var folder = table.toLowerCase().replace(/W+/g, "_") + "_" + id;

//   $(this).load("upload.php?folder=" + folder + "&file=" + file);

// })

// Download file
// $(document).on("click", "a", function() {
//   window.location = $(this).attr("href");
// })

// Delete file
// $(document).on("click", ".delete", function() {

//   var n = $(this).closest("tr").index();
//   var p = $("th:contains(" + id_col + ")").index();
//   var id = $("table").find("tr:eq(" + n + ")").find("td:eq(" + p + ")").text().trim();
//   var folder = table.toLowerCase().replace(/W+/g, "_") + "_" + id;

//   var file = $(this).prev("a").attr("href").split("/").pop().replace(/\s+/g, "_");

//   $(this).load("delete.php?folder=" + folder + "&file=" + file);

//   $(this).prev("a").remove();
//   $(this).remove();

// })