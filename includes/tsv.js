// JavaScript Document
function searchInstructors(caller) {
	 var pname = document.getElementById("pname").value;
	 var disc = document.getElementById("disc").value;
	 var $results = $("#results");
	 if(pname || disc) {
		var button = disableButton(caller, "Searching...");
		setResultInfo("Searching...");
		var jsonData = getUBCIDs(pname, disc);
		setResultInfo("Your search returned "+jsonData.length+" result(s)!");
		if(document.getElementById("resultTable")==null)	{
			$results.append(buildResultTable(jsonData)).append(buildVisualizeButton());
		} 
		else { 
			addResultTableData(jsonData, document.getElementById("resultTableBody"));
		}
		enableButton(button);
	 } else setResultInfo("You must enter a name or discipline to search!");
}

function setResultInfo(info) {
	document.getElementById("resultInfo").innerHTML = info;	
}

function clearNonCheckedRows(tableBody) {
	$(tableBody).find("td:first-child input:checkbox:not(:checked)").parents("tr").remove();
}

function addResultTableData(data, resultTableBody) {
		clearNonCheckedRows(resultTableBody);
		$.each(data, function(key, element) {
			if($(resultTableBody).find("input[value='"+element.ubcid+"']").length==0) {
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
				viewBox.setAttribute("onclick", "restrictSelection(this)");
				viewSchedule.appendChild(viewBox);
				var update = newRow.insertCell(4);
				var forceUpdate = document.createElement("input");
				forceUpdate.setAttribute("type", "checkbox");
				forceUpdate.setAttribute("value", element.ubcid);
				update.appendChild(forceUpdate);
			}
	});
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
	resultTableBody.setAttribute("id", "resultTableBody");
	resultTable.appendChild(resultTableBody);
	
	addResultTableData(data, resultTableBody);

	return resultTable;
}

function buildVisualizeButton() {
	var visualizeButton = document.createElement("input");
	visualizeButton.setAttribute("type", "button");
	visualizeButton.setAttribute("onclick", "viewSchedule(this)");
	visualizeButton.setAttribute("value", "Visualize");
	return visualizeButton;	
}

function getUBCIDs(pname, disc) {
	var json = null;
	$.ajax("/31317092/project/phpDataAccessors/getUBCID.php", {
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

function viewSchedule(caller) {
	var button = disableButton(caller, "Please Wait...");
	document.getElementById("toVisualize").value = getJSONSchedule();
	document.getElementById("calendarPost").submit();
}

function getJSONSchedule() {
	var professors = [];
	$("#resultTable tbody td:first-child input[type='checkbox']:checked").each(function(index, element) {
		var forceUpdate = ($(element).parents("tr").children("td:last-child input:checkbox:checked").length) ? 1 : 0;
		var professor = { ubcid : element.value, name : $(element).parent("td").next().html(), courses : getProfSchedule(element.value, forceUpdate) };
		professors.push(professor);
	});
	return JSON.stringify(professors);
}

function getProfSchedule(ubcid, forceUpdate) {
	var json = null;
	$.ajax({
		'async': false,
		'global': false,
		'url': "/31317092/project/phpDataAccessors/getSchedule.php",
		'data': {ubcid:ubcid, forceFresh : forceUpdate},
		'dataType': "json",
		'success': function (data) {
			json = data;
		}
	});
	return json;
}

function restrictSelection(checkbox) {
	var numSelected = $("#resultTable tbody td:first-child input:checkbox:checked").length;
	if(numSelected > 5) {
		checkbox.checked = false;
		alert("You can only select up to a maximum of 5 professors!");
	}
}