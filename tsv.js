// JavaScript Document
function searchInstructors() {
	 var pname = document.getElementById("pname").value;
	 var disc = document.getElementById("disc").value;
	 var searchButton = document.getElementById("search");
	 if(pname || disc) {
		searchButton.value = "Please wait...";
	 	searchButton.disabled=true;
		$("#results").html("Searching...");
		$.getJSON("getUBCID.php", {pname:pname, disc:disc}, function (data) {
		$("#results").empty();
		if(data.length==0) $("#results").html("Your search returned 0 results!");
		else {
		var resultTable = document.createElement("table");
		var tableHeader = resultTable.createTHead();
		var headerRow = tableHeader.insertRow(0);
		var showHead = headerRow.insertCell(0);
		var nameHead = headerRow.insertCell(1);
		var idHead = headerRow.insertCell(2);
		
		var forceHead = headerRow.insertCell(3);
		nameHead.innerHTML = "Name";
		idHead.innerHTML = "UBCID";
		showHead.innerHTML = "Show";
		forceHead.innerHTML = "Force Update";
		
		resultTable.setAttribute("id", "resultTable");
		resultTableBody = document.createElement("tbody");
		resultTable.appendChild(resultTableBody);
		var visualizeButton = document.createElement("input");
		visualizeButton.setAttribute("type", "button");
		visualizeButton.setAttribute("onclick", "viewSchedule()");
		visualizeButton.setAttribute("value", "Visualize");
		$.each(data, function(key, value) {
			var newRow = resultTableBody.insertRow(-1);
			var viewSchedule = newRow.insertCell(0);
			var profName = newRow.insertCell(1);
			profName.innerHTML = key;
			var ubcid = newRow.insertCell(2);
			ubcid.innerHTML = value;
			var viewBox = document.createElement("input");
			viewBox.setAttribute("type", "checkbox");
			viewBox.setAttribute("value", value);
			viewSchedule.appendChild(viewBox);
			var update = newRow.insertCell(3);
			var forceUpdate = document.createElement("input");
			forceUpdate.setAttribute("type", "checkbox");
			forceUpdate.setAttribute("value", value);
			update.appendChild(forceUpdate);
			$("#results").append($(resultTable));
			$("#results").append($(visualizeButton));
		});
		}
		searchButton.value = "Search";
		searchButton.disabled=false;
		});
	 } else $("#results").html("You must enter a name or discipline to search!");
}

function viewSchedule() {
	 var professors = [];
	$("#resultTable tbody td:first-child input[type='checkbox']:checked").each(function(index, element) {
		var courses = (function () {
			var json = null;
			$.ajax({
				'async': false,
				'global': false,
				'url': "getSchedule.php",
				'data': {ubcid:element.value},
				'dataType': "json",
				'success': function (data) {
					json = data;
				}
			});
			return json;
		})();
		var professor = { ubcid : element.value, courses : courses };
		professors.push(professor);
	});
	$.when.apply($, professors).then(function() {
		document.getElementById("toVisualize").value = JSON.stringify(professors);
		document.getElementById("calendarPost").submit(); 
	});    
}