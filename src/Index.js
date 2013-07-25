$(function () {
    var pluginManager = new PlugInManager();

    var JsonData = {
        "DCaseName": "test",
        "NodeCount": 17,
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
                    "S2"
                ],
                "Statement": "",
                "NodeType": 0,
                "Label": "G2",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [
                    "G4",
                    "G5",
                    "G6"
                ],
                "Statement": "",
                "NodeType": 2,
                "Label": "S2",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [
                    "E1"
                ],
                "Statement": "",
                "NodeType": 0,
                "Label": "G4",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [
                    "E2",
                    "E3"
                ],
                "Statement": "",
                "NodeType": 0,
                "Label": "G5",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [
                    "E4"
                ],
                "Statement": "",
                "NodeType": 0,
                "Label": "G6",
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
            },
            {
                "Children": [],
                "Statement": "",
                "NodeType": 3,
                "Label": "E3",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [],
                "Statement": "",
                "NodeType": 3,
                "Label": "E4",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [
                    "S3"
                ],
                "Statement": "",
                "NodeType": 0,
                "Label": "G3",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [
                    "G7",
                    "G8",
                    "G9"
                ],
                "Statement": "",
                "NodeType": 2,
                "Label": "S3",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [],
                "Statement": "",
                "NodeType": 0,
                "Label": "G7",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [],
                "Statement": "",
                "NodeType": 0,
                "Label": "G8",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [],
                "Statement": "",
                "NodeType": 0,
                "Label": "G9",
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
    var backgroundlayer = document.getElementById("background");
    var shapelayer = document.getElementById("layer0");
    var contentlayer = document.getElementById("layer1");
    var controllayer = document.getElementById("layer2");

    var Screen = new ScreenManager(shapelayer, contentlayer, controllayer, backgroundlayer);
    Viewer.Draw(Screen);
    pluginManager.AddActionPlugIn("sample", new SamplePlugIn());
    pluginManager.AddActionPlugIn("editor", new EditorPlugIn());
});
