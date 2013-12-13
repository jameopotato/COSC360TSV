<?php
	$ubcid = $_GET['ubcid'];
	
	require('connect.php');

	$dbresult = $DB->Execute("SELECT section, activity, term, days, start, end FROM Courses WHERE ubcid = $ubcid");
	$resultArray = $dbresult->GetArray();
	$outputJSON = array();
	foreach ($resultArray as $course)
	{
		$outputJSON[] = array("Section"=>$course['section'],"Activity"=>$course['activity'], "Term"=>$course['term'], "Days"=>$course['days'], "Start"=>$course['start'], "End"=>$course['end']);
	}
	echo json_encode($outputJSON);
	$DB->Close();
?>