/// <reference path="CaseModel.ts" />
/// <reference path="../d.ts/jQuery.d.ts" />
// <reference path="../d.ts/jQuery.svg.d.ts" />
/* VIEW (MVC) */

class HTMLDoc {
    DocBase: JQuery;
    Width: number;
    Height: number;

    Render(Viewer: CaseViewer, CaseModel: CaseModel): void {
        var DocBase = $('<div>').width(CaseViewer.ElementWidth);
        DocBase.append($('<h4>' + CaseModel.Label + '</h4>'));
        DocBase.append($('<p>' + CaseModel.Statement + '</p>'));
        this.InvokePlugInRender(Viewer, CaseModel, DocBase);
        // set height
        this.Width = DocBase.width();
        this.Height = DocBase.height();
    }

    InvokePlugInRender(CaseViewer: CaseViewer, CaseModel: CaseModel, DocBase: JQuery): void {
        for (var anno in CaseModel.Annotations) {
            var f = CaseViewer.GetPlugInRender(anno.Name);
            DocBase.append(f(CaseViewer, CaseModel, anno));
        }
        for (var note in CaseModel.Notes) {
            var f = CaseViewer.GetPlugInRender(note.Name);
            DocBase.append(f(CaseViewer, CaseModel, note));
        }
    }

    Resize(Viewer: CaseViewer, Source: CaseModel): void {
    }
}

class SVGShape {
    ParentView: ElementShape;
	Width  :   number;
	Height :   number;
	Shape  : any;	

	Resize (CaseViewer : CaseViewer, HTMLDoc : HTMLDoc) : void {

	}

}

class ElementShape {
	CaseViewer : CaseViewer;
	Source : CaseModel;
	HTMLDoc  : HTMLDoc;
	SVGShape  : SVGShape;

	AbsX : number;  //
	AbsY : number;
    x: number;
    y: number;
	
	constructor(CaseViewer : CaseViewer, CaseModel : CaseModel) {
		this.CaseViewer = CaseViewer;
        this.Source = CaseModel;
		this.HTMLDoc = new HTMLDoc();
		this.SVGShape = new SVGShape();
	}
	
	Resize() : void {
        this.HTMLDoc.Resize(this.CaseViewer, this.Source);
		//SVGShape.Resize(this.CaseViewer, this.CaseModel, this.HTMLDoc);
	}

	AppendHTMLElement(root : HTMLElement) : void {
		// Tetsurom
		// if it has an parent, add an arrow element. 
		return; // TODO
	}
	
}

class CaseViewerConfig {

}

var ViewerConfig = new CaseViewerConfig();

class CaseViewer {
    ViewMap: { [index: string]: ElementShape; }

    static ElementWidth = 150;
	
	constructor(Source : CaseModel) {
        this.ViewMap = <any>[]; // a hack to avoid tsc's problem.
		for(var model in Source) {
            this.ViewMap[model.Label] = new ElementShape(this, model);
		}
		this.Resize();
    }

    GetPlugInRender(Name: string): (CaseViewer: CaseViewer, CaseModel: CaseModel, Node: string) => string {
        return null; // TODO;
    }
	
	Resize() : void {
		for(var shape in this.ViewMap) {
			shape.Resize();
		}
		this.LayoutElement();
	}

	LayoutElement() : void {
		// TODO: ishii
	}

	Draw(svg : any) : void {
		for(var shape in this.ViewMap) {
			shape.AppendHTMLElement(svg);
		}
	}

}

class ServerApi {
    constructor(url: string) {
    }
    GetCase(project: string, id: string): string {
        return "[]";
    }
}
class CaseDecoder {
    constructor() {
    }
    ParseJson(argument: Argument, json: string) {
    }
}


function StartCaseViewer(url : string, id : string) {
    var loader = new ServerApi(url);
    var project; // temp
	var JsonData = loader.GetCase(project, id);
    var Argument = new Argument();
	var model = new CaseDecoder().ParseJson(Argument, JsonData);
	var CaseViewer = new CaseViewer(model);
	var svg = document.getElementById(id);
	CaseViewer.Draw(svg);
}
