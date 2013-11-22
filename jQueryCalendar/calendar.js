// JavaScript Document for Calendar page
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
	}); 
	
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