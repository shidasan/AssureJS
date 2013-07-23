$(function () {
    var pluginManager = new PlugInManager();

    var JsonData = {
        "DCaseName": "test",
        "NodeCount": 8,
        "TopGoalLabel": "G1",
        "NodeList": [
            {
                "Children": [
                    "S1",
                    "C1"
                ],
                "Statement": "",
                "NodeType": 0,
                "Label": "G1",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [],
                "Statement": "",
                "NodeType": 1,
                "Label": "C1",
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
                    "C2",
                    "E1"
                ],
                "Statement": "",
                "NodeType": 0,
                "Label": "G2",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [],
                "Statement": "",
                "NodeType": 1,
                "Label": "C2",
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

    var Case0 = new Case();
    var caseDecoder = new CaseDecoder();
    var root = caseDecoder.ParseJson(Case0, JsonData);

    Case0.SetElementTop(root);
    var Viewer = new CaseViewer(Case0);
    var shapelayer = document.getElementById("layer0");
    var contentlayer = document.getElementById("layer1");
    var controllayer = document.getElementById("layer2");

    var Screen = new ScreenManager(shapelayer, contentlayer, controllayer);
    Viewer.Draw(Screen);
    pluginManager.AddActionPlugIn("sample", new SamplePlugIn());
});
