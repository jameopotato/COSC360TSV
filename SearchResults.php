<?php
$pname = $_GET["pname"];
$disc = $_GET["disc"];

//Use curl to post data to page
$ch = curl_init('https://courses.students.ubc.ca/cs/main');
$params = "pname=instsearch&tname=instsearch&instSearchName=".$pname."&instSearchSubj=".$disc;
curl_setopt( $ch, CURLOPT_POST, 1);
curl_setopt( $ch, CURLOPT_POSTFIELDS, $params);
curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt( $ch, CURLOPT_HEADER, 0);
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);

$response = curl_exec($ch);
curl_close($ch);
$respDOM = new DOMDocument();
$respDOM->loadHTML($response);
echo $respDOM->saveHTML();
/*
$mainTable = $respDOM->getElementById("mainTable");
echo $mainTable->saveHTML();
*/
?>