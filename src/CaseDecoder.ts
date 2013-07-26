/// <reference path="../d.ts/jquery.d.ts" />
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

	CaseModelMap : any = {};

	InitCaseModelMap(NodeList : any[] /* TODO: remove any type */) : void {
		for(var i : number = 0; i < NodeList.length; i++) {
			this.CaseModelMap[NodeList[i]["Label"]] = NodeList[i];
		}
	}

	ParseChild(childLabel : string, Parent : CaseModel) : CaseModel {
		var CaseModelData : any = this.CaseModelMap[childLabel]; // TODO: remove any type
		var Type : CaseType = CaseModelData["NodeType"]; // fix NodeType's type
		var Statement : string = CaseModelData["Statement"];
		var Children : string[] = CaseModelData["Children"];
		var NoteData : CaseNote[] = CaseModelData["Notes"];
		var AnnotationData : any[] = CaseModelData["Annotations"];

		var ChildCaseModel : CaseModel = new CaseModel(this.Case, Parent, Type, childLabel, Statement);

		for(var i : number = 0; i < NoteData.length; i++) {
			var note : CaseNote =
							 new CaseNote(NoteData[i].Name, NoteData[i].Body);
			ChildCaseModel.Notes.push(note);
		}

		for(var i : number = 0; i < AnnotationData.length; i++) {
			var annotation : CaseAnnotation =
							 new CaseAnnotation(AnnotationData[i].Name, AnnotationData[i].Body);
			ChildCaseModel.Annotations.push(annotation);
		}

		for(var i : number = 0; i < Children.length; i++) {
			this.ParseChild(Children[i], ChildCaseModel);
		}

		if(Parent == null) {
			return ChildCaseModel;
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

class DCaseLink {

	source : string;
	target : string;

	constructor(source : string, target : string) {
		this.source = source;
		this.target = target;
	}

}

class DCaseXMLParser extends Parser {

	Case : Case;
	nodes : any = {};
	links : any = {};
	Text2CaseTypeMap : any = {"Goal" : CaseType.Goal, "Strategy" : CaseType.Strategy , "Context" : CaseType.Context, "Evidence" : CaseType.Evidence};
	RootNodeId : string;

	MakeTree(Id : string) : CaseModel {
		var ThisNode : CaseModel = this.nodes[Id];

		for(var LinkId in this.links) {
			var link : DCaseLink = this.links[LinkId];

			if(link.source == Id || link.target == Id) {
				var ChildNodeId : string;

				if(link.source == Id) {
					ChildNodeId = link.target;
				}
				else {
					ChildNodeId = link.source;
				}
				delete this.links[LinkId];

				var ChildNode : CaseModel = this.nodes[ChildNodeId];

				ThisNode.AppendChild(ChildNode);
				this.MakeTree(ChildNodeId);
			}
		}

		return ThisNode;
	}

	Parse(XMLData : string) : CaseModel {
		var self : DCaseXMLParser = this;
		var IsRootNode : boolean = true;

		$(XMLData).find("rootBasicNode").each(function(index : any, elem : Element) : JQuery {
			var XsiType : string = $(this).attr("xsi\:type");

			if(XsiType.split(":").length != 2) {
				OutputError("attr 'xsi:type' is incorrect format");
			}

			var NodeType : string = XsiType.split(":")[1];
			var Id : string = $(this).attr("id");
			var Statement : string = $(this).attr("desc");
			var Label : string = $(this).attr("name");

			if(IsRootNode) {
				self.RootNodeId = Id;
				IsRootNode = false;
			}

			var node : CaseModel = new CaseModel(self.Case, null, self.Text2CaseTypeMap[NodeType], Label, Statement);
			self.nodes[Id] = node;

			return null;
		});

		$(XMLData).find("rootBasicLink").each(function(index : any, elem : Element) : JQuery {
			var Id : any = $(this).attr("id");
			var source : string = $(this).attr("source").substring(1); // #abc -> abc
			var target : string = $(this).attr("target").substring(1); // #abc -> abc
			var link : DCaseLink = new DCaseLink(source, target);

			self.links[Id] = link;

			return null;
		});

		var root : CaseModel = this.MakeTree(this.RootNodeId);

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
		var parser : Parser = new JsonParser(Case);
		var root : CaseModel = parser.Parse(JsonData);
		return root;
	}

	ParseDCaseXML(Case : Case, XMLData : string) : CaseModel {
		var parser : Parser = new DCaseXMLParser(Case);
		var root : CaseModel = parser.Parse(XMLData);
		return root;
	}

	ParseASN(Case : Case,  ASNData: string, root : CaseModel) : CaseModel {
		// TODO
		return null;
	}

}
