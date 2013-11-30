// JavaScript Document
function searchInstructors() {
	 var pname = document.getElementById("pname").value;
	 var disc = document.getElementById("disc").value;
	 var $results = $("#results");
	 if(pname || disc) {
		var button = disableButton(document.getElementById("search"));
		$results.html("Searching...");
		var jsonData = getUBCIDs(pname, disc);
		if(jsonData.length==0) $results.html("Your search returned 0 results!");
		else {
			var resultTable = buildResultTable(jsonData);
			$results.html("");
			$results.append(resultTable).append(buildVisualizeButton());
		}
		enableButton(button);
	 } else $results.html("You must enter a name or discipline to search!");
}

function buildResultTable(data) {
	var resultTable = document.createElement("table");
	var tableHeader = resultTable.createTHead();
	var headerRow = tableHeader.insertRow(0);
	var showHead = headerRow.insertCell(0);
	var nameHead = headerRow.insertCell(1);
	var discHead = headerRow.insertCell(2);
	var idHead = headerRow.insertCell(3);
	
	var forceHead = headerRow.insertCell(4);
	nameHead.innerHTML = "Name";
	discHead.innerHTML = "Subject";
	idHead.innerHTML = "UBCID";
	showHead.innerHTML = "Show";
	forceHead.innerHTML = "Force Update";
	
	resultTable.setAttribute("id", "resultTable");
	var resultTableBody = document.createElement("tbody");
	resultTable.appendChild(resultTableBody);
	
	$.each(data, function(key, element) {
		var newRow = resultTableBody.insertRow(-1);
		var viewSchedule = newRow.insertCell(0);
		var profName = newRow.insertCell(1);
		profName.innerHTML = element.name;
		var profDisc = newRow.insertCell(2);
		profDisc.innerHTML = element.disc;
		var ubcid = newRow.insertCell(3);
		ubcid.innerHTML = element.ubcid;
		var viewBox = document.createElement("input");
		viewBox.setAttribute("type", "checkbox");
		viewBox.setAttribute("value", element.ubcid);
		viewSchedule.appendChild(viewBox);
		var update = newRow.insertCell(4);
		var forceUpdate = document.createElement("input");
		forceUpdate.setAttribute("type", "checkbox");
		forceUpdate.setAttribute("value", element.ubcid);
		update.appendChild(forceUpdate);
	});
	return resultTable;
}

function buildVisualizeButton() {
	var visualizeButton = document.createElement("input");
	visualizeButton.setAttribute("type", "button");
	visualizeButton.setAttribute("onclick", "viewSchedule()");
	visualizeButton.setAttribute("value", "Visualize");
	return visualizeButton;	
}

function getUBCIDs(pname, disc) {
	var json = null;
	$.ajax("/31317092/project/getUBCID.php", {
		async:false,
		global:false,
		data: {pname:pname, disc:disc},
		dataType:"json",
		success: function(data) {
			json = data;
		}});
	return json;
}

function disableButton(button, msg) {
	var clone = { val:button.value, button:button };
	if(msg) button.value = msg;
	button.disabled=true;
	return clone;
}

function enableButton(clone) {
	clone.button.value = clone.val;
	clone.button.disabled=false;
	return clone.button;
}

function viewSchedule() {
	document.getElementById("toVisualize").value = getJSONSchedule();
	document.getElementById("calendarPost").submit();
}

function getJSONSchedule() {
	var professors = [];
	$("#resultTable tbody td:first-child input[type='checkbox']:checked").each(function(index, element) {
		var professor = { ubcid : element.value, name : $(element).parent("td").next().html(), courses : getProfSchedule(element.value) };
		professors.push(professor);
	});
	return JSON.stringify(professors);
}

function getProfSchedule(ubcid) {
	var json = null;
	$.ajax({
		'async': false,
		'global': false,
		'url': "/31317092/project/getSchedule.php",
		'data': {ubcid:ubcid},
		'dataType': "json",
		'success': function (data) {
			json = data;
		}
	});
	return json;
}