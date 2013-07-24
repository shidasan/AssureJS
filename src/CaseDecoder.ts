/// <reference path="CaseModel.ts" />

function OutputError(o : any) : void {
		console.log("error: " + o);
}

class Parser {

	Case : Case;

	constructor(Case : Case) {
		this.Case = Case;
	}

	parse(source : any) : CaseModel {
		return null;
	}

}

class JsonParser extends Parser {

	caseModelMap : any = {};

	initCaseModelMap(NodeList : any[] /* TODO: remove any type */) : void {
		for(var i : number = 0; i < NodeList.length; i++) {
			this.caseModelMap[NodeList[i]["Label"]] = NodeList[i];
		}
	}

	parseChild(childLabel : string, Parent : CaseModel) : CaseModel {
		var caseModelData : any = this.caseModelMap[childLabel]; // TODO: remove any type
		var Type : CaseType = caseModelData["NodeType"]; // fix NodeType's type
		var Statement : string = caseModelData["Statement"];
		var Children : string[] = caseModelData["Children"];
		var Notes : CaseNote[] = caseModelData["Notes"];
		var Annotations : CaseAnnotation[] = caseModelData["Annotations"];

		var childCaseModel : CaseModel = new CaseModel(this.Case, Parent, Type, childLabel, Statement);

		for(var i : number = 0; i < Children.length; i++) {
			this.parseChild(Children[i], childCaseModel);
		}

		if(Parent == null) {
			return childCaseModel;
		}
		else {
			return Parent;
		}
	}

	parse(source : any) : CaseModel {
		var JsonData : any = <any>source; // TODO: remove any type
		var DCaseName : string = JsonData["DCaseName"]; // Is it necessary?
		var NodeCount : number = JsonData["NodeCount"]; // Is it necessary?
		var TopGoalLabel : string = JsonData["TopGoalLabel"]; // Is it necessary?
		var NodeList : any[] = JsonData["NodeList"]; // TODO: remove any type

		this.initCaseModelMap(NodeList);

		var root : CaseModel = this.parseChild(TopGoalLabel, null);

		return root;
	}

}

class MarkcaseParser extends Parser {

	parse(source : any) : CaseModel {
		var MarkCase : string = <string>source;
		return null;
	}

}

class CaseDecoder {

	constructor() {
	}

	ParseJson(Case : Case, JsonData : any) : CaseModel  {
		var jsonParser : JsonParser = new JsonParser(Case);
		var root : CaseModel = jsonParser.parse(JsonData);
		return root;
	}

	ParseDCaseXML(Case : Case, XML : any) : CaseModel {
		// TODO
		return null;
	}

	ParseASN(Case : Case,  ASN: string) : CaseModel {
		// TODO
		return null;
	}

}
