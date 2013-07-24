/// <reference path="CaseModel.ts" />

function OutputError(o : any) : void {
		console.log("error: " + o);
}

class Parser {

	Case : Case;

	constructor(Case : Case) {
		this.Case = Case;
	}

	Parse(source : any, root? : CaseModel) : CaseModel {
		return null;
	}

}

class JsonParser extends Parser {

	caseModelMap : any = {};

	InitCaseModelMap(NodeList : any[] /* TODO: remove any type */) : void {
		for(var i : number = 0; i < NodeList.length; i++) {
			this.caseModelMap[NodeList[i]["Label"]] = NodeList[i];
		}
	}

	ParseChild(childLabel : string, Parent : CaseModel) : CaseModel {
		var caseModelData : any = this.caseModelMap[childLabel]; // TODO: remove any type
		var Type : CaseType = caseModelData["NodeType"]; // fix NodeType's type
		var Statement : string = caseModelData["Statement"];
		var Children : string[] = caseModelData["Children"];
		var Notes : CaseNote[] = caseModelData["Notes"];
		var Annotations : CaseAnnotation[] = caseModelData["Annotations"];

		var childCaseModel : CaseModel = new CaseModel(this.Case, Parent, Type, childLabel, Statement);

		for(var i : number = 0; i < Children.length; i++) {
			this.ParseChild(Children[i], childCaseModel);
		}

		if(Parent == null) {
			return childCaseModel;
		}
		else {
			return Parent;
		}
	}

	Parse(JsonData : any /* TODO: remove any type */) : CaseModel {
		var DCaseName : string = JsonData["DCaseName"]; // Is it necessary?
		var NodeCount : number = JsonData["NodeCount"]; // Is it necessary?
		var TopGoalLabel : string = JsonData["TopGoalLabel"]; // Is it necessary?
		var NodeList : any[] = JsonData["NodeList"]; // TODO: remove any type

		this.InitCaseModelMap(NodeList);

		var root : CaseModel = this.ParseChild(TopGoalLabel, null);

		return root;
	}

}

class ASNParser extends Parser {

	Parse(ASNData : string, root? : CaseModel) : CaseModel {
		return null;
	}

}

class CaseDecoder {

	constructor() {
	}

	ParseJson(Case : Case, JsonData : any) : CaseModel  {
		var jsonParser : JsonParser = new JsonParser(Case);
		var root : CaseModel = jsonParser.Parse(JsonData);
		return root;
	}

	ParseDCaseXML(Case : Case, XMLData : any) : CaseModel {
		// TODO
		return null;
	}

	ParseASN(Case : Case,  ASNData: string, root : CaseModel) : CaseModel {
		// TODO
		return null;
	}

}
