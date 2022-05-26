<?php

include("config.php");

$table  = $_REQUEST["table"];
$column = $_REQUEST["column"];
$value  = $_REQUEST["value"];
$id_col = $_REQUEST["id_col"];
$id     = $_REQUEST["id"];

$table  = str_replace("<space>", " ", $table);
$column = str_replace("<space>", " ", $column);
$value  = str_replace("<space>", " ", $value);
$id_col = str_replace("<space>", " ", $id_col);
$id     = str_replace("<space>", " ", $id);

$db = in_array($table, $haipro_tables) ? "haipro" : "verkkokurssit";

$conn = new PDO("sqlsrv:Server=$server;Database=$db", $user_db, $pwd_db);

$conn -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

$column = preg_replace("/^/", "[", $column);
$column = preg_replace("/$/", "]", $column);

if ( $value == "" || strtolower($value) == "null" ) {
    $value = null;
}

$sql = "UPDATE $table SET $column = ? WHERE $id_col = ?";

try {

    $stmt = $conn -> prepare($sql);

    $stmt -> execute([$value, $id]);

} catch ( PDOException $e ) {

    echo "<b>Tallennus epäonnistui. Virheilmoitus:</b><br><br><i>" . $e -> getMessage() . "</i>";

}

$column = str_replace("[", "", $column);
$column = str_replace("]", "", $column);

// Data transfer between tables
$data_transfer = false;

if ( $table == "crm_haipro_kohteet" && ( $column == "pk" || $column == "vpn" || $column == "pos_kayttajamaara" || $column == "eki_kayttajamaara" ) )
    $data_transfer = true;
else if ( $table == "crm_wpro_kohteet" && ( $column == "pos_kayttajamaara" || $column == "eki_kayttajamaara" || $column == "kpi_kayttajamaara" ) )
    $data_transfer = true;

if ( $data_transfer ) {

    if ( $value != "" ) {

        if      ( $column == "pk"  )               $sql_exists = "SELECT COUNT(*) FROM crm_pk_kohteet      WHERE Kohde_ID = ?";
        else if ( $column == "vpn" )               $sql_exists = "SELECT COUNT(*) FROM crm_vpn_kohteet     WHERE Kohde_ID = ?";
        else if ( $column == "pos_kayttajamaara" ) $sql_exists = "SELECT COUNT(*) FROM crm_posipro_kohteet WHERE Kohde_ID = ?";
        else if ( $column == "eki_kayttajamaara" ) $sql_exists = "SELECT COUNT(*) FROM crm_eki_kohteet     WHERE Kohde_ID = ?";
        else if ( $column == "kpi_kayttajamaara" ) $sql_exists = "SELECT COUNT(*) FROM crm_kpi_kohteet     WHERE Kohde_ID = ?";

        $stmt = $conn -> prepare($sql_exists);
        $stmt -> execute([$id]);
        $count = $stmt -> fetch();
        $count = $count[0];

        if ( $count == "0" ) {

            if ( $table == "crm_haipro_kohteet" ) {

                $tuote_taulu = "HaiPro";

                if ( $column == "pk" )
                    $sql = "INSERT INTO crm_pk_kohteet ( Kohde_ID, kohde_nimi, tuote_taulu, kayttoonotto, mobiililinkki, tallentaja, Lisatiedot ) SELECT Kohde_ID, Kohde_nimi, '$tuote_taulu', NULL, mobiililinkki, Tallentaja, lisatiedot FROM crm_haipro_kohteet WHERE $id_col = ?";
                else if ( $column == "vpn" )
                    $sql = "INSERT INTO crm_vpn_kohteet ( Kohde_ID, kohde_nimi, tuote_taulu, kayttoonotto, mobiililinkki, tallentaja, Lisatiedot ) SELECT Kohde_ID, Kohde_nimi, '$tuote_taulu', NULL, mobiililinkki, Tallentaja, lisatiedot FROM crm_haipro_kohteet WHERE $id_col = ?";
                else if ( $column == "pos_kayttajamaara" )
                    $sql = "INSERT INTO crm_posipro_kohteet ( Kohde_ID, Kohde_nimi, Tuote_taulu, Kayttoonotto, mobiililinkki, tallentaja, Lisatiedot ) SELECT Kohde_ID, Kohde_nimi, '$tuote_taulu', NULL, mobiililinkki, Tallentaja, lisatiedot FROM crm_haipro_kohteet WHERE $id_col = ?";
                else if ( $column == "eki_kayttajamaara" )
                    $sql = "INSERT INTO crm_eki_kohteet ( Kohde_ID, Kohde_nimi, Tuote_taulu, Kayttoonotto, mobiililinkki, tallentaja, Lisatiedot ) SELECT Kohde_ID, Kohde_nimi, '$tuote_taulu', NULL, mobiililinkki, Tallentaja, lisatiedot FROM crm_haipro_kohteet WHERE $id_col = ?";

            } else if ( $table == "crm_wpro_kohteet" ) {

                $tuote_taulu = "WPro";

                if ( $column == "pos_kayttajamaara" )
                    $sql = "INSERT INTO crm_posipro_kohteet ( Kohde_ID, Kohde_nimi, Tuote_taulu, Kayttoonotto, mobiililinkki, tallentaja, Lisatiedot ) SELECT Kohde_ID, Kohde_nimi, '$tuote_taulu', NULL, mobiililinkki, Tallentaja, lisatiedot FROM crm_wpro_kohteet WHERE $id_col = ?";
                else if ( $column == "eki_kayttajamaara" )
                    $sql = "INSERT INTO crm_eki_kohteet ( Kohde_ID, Kohde_nimi, Tuote_taulu, Kayttoonotto, mobiililinkki, tallentaja, Lisatiedot ) SELECT Kohde_ID, Kohde_nimi, '$tuote_taulu', NULL, mobiililinkki, Tallentaja, lisatiedot FROM crm_wpro_kohteet WHERE $id_col = ?";
                else if ( $column == "kpi_kayttajamaara" )
                    $sql = "INSERT INTO crm_kpi_kohteet ( Kohde_ID, Kohde_nimi, Tuote_taulu, Kayttoonotto, mobiililinkki, tallentaja, Lisatiedot ) SELECT Kohde_ID, Kohde_nimi, '$tuote_taulu', NULL, mobiililinkki, Tallentaja, lisatiedot FROM crm_wpro_kohteet WHERE $id_col = ?";

            }
            
            try {

                $stmt = $conn -> prepare($sql);
            
                $stmt -> execute([$id]);

            } catch ( PDOException $e ) {

                if      ( $column == "pk" )                $taulu = "PK-kohteet";
                else if ( $column == "vpn" )               $taulu = "VPN-kohteet";
                else if ( $column == "pos_kayttajamaara" ) $taulu = "PosiPro-kohteet";
                else if ( $column == "eki_kayttajamaara" ) $taulu = "EKI-kohteet";
                else if ( $column == "kpi_kayttajamaara" ) $taulu = "KPI-kohteet";

                echo "<b>Tietojen lisäys tauluun $taulu epäonnistui. Virheilmoitus:</b><br><i>" . $e -> getMessage() . "</i>";
            
            }

        }

    }

    else {

        if      ( $column == "pk"  )               $sql = "DELETE FROM crm_pk_kohteet      WHERE Kohde_ID = ?";
        else if ( $column == "vpn" )               $sql = "DELETE FROM crm_vpn_kohteet     WHERE Kohde_ID = ?";
        else if ( $column == "pos_kayttajamaara" ) $sql = "DELETE FROM crm_posipro_kohteet WHERE Kohde_ID = ?";
        else if ( $column == "eki_kayttajamaara" ) $sql = "DELETE FROM crm_eki_kohteet     WHERE Kohde_ID = ?";
        else if ( $column == "kpi_kayttajamaara" ) $sql = "DELETE FROM crm_kpi_kohteet     WHERE Kohde_ID = ?";
        
        try {

            $stmt = $conn -> prepare($sql);
        
            $stmt -> execute([$id]);

        } catch ( PDOException $e ) {

            if      ( $column == "pk" )                $taulu = "PK-kohteet";
            else if ( $column == "vpn" )               $taulu = "VPN-kohteet";
            else if ( $column == "pos_kayttajamaara" ) $taulu = "PosiPro-kohteet";
            else if ( $column == "eki_kayttajamaara" ) $taulu = "EKI-kohteet";
            else if ( $column == "kpi_kayttajamaara" ) $taulu = "KPI-kohteet";

            echo "<b>Tietojen poisto taulusta $taulu epäonnistui. Virheilmoitus:</b><br><i>" . $e -> getMessage() . "</i>";

        }

    }

} 

?>