/// <reference path="CaseModel.ts" />
/// <reference path="CaseDecoder.ts" />
/// <reference path="CaseViewer.ts" />
/// <reference path="../plugins/MenuBar/MenuBar.ts" />
/// <reference path="../plugins/Editor/Editor.ts" />
/// <reference path="../plugins/Annotation/Annotation.ts" />
/// <reference path="../d.ts/jquery.d.ts" />
$(function () {
    var pluginManager = new PlugInManager();
    pluginManager.AddActionPlugIn("menu", new MenuBarPlugIn());
    pluginManager.AddActionPlugIn("editor", new EditorPlugIn());
    pluginManager.AddRenderPlugIn("annotation", new AnnotationPlugIn());

    var JsonData = {
        "DCaseName": "test",
        "NodeCount": 22,
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
                    "G6",
                    "C3"
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
                    "C2",
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
                "NodeType": 1,
                "Label": "C2",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [
                    "C4"
                ],
                "Statement": "",
                "NodeType": 3,
                "Label": "E2",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [],
                "Statement": "",
                "NodeType": 1,
                "Label": "C4",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [],
                "Statement": "",
                "NodeType": 1,
                "Label": "C3",
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
                "Children": [
                    "E5",
                    "E6"
                ],
                "Statement": "",
                "NodeType": 0,
                "Label": "G7",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [],
                "Statement": "",
                "NodeType": 3,
                "Label": "E5",
                "Annotations": [],
                "Notes": []
            },
            {
                "Children": [],
                "Statement": "",
                "NodeType": 3,
                "Label": "E6",
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
    root.Annotations = [new CaseAnnotation("Task", "test")];

    Case0.SetElementTop(root);
    var Viewer = new CaseViewer(Case0, pluginManager);
    var backgroundlayer = document.getElementById("background");
    var shapelayer = document.getElementById("layer0");
    var contentlayer = document.getElementById("layer1");
    var controllayer = document.getElementById("layer2");

    var Screen = new ScreenManager(shapelayer, contentlayer, controllayer, backgroundlayer);
    Viewer.Draw(Screen);
});
