<?php
$pname = $_GET["pname"];
$disc = $_GET["disc"];

//Build array of POST variables to send on HTTP request
$postVars = array(
				'instSearchName'=>urlencode($pname),
				'instSearchSubj'=>urlencode($disc),
				'submit'=>urlencode('Search for Instructors'),
				'pname'=>urlencode('instsearch'),
				'tname'=>urlencode('instsearch')
				);
$fields_string = '';
//Encodes variables according to regular post form data.
foreach($postVars as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
rtrim($fields_string, '&');

//Use curl to post data to page
$ch = curl_init('https://courses.students.ubc.ca/cs/main');
curl_setopt( $ch, CURLOPT_POST, 1);
curl_setopt( $ch, CURLOPT_POSTFIELDS, $fields_string);
curl_setopt( $ch, CURLOPT_HEADER, 0);
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);
$response = curl_exec($ch);
curl_close($ch);

//Load response into DOM Document Object
$respDOM = new DOMDocument();
$respDOM->loadHTML($response);

//Extract result table
$mainTable = $respDOM->getElementById("mainTable");

//Prepare results for output.
header('Content-Type: application/json');
$outputJSON = array();
if($mainTable) {
	//The ubcid is in the href attribute of the <a> tags
	$results = $mainTable->getElementsByTagName("a");
	for($i=0; $i<$results->length; $i++) {
		$href = $results->item($i)->getAttribute("href");
		//Preform a Regular Expression match on the href attribute to match "ubcid=(thisProfsID)"
		if(preg_match('/ubcid=\d+/', $href, $matches)) 	{
			$ubcidArr = explode('=', $matches[0]);
			$ubcid = $ubcidArr[1];
			$name = '';
			//Extract innerHTML of <a> tag, which will be the professors name.
			foreach($results->item($i)->childNodes as $node) {
				$name .= $respDOM->saveHTML($node);
			}
			$outputJSON[$name] = $ubcid;
		} else echo "regex failed";
	}
}
echo json_encode($outputJSON);
?>