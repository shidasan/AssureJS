function checkCaseModel(root) {
	var ret = true;
	ret &= ("G1" == root.Label);

	var child = root.Children[0];
	ret &= ("S1" == child.Label);

	var grandchildren = child.Children;
	ret &= (grandchildren.length == 2);

	for(var i = 0; i < grandchildren.length; i++) {
		if(grandchildren[i].Label == "G2") {
			ret &= ("E1" == grandchildren[i].Children[0].Label);
		}
		else if(grandchildren[i].Label == "G3") {
			ret &= ("E2" == grandchildren[i].Children[0].Label);
		}
	}

	return ret;
}

test("CaseDecoderTest", function() {
	var JsonData = {
			"DCaseName" : "test",
			"NodeCount" : 6,
			"TopGoalLabel" : "G1",
			"NodeList": [
				{
					"Children": [
						"S1"
					],
					"Statement": "",
					"NodeType": 0,
					"Label": "G1",
					"Annotations" : [],
					"Notes" : []
				},
				{
					"Children": [
						"G2",
						"G3"
					],
					"Statement": "",
					"NodeType": 2,
					"Label": "S1",
					"Annotations" : [],
					"Notes" : []
				},
				{
					"Children": [
						"E1",
					],
					"Statement": "",
					"NodeType": 0,
					"Label": "G2",
					"Annotations" : [],
					"Notes" : []
				},
				{
					"Children": [
						"E2",
					],
					"Statement": "",
					"NodeType": 0,
					"Label": "G3",
					"Annotations" : [],
					"Notes" : []
				},
				{
					"Children": [],
					"Statement": "",
					"NodeType": 3,
					"Label": "E1",
					"Annotations" : [],
					"Notes" : []
				},
				{
					"Children": [],
					"Statement": "",
					"NodeType": 3,
					"Label": "E2",
					"Annotations" : [],
					"Notes" : []
				},
			]
	}

	var testCase = new Case();
	var caseDecoder = new CaseDecoder();
	var root = caseDecoder.ParseJson(testCase, JsonData);

	ok(checkCaseModel(root), "Created CaseModel is correct");
});
