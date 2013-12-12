<?php
	$ubcid = $_GET['ubcid'];
	require('adodb5/adodb.inc.php');
	require('connect.php');
	
	$DB=NewADOConnection('mysql');
	if(!$DB){
		echo "Failed to connect to Database!";
		exit;	
	}
	$DB->debug = true;
	$DB->Connect($server, $user, $pwd, $db);
	$dbresult = $DB->Execute("SELECT section, activity, term, days, start, end FROM Courses WHERE ubcid = $ubcid");
	$resultArray = $dbresult->GetArray();
	$outputJSON = array();
	foreach ($resultArray AS $course)
	{
		$outputJSON[] = array("Section"=>$course['section'],"Activity"=>$course['activity'], "Term"=>$course['term'], "Days"=>$course['days'], "Start"=>$course['start'], "End"=>$course['end'])
	}
	echo json_encode($outputJSON);
	$DB->Close();
?>