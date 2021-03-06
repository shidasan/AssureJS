/// <reference path="CaseModel.ts" />
/// <reference path="CaseDecoder.ts" />
/// <reference path="CaseViewer.ts" />
/// <reference path="ServerApi.ts" />
/// <reference path="../plugins/MenuBar/MenuBar.ts" />
/// <reference path="../plugins/Editor/Editor.ts" />
/// <reference path="../plugins/Annotation/Annotation.ts" />
/// <reference path="../plugins/Note/Note.ts" />
/// <reference path="../d.ts/jquery.d.ts" />

$(function () {

	var serverApi = new ServerAPI('http://localhost/ait'); //TODO config for Path
	var pluginManager = new PlugInManager();
	pluginManager.AddActionPlugIn("menu", new MenuBarPlugIn());
	pluginManager.AddActionPlugIn("editor", new EditorPlugIn());
	pluginManager.AddRenderPlugIn("annotation", new AnnotationPlugIn());
	pluginManager.AddRenderPlugIn("note", new NotePlugIn());

	var JsonData = {
		"DCaseName": "test",
		"NodeCount": 23,
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
				"Annotations": [{"Name" : "Def", "Body" : "a = 1"}],
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
				"NodeType": 1,
				"Label": "C2",
				"Annotations": [{"Name" : "Def", "Body" : "a = 2"}],
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
				"Children": [
				],
				"Statement": "",
				"NodeType": 1,
				"Label": "C4",
				"Annotations": [{"Name" : "Def", "Body" : "a = 4"}],
				"Notes": []
			},
			{
				"Children": [
				],
				"Statement": "",
				"NodeType": 1,
				"Label": "C3",
				"Annotations": [{"Name" : "Def", "Body" : "a = 3"}],
				"Notes": []
			},
			{
				"Children": [
				],
				"Statement": "",
				"NodeType": 3,
				"Label": "E3",
				"Annotations": [],
				"Notes": []
			},
			{
				"Children": [
				],
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
					"C5",
					"E5",
					"E6",
				],
				"Statement": "",
				"NodeType": 0,
				"Label": "G7",
				"Annotations": [],
				"Notes": []
			},
			{
				"Children": [
				],
				"Statement": "",
				"NodeType": 3,
				"Label": "E5",
				"Annotations": [],
				"Notes": []
			},
			{
				"Children": [
				],
				"Statement": "",
				"NodeType": 3,
				"Label": "E6",
				"Annotations": [],
				"Notes": []
			},
			{
				"Children": [
				],
				"Statement": "",
				"NodeType": 1,
				"Label": "C5",
				"Annotations": [],
				"Notes": []
			},
			{
				"Children": [
				],
				"Statement": "",
				"NodeType": 0,
				"Label": "G8",
				"Annotations": [],
				"Notes": []
			},
			{
				"Children": [
				],
				"Statement": "",
				"NodeType": 0,
				"Label": "G9",
				"Annotations": [],
				"Notes": []
			},
		]
	}

	var Case0: Case = new Case();
	var caseDecoder: CaseDecoder = new CaseDecoder();
	var root: CaseModel = caseDecoder.ParseJson(Case0, JsonData);

	Case0.SetElementTop(root);
	var Viewer = new CaseViewer(Case0, pluginManager, serverApi);
	var backgroundlayer = <HTMLDivElement>document.getElementById("background");
	var shapelayer = <SVGGElement><any>document.getElementById("layer0");
	var contentlayer = <HTMLDivElement>document.getElementById("layer1");
	var controllayer = <HTMLDivElement>document.getElementById("layer2");

	var Screen = new ScreenManager(shapelayer, contentlayer, controllayer, backgroundlayer);
	Viewer.Draw(Screen);
});

