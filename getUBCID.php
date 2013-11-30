<?php

//URL to remote ASP.NET page to query SQL Server.
$remoteSQLServerURL = "http://w18.ok.ubc.ca/api/InstructorSubjects.aspx?";

//Get search terms, Professor name and Discipline.
$pname = $_GET["pname"];
$disc = $_GET["disc"];

//Build GET parameters in request URL, according to parameters given.
if(!empty($pname)) 	{
	$pname = urlencode($_GET["pname"]);
	$remoteSQLServerURL .= "pname=" . $pname;
	if(!empty($disc))
		$remoteSQLServerURL .= "&";
}
if(!empty($disc)) {
	$disc = urlencode($_GET["disc"]);
	$remoteSQLServerURL .= "disc=" . $disc;
}

//Initiate curl connection to remote page
$ch = curl_init($remoteSQLServerURL);
curl_setopt( $ch, CURLOPT_HEADER, 0);
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);
$response = curl_exec($ch);
curl_close($ch);

header('Content-Type: application/json; charset=utf-8');
echo $response;

?>