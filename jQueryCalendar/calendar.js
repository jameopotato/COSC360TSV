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

function loadSchedule(jsonData) {
	var startDate = new Date(2013, 8, 1);
	var year = startDate.getFullYear();
	var month = startDate.getMonth();
	var sdate = startDate.getDate();
	
	var T1events = [];
	var T2events = [];
	var professorsArr = JSON.parse(jsonData);
	$.each(professorsArr, function(profi, professor)
	{
		$.each(professor.courses, function(courseid, course)
		{
			$.each(course.Days.split(' '), function(dayid, day)
			{
				var newDay = sdate + getDateFromDay(day);
				var startArr = course.Start.split(":");
				var endArr = course.End.split(":");
				var newEvent = {
						'id': ""+profi+courseid+dayid,
						'title': course.Section,
						'start': new Date(year, month, newDay, startArr[0], startArr[1]),
						'end': new Date(year, month, newDay, endArr[0], endArr[1])
						};
				if(course.Term==2)
					T2events.push(newEvent);
				else if(course.Term==1)
					T1events.push(newEvent);
				else if(course.Term=="1-2")
				{	T1events.push(newEvent);
					T2events.push(newEvent);
				}
			});
		});
	}); 
	
	$('#T1calendar').weekCalendar({
	  date: startDate,
	  timeslotsPerHour: 2,
	  timeslotHeigh: 5,
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
	  },
	  eventMouseover: function(calEvent, $event) {
	  },
	  eventMouseout: function(calEvent, $event) {
	  },
	  noEvents: function() {
	  }
	});
	
	$('#T2calendar').weekCalendar({
	  date: startDate,
	  timeslotsPerHour: 2,
	  timeslotHeigh: 5,
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
	  },
	  eventMouseover: function(calEvent, $event) {
	  },
	  eventMouseout: function(calEvent, $event) {
	  },
	  noEvents: function() {
	  }
	});
}