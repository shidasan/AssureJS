function checkCaseModel(root) {
    if ("G1" != root.Label)
        return false;

    var child = root.Children[0];
    if ("S1" != child.Label)
        return false;

    var grandchildren = child.Children;
    if (grandchildren.length != 2)
        return false;

    for (var i = 0; i < grandchildren.length; i++) {
        if (grandchildren[i].Label == "G2") {
            if ("E1" != grandchildren[i].Children[0].Label)
                return false;
        } else if (grandchildren[i].Label == "G3") {
            if ("E2" != grandchildren[i].Children[0].Label)
                return false;
        }
    }

    return true;
}

test("CaseDecoderTest", function (assert) {
    var JsonData = {
        "DCaseName": "test",
        "NodeCount": 6,
        "TopGoalLabel": "G1",
        "NodeList": [
            {
                "Children": [
                    "S1"
                ],
                "Statement": "",
                "NodeType": 0,
                "Label": "G1",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [
                    "G2",
                    "G3"
                ],
                "Statement": "",
                "NodeType": 2,
                "Label": "S1",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [
                    "E1"
                ],
                "Statement": "",
                "NodeType": 0,
                "Label": "G2",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [
                    "E2"
                ],
                "Statement": "",
                "NodeType": 0,
                "Label": "G3",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [],
                "Statement": "",
                "NodeType": 3,
                "Label": "E1",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [],
                "Statement": "",
                "NodeType": 3,
                "Label": "E2",
                "Annotations": [],
                "Notes": []
            }
        ]
    };

    var testCase = new Case();
    var caseDecoder = new CaseDecoder();
    var root = caseDecoder.ParseJson(testCase, JsonData);

    ok(checkCaseModel(root), "Created CaseModel is correct");
});
