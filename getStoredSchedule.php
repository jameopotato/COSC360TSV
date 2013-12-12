<?php
	$ubcid = $_GET['ubcid'];
	require('adodb5/adodb.inc.php');
	require('connect.php');
	
	$DB=NewADOConnection('mysql');
	$DB->debug = true;
	$DB->Connect($server, $user, $pwd, $db);
	$dbresult = $DB->Execute("SELECT * FROM Courses WHERE ubcid = $ubcid");
	print_r($dbresult->GetArray());
	$DB->Close();
?>