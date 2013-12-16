<?php
//Get search terms, Professor name and Discipline.
$pname = urlencode($_GET["pname"]);
$disc = urlencode($_GET["disc"]);

//URL to remote ASP.NET page to query SQL Server.
$remoteSQLServerURL = "http://w18.ok.ubc.ca/api/InstructorSubjects.aspx?pname=" . $pname . "&disc=" . $disc;

//Initiate curl connection to remote page
$ch = curl_init($remoteSQLServerURL);
curl_setopt( $ch, CURLOPT_HEADER, FALSE);
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, TRUE);
$response = curl_exec($ch);
curl_close($ch);

header('Content-Type: application/json; charset=utf-8');
echo $response;

?>