<?php
	$ubcid = $_GET['ubcid'];
	$forceFresh = $_GET['forceFresh'];
	
	/*	Check Local Database for Schedule if User is not forcing to get Fresh Data*/
	if(!$forceFresh)
	{
		$jsonResponse = json_decode(file_get_contents('https://studentweb.ok.ubc.ca/31317092/project/getStoredSchedule.php?ubcid='.$ubcid), TRUE);
	}
	
	/*	If User is forcing Fresh Data or Nothing was found in the Local DB then retrieve fresh data and Update Local database*/
	if($forceFresh || count($jsonResponse)==0)
	{
		$filteredResponse = array();
		$freshResponse = json_decode(file_get_contents('https://studentweb.ok.ubc.ca/31317092/project/getFreshSchedule.php?ubcid='.$ubcid), TRUE);
		
		require('connect.php');

		if($forceFresh)
			$DB->Execute("DELETE FROM Courses WHERE ubcid=$ubcid");
		
		$insertCourse = $DB->Prepare("INSERT INTO Courses VALUES ($ubcid,?,?,?,?,?,?)");
		foreach($freshResponse as $course)
		{
			//Do not accept courses that don't have dates.
			if(!empty($course["Days"]))	{
				$DB->Execute($insertCourse, $course);
				$filteredResponse[] = $course;
			}
		}
		$jsonResponse = $filteredResponse;
		$DB->Close();
	}
	
	echo json_encode($jsonResponse);
?>