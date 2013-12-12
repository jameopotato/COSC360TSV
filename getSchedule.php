<?php
	$ubcid = $_GET['ubcid'];
	$forceFresh = $_GET['forceFresh'];
	
	/*	Check Local Database for Schedule if User is not forcing to get Fresh Data*/
	if(!$forceFresh)
	{
		$ch = curl_init("getStoredSchedule.php?ubcid=" . $ubcid);
		curl_setopt( $ch, CURLOPT_HEADER, FALSE);
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, TRUE);
		$jsonResponse = curl_exec($ch);
		$jsonResponse = json_decode($jsonResponse);
		curl_close($ch);
	}
	
	/*	If User is forcing Fresh Data or Nothing was found in the Local DB then retrieve fresh data and Update Local database*/
	if($forceFresh || count($jsonResponse)==0)
	{
		$ch = curl_init("getFreshSchedule.php?ubcid=" . $ubcid);
		curl_setopt( $ch, CURLOPT_HEADER, FALSE);
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, TRUE);
		$jsonResponse = curl_exec($ch);
		$jsonResponse = json_decode($jsonResponse);
		curl_close($ch);
		
		require('adodb5/adodb.inc.php');
		require('connect.php');
		
		$DB=NewADOConnection('mysql');
		if(!$DB){
			echo "Failed to connect to Database!";
			exit;	
		}
		$DB->Connect($server, $user, $pwd, $db);
		
		$DB->Execute("DELETE FROM Courses WHERE ubcid=$ubcid");
		
		$insertCourse = $DB->Prepare("INSERT INTO Courses VALUES ($ubcid,?,?,?,?,?,?)")
		foreach($jsonResponse AS $course)
		{
			$DB->Execute($insertCourse, $course) 
		}
	}
	
	echo json_encode($jsonResponse);
?>