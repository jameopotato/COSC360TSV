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

function makeLegend(legend) {
	var $newTable = $("<table border = '1px solid #fff'><caption>Legend</caption><thead><tr><th>Name</th><th>Color</th></tr></thead><tbody></tbody></table>");
	
	$.each(legend, function(index, element) {
	var $newRow = $("<tr><td>" + element.name + "</td><td style='background-color:" + element.color +" '></td></tr>");
		$newTable.children("tbody").append($newRow);
	});
	
	$("#legend").append($newTable);
}

function loadSchedule(jsonData) {
	var startDate = new Date(2013, 8, 1);
	var year = startDate.getFullYear();
	var month = startDate.getMonth();
	var sdate = startDate.getDate();
	
	var colors = ['#676BC7', '#32BA62', '#D02B3B', '#F5A147', '#BF3D91'];
	var color_index = 0;
	
	var legend = [];
	
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
						'title': course.Section+"<br>"+professor.name,
						'start': new Date(year, month, newDay, startArr[0], startArr[1]),
						'end': new Date(year, month, newDay, endArr[0], endArr[1]),
						'color': colors[color_index]
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
		legend.push({
				'name' : professor.name,
				'color': colors[color_index]
				});
		color_index++;
	}); 
	
	$('#T1calendar').weekCalendar({
	  date: startDate,
	  title: "Term 1",
	  timeslotsPerHour: 2,
	  timeslotHeigh: 5,
	  hourLine: true,
	  data: T1events,
	  height: function($calendar) {
		return $(window).height() - $('h1').outerHeight(true);
	  },
	  eventRender : function(calEvent, $event) {
	  		$event.css('backgroundColor', calEvent.color);
	  },
	  eventClick: function(calEvent, $event) {
	  	$("#dialog").dialog(
	  		{
	  			width: 400,
	  			height: 250
	  		});
	  		$("#dialog").html("<h4>" + calEvent.title + "</h4> <p>Start: " +calEvent.start + "</p><p>End: " + calEvent.end + "</p>");
	  }
	});
	
	$('#T2calendar').weekCalendar({
	  date: startDate,
	  title: "Term 2", 
	  timeslotsPerHour: 2,
	  timeslotHeigh: 5,
	  hourLine: true,
	  data: T2events,
	  height: function($calendar) {
		return $(window).height() - $('h1').outerHeight(true);
	  },
	  eventRender : function(calEvent, $event) {
	  		$event.css('backgroundColor', calEvent.color);
	  },
	  eventClick: function(calEvent, $event) {
	  	$("#dialog").dialog(
	  		{
	  			width: 400,
	  			height: 250
	  		});
	  		$("#dialog").html("<h4>" + calEvent.title + "</h4> <p>Start: " +calEvent.start + "</p><p>End: " + calEvent.end + "</p>");
	  }
	});
	
	makeLegend(legend);
}