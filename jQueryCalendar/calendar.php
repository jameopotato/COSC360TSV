<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  <title>TSV Week Calendar</title>
  <link rel='stylesheet' type='text/css' href='libs/css/smoothness/jquery-ui-1.8.11.custom.css' />
  <link rel='stylesheet' type='text/css' href='jquery.weekcalendar.css' />
  <link rel='stylesheet' type="text/css" href="calendar.css" />
  <script src="libs/jquery-1.4.4.min.js"></script>
  <script src="libs/jquery-ui-1.8.11.custom.min.js"></script>
  <script type="text/javascript" src="libs/date.js"></script>
  <script type='text/javascript' src='jquery.weekcalendar.js'></script>
  <script type='text/javascript' src="calendar.js"></script>
  <script type="text/javascript">
  $( document ).ready(function(e) {
    	loadSchedule("<?php echo addslashes($_POST["toVisualize"]); ?>");
	});  
  </script>
</head>
<body>
  <h1>Week Calendar Demo</h1>
  <p class="description">
    This calendar demonstrates a basic calendar. Events triggered are
    displayed in the message area. Appointments in the past are shaded grey.
  </p>
  	<div id='T1calendar'></div>
	<div id='T2calendar'></div>
</body>
</html>
