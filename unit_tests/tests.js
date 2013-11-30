// Unit tests for tsv.js

test("Button Toggle", function() {
	var oldVal = "old", newVal = "new";
	var testButton = document.createElement("input");
	testButton.value = oldVal;
	var button = disableButton(testButton, newVal);
	equal(button.val, oldVal, "Stored previous value");
	equal(testButton.value, newVal, "Set new value");
	ok(testButton.disabled, "Button disabled");
	var oldButton = enableButton(button);
	equal(testButton.value, oldVal, "Restored previous value");
	ok(!testButton.disabled, "Button enabled");
	deepEqual(oldButton, testButton, "Returned button is identical to initial button");
});

test("getUBCIDs(pname, disc)", function() {
	var yvesObj = [{"ubcid":"784517", "name":"Lucet, Yves P", "disc":"COSC"}];
	var resp = getUBCIDs("yves", "cosc");
	deepEqual(resp, yvesObj, "getUBCIDs('yves', 'cosc')");
	var hareObj = [	{"disc":"MATH","name":"Hare, Donovan","ubcid": "818481"},
					{"disc":"COSC","name":"Hare, Warren","ubcid": "821074"}];
	deepEqual(getUBCIDs("hare", null), hareObj, "getUBCIDs('hare', null)");
});

test("buildVisualizeButton()", function() {
	var button = buildVisualizeButton();
	equal(button.value, "Visualize", "Value set");
	equal(button.type, "button", "Type button");
	ok(button.onclick, "Event set");
});

test("buildResultTable(data)", function() {
	var data = getUBCIDs(null, "cosc");
	var expectedRows = Object.keys(data).length + 1;	//+1 for header
	var returnedTable = buildResultTable(data);
	equal(returnedTable.rows.length, expectedRows, "# Table rows match # retrieved ubcids");
});

test("getJSONSchedule()", function() {
	equal(getJSONSchedule(), "[{\"ubcid\":\"784517\",\"courses\":[{\"Section\":\"COSC 222 001\",\"Activity\":\"Lecture\",\"Term\":\"1\",\"Days\":\"Tue Thu\",\"Start\":\"9:30\",\"End\":\"11:00\"},{\"Section\":\"COSC 222 L01\",\"Activity\":\"Laboratory\",\"Term\":\"1\",\"Days\":\"Thu\",\"Start\":\"14:30\",\"End\":\"16:30\"},{\"Section\":\"COSC 222 L02\",\"Activity\":\"Laboratory\",\"Term\":\"1\",\"Days\":\"Mon\",\"Start\":\"14:30\",\"End\":\"16:30\"},{\"Section\":\"COSC 360 001\",\"Activity\":\"Lecture\",\"Term\":\"1\",\"Days\":\"Tue Thu\",\"Start\":\"12:30\",\"End\":\"14:00\"},{\"Section\":\"COSC 360 L01\",\"Activity\":\"Laboratory\",\"Term\":\"1\",\"Days\":\"Thu\",\"Start\":\"16:30\",\"End\":\"18:30\"},{\"Section\":\"COSC 407 001\",\"Activity\":\"Lecture\",\"Term\":\"2\",\"Days\":\"Tue Thu\",\"Start\":\"12:30\",\"End\":\"14:00\"},{\"Section\":\"COSC 407 L01\",\"Activity\":\"Laboratory\",\"Term\":\"2\",\"Days\":\"Thu\",\"Start\":\"9:00\",\"End\":\"11:00\"},{\"Section\":\"COSC 407 L02\",\"Activity\":\"Laboratory\",\"Term\":\"2\",\"Days\":\"Wed\",\"Start\":\"12:30\",\"End\":\"14:30\"},{\"Section\":\"IGS 520Y 001\",\"Activity\":\"Lecture\",\"Term\":\"1\",\"Days\":\"Tue Thu\",\"Start\":\"12:30\",\"End\":\"14:00\"},{\"Section\":\"IGS 520Y L01\",\"Activity\":\"Laboratory\",\"Term\":\"1\",\"Days\":\"Thu\",\"Start\":\"16:30\",\"End\":\"18:30\"},{\"Section\":\"IGS 540J 001\",\"Activity\":\"Lecture\",\"Term\":\"2\",\"Days\":\"Tue Thu\",\"Start\":\"12:30\",\"End\":\"14:00\"},{\"Section\":\"IGS 540J L01\",\"Activity\":\"Laboratory\",\"Term\":\"2\",\"Days\":\"Thu\",\"Start\":\"9:00\",\"End\":\"11:00\"}]}]", "ubcid: 784517");
	document.getElementById("testID1").value = "818481";
	equal(getJSONSchedule(), "[{\"ubcid\":\"818481\",\"courses\":[{\"Section\":\"MATH 340 001\",\"Activity\":\"Lecture\",\"Term\":\"1\",\"Days\":\"Mon Wed Fri\",\"Start\":\"10:30\",\"End\":\"11:30\"},{\"Section\":\"MATH 340 WL1\",\"Activity\":\"Waiting List\",\"Term\":\"1\",\"Days\":\"Mon Wed Fri\",\"Start\":\"10:30\",\"End\":\"11:30\"},{\"Section\":\"MATH 443 001\",\"Activity\":\"Lecture\",\"Term\":\"1\",\"Days\":\"Mon Wed Fri\",\"Start\":\"8:30\",\"End\":\"9:30\"},{\"Section\":\"MATH 610D 001\",\"Activity\":\"Lecture\",\"Term\":\"1\",\"Days\":\"Mon Wed Fri\",\"Start\":\"8:30\",\"End\":\"9:30\"}]}]", "ubcid: 818481");
	var newId = document.getElementById("resultTable").insertRow(0);
	var newCell = newId.insertCell(0);
	newCell.innerHTML = "<input type=\"checkbox\" value=\"784517\" checked=\"checked\" />";
	equal(getJSONSchedule(), "[{\"ubcid\":\"784517\",\"courses\":[{\"Section\":\"COSC 222 001\",\"Activity\":\"Lecture\",\"Term\":\"1\",\"Days\":\"Tue Thu\",\"Start\":\"9:30\",\"End\":\"11:00\"},{\"Section\":\"COSC 222 L01\",\"Activity\":\"Laboratory\",\"Term\":\"1\",\"Days\":\"Thu\",\"Start\":\"14:30\",\"End\":\"16:30\"},{\"Section\":\"COSC 222 L02\",\"Activity\":\"Laboratory\",\"Term\":\"1\",\"Days\":\"Mon\",\"Start\":\"14:30\",\"End\":\"16:30\"},{\"Section\":\"COSC 360 001\",\"Activity\":\"Lecture\",\"Term\":\"1\",\"Days\":\"Tue Thu\",\"Start\":\"12:30\",\"End\":\"14:00\"},{\"Section\":\"COSC 360 L01\",\"Activity\":\"Laboratory\",\"Term\":\"1\",\"Days\":\"Thu\",\"Start\":\"16:30\",\"End\":\"18:30\"},{\"Section\":\"COSC 407 001\",\"Activity\":\"Lecture\",\"Term\":\"2\",\"Days\":\"Tue Thu\",\"Start\":\"12:30\",\"End\":\"14:00\"},{\"Section\":\"COSC 407 L01\",\"Activity\":\"Laboratory\",\"Term\":\"2\",\"Days\":\"Thu\",\"Start\":\"9:00\",\"End\":\"11:00\"},{\"Section\":\"COSC 407 L02\",\"Activity\":\"Laboratory\",\"Term\":\"2\",\"Days\":\"Wed\",\"Start\":\"12:30\",\"End\":\"14:30\"},{\"Section\":\"IGS 520Y 001\",\"Activity\":\"Lecture\",\"Term\":\"1\",\"Days\":\"Tue Thu\",\"Start\":\"12:30\",\"End\":\"14:00\"},{\"Section\":\"IGS 520Y L01\",\"Activity\":\"Laboratory\",\"Term\":\"1\",\"Days\":\"Thu\",\"Start\":\"16:30\",\"End\":\"18:30\"},{\"Section\":\"IGS 540J 001\",\"Activity\":\"Lecture\",\"Term\":\"2\",\"Days\":\"Tue Thu\",\"Start\":\"12:30\",\"End\":\"14:00\"},{\"Section\":\"IGS 540J L01\",\"Activity\":\"Laboratory\",\"Term\":\"2\",\"Days\":\"Thu\",\"Start\":\"9:00\",\"End\":\"11:00\"}]},{\"ubcid\":\"818481\",\"courses\":[{\"Section\":\"MATH 340 001\",\"Activity\":\"Lecture\",\"Term\":\"1\",\"Days\":\"Mon Wed Fri\",\"Start\":\"10:30\",\"End\":\"11:30\"},{\"Section\":\"MATH 340 WL1\",\"Activity\":\"Waiting List\",\"Term\":\"1\",\"Days\":\"Mon Wed Fri\",\"Start\":\"10:30\",\"End\":\"11:30\"},{\"Section\":\"MATH 443 001\",\"Activity\":\"Lecture\",\"Term\":\"1\",\"Days\":\"Mon Wed Fri\",\"Start\":\"8:30\",\"End\":\"9:30\"},{\"Section\":\"MATH 610D 001\",\"Activity\":\"Lecture\",\"Term\":\"1\",\"Days\":\"Mon Wed Fri\",\"Start\":\"8:30\",\"End\":\"9:30\"}]}]", "ubcid: 784517, 818481");
});