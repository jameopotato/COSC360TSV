<?php
$ubcid = $_GET["ubcid"];
//Use curl to retrieve schedule from ubcid
$ch = curl_init('https://courses.students.ubc.ca/cs/main?pname=inst&ubcid='.$ubcid.'&campuscd=UBCO');
curl_setopt( $ch, CURLOPT_HEADER, 0);
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);
$response = curl_exec($ch);
curl_close($ch);

//Load response into DOM Document Object
$respDOM = new DOMDocument();
$respDOM->loadHTML($response);
$xpath = new DOMXPath($respDOM);

//Select the result table
$results = $xpath->query("//table[contains(@class, 'table table-striped section-summary')]/tr");

//Prepare results for output.
header('Content-Type: application/json');
$outputJSON = array();
foreach($results as $class) {
	$section = trim(preg_replace('/\s+/', ' ',$class->childNodes->item(2)->childNodes->item(1)->nodeValue));
	$activity = preg_replace('/\s+/', ' ',$class->childNodes->item(4)->nodeValue);
	$term = preg_replace('/\s+/', ' ',$class->childNodes->item(6)->nodeValue);
	$days = trim(preg_replace('/\s+/', ' ',$class->childNodes->item(10)->nodeValue));
	$start = preg_replace('/\s+/', ' ',$class->childNodes->item(12)->nodeValue);
	$end = preg_replace('/\s+/', ' ',$class->childNodes->item(14)->nodeValue);
	$outputJSON[] = array("Section"=>$section, "Activity"=>$activity, "Term"=>$term, "Days"=>$days, "Start"=>$start, "End"=>$end);			
}
//OUTPUT FORMAT: [ ubcid : {Class}, ... , ], ... , ]
//Class: {Section, Activity, Term, Days, Start, End}
echo json_encode($outputJSON);
?>