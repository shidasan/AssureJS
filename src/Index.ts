/// <reference path="CaseModel.ts" />
/// <reference path="CaseDecoder.ts" />
/// <reference path="CaseViewer.ts" />
/// <reference path="../plugins/MenuBar/MenuBar.ts" />
/// <reference path="../plugins/Editor/Editor.ts" />
/// <reference path="../d.ts/jquery.d.ts" />

$(function () {

	var pluginManager = new PlugInManager();
	pluginManager.AddActionPlugIn("menubar", new MenuBarPlugIn());
	pluginManager.AddActionPlugIn("editor", new EditorPlugIn());

	var JsonData = {
		"DCaseName": "test",
		"NodeCount": 7,
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
				"Children": [
				],
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
				"Children": [
				],
				"Statement": "",
				"NodeType": 3,
				"Label": "E1",
				"Annotations": [],
				"Notes": []
			},
			{
				"Children": [
				],
				"Statement": "",
				"NodeType": 3,
				"Label": "E2",
				"Annotations": [],
				"Notes": []
			},
		]
	}

	var Case0: Case = new Case();
	var caseDecoder: CaseDecoder = new CaseDecoder();
	var root: CaseModel = caseDecoder.ParseJson(Case0, JsonData);

	Case0.SetElementTop(root);
	var Viewer = new CaseViewer(Case0);
	var backgroundlayer = <HTMLDivElement>document.getElementById("background");
	var shapelayer = <SVGGElement><any>document.getElementById("layer0");
	var contentlayer = <HTMLDivElement>document.getElementById("layer1");
	var controllayer = <HTMLDivElement>document.getElementById("layer2");

	var Screen = new ScreenManager(shapelayer, contentlayer, controllayer, backgroundlayer);
	Viewer.Draw(Screen, pluginManager);
});

