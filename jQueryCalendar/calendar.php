<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  <title>TSV Week Calendar</title>

  <link rel='stylesheet' type='text/css' href='libs/css/smoothness/jquery-ui-1.8.11.custom.css' />
  <link rel='stylesheet' type='text/css' href='jquery.weekcalendar.css' />
  <style type='text/css'>
  body {
    font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
    margin: 0;
  }

  h1 {
    margin: 0 0 1em;
    padding: 0.5em;
  }

  p.description {
    font-size: 0.8em;
    padding: 1em;
    position: absolute;
    top: 3.2em;
    margin-right: 400px;
  }

  #message {
    font-size: 0.7em;
    position: absolute;
    top: 1em;
    right: 1em;
    width: 350px;
    display: none;
    padding: 1em;
    background: #ffc;
    border: 1px solid #dda;
  }
  </style>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script type="text/javascript" src="libs/date.js"></script>
  <script type='text/javascript' src='jquery.weekcalendar.js'></script>
  <script type='text/javascript'>

	function getDateFromDay(day) {
		switch(day) {
			default:
			case "Sun":
			return 0;
			break;
			case "Mon":
			return 1;
			break;
			case "Tue":
			return 2;
			break;
			case "Wed":
			return 3;
			break;
			case "Thu":
			return 4;
			break;
			case "Fri":
			return 5;
			break;
			case "Sat":
			return 6;
			break;
		}
	}
  var startDate = new Date(2013, 9, 1);
  var year = new Date().getFullYear();
  var month = new Date().getMonth();
  var sdate = new Date().getDate();
  
  var T1events = [];
  var T2events = [];

  $(document).ready(function() {

		var professorsArr = JSON.parse("<?php echo addslashes($_POST['toVisualize']); ?>");	
		var i = 1;
		var year = new Date().getFullYear();
  		var month = new Date().getMonth();
		$.each(professorsArr, function(professor)
		{
			$.each(professor.courses, function(course)
			{
				$.each(courses.Days.split(' '), function(day)
				{
					var newDay = sdate + getDateFromDay(day);
					var startArr = course.Start.split(":");
					var endArr = course.End.split(":");
					var newEvent = {
							'id': i,
							'title': course.Section,
							'start': new Date(year, month, newDay, startArr[0], startArr[1]),
							'end': new Date(year, month, newDay, endArr[0], endArr[1])
							};
					if(courses.Term==2)
						T2events.push(newEvent);
					else T1events.push(newEvent);
					i++;
				});
			});
		}; 
		
  $('#T1calendar').weekCalendar({
      timeslotsPerHour: 4,
      timeslotHeigh: 20,
      hourLine: true,
      data: T1events,
      height: function($calendar) {
        return $(window).height() - $('h1').outerHeight(true);
      },
      eventRender : function(calEvent, $event) {
        if (calEvent.end.getTime() < new Date().getTime()) {
          $event.css('backgroundColor', '#aaa');
          $event.find('.time').css({'backgroundColor': '#999', 'border':'1px solid #888'});
        }
      },
      eventClick: function(calEvent, $event) {
        displayMessage('<strong>Clicked Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
      },
      eventMouseover: function(calEvent, $event) {
        displayMessage('<strong>Mouseover Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
      },
      eventMouseout: function(calEvent, $event) {
        displayMessage('<strong>Mouseout Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
      },
      noEvents: function() {
        displayMessage('There are no events for this week');
      }
    });
  
  $('#T2calendar').weekCalendar({
      timeslotsPerHour: 4,
      timeslotHeigh: 20,
      hourLine: true,
      data: T2events,
      height: function($calendar) {
        return $(window).height() - $('h1').outerHeight(true);
      },
      eventRender : function(calEvent, $event) {
        if (calEvent.end.getTime() < new Date().getTime()) {
          $event.css('backgroundColor', '#aaa');
          $event.find('.time').css({'backgroundColor': '#999', 'border':'1px solid #888'});
        }
      },
      eventClick: function(calEvent, $event) {
        displayMessage('<strong>Clicked Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
      },
      eventMouseover: function(calEvent, $event) {
        displayMessage('<strong>Mouseover Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
      },
      eventMouseout: function(calEvent, $event) {
        displayMessage('<strong>Mouseout Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
      },
      noEvents: function() {
        displayMessage('There are no events for this week');
      }
    });
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
