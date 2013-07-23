/// <reference path="CaseModel.ts" />
/// <reference path="CaseDecoder.ts" />
/// <reference path="../plugins/SamplePlugin.ts" />
/// <reference path="../d.ts/jquery.d.ts" />

$(function () {

	var pluginManager = new PlugInManager();

	var JsonData = {
			"DCaseName" : "test",
			"NodeCount" : 2,
			"TopGoalLabel" : "G1",
			"NodeList": [
				{
					"Children": [
						"S1"
					],
					"Statement": "Sample Goal",
					"NodeType": 0,
					"Label": "G1",
					"Annotations" : [],
					"Notes" : []
				},
				{
					"Children": [
					],
					"Statement": "Sample Strategy",
					"NodeType": 2,
					"Label": "S1",
					"Annotations" : [],
					"Notes" : []
				},
			]
	}

	var Case0: Case = new Case();
	var caseDecoder: CaseDecoder = new CaseDecoder();
	var root: CaseModel = caseDecoder.ParseJson(Case0, JsonData);


	Case0.SetTopGoalLabel(root.Label);
	var Viewer = new CaseViewer(Case0);
	var svgroot: JQuery = $("#svg1");
	var divroot: JQuery = $("#div1");
	Viewer.Draw(svgroot, divroot);
	pluginManager.AddActionPlugIn("sample",new SamplePlugIn());
})
