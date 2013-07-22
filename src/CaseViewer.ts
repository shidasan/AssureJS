/// <reference path="CaseModel.ts" />
/// <reference path="CaseDecoder.ts" />
/// <reference path="../d.ts/jQuery.d.ts" />
// <reference path="../d.ts/jQuery.svg.d.ts" />
/* VIEW (MVC) */

class HTMLDoc {
    DocBase: JQuery;
    Width: number;
    Height: number;

    Render(Viewer: CaseViewer, CaseModel: CaseModel): void {
        if (this.DocBase != null) {
            var parent = this.DocBase.parent();
            if(parent != null) parent.remove(this.DocBase);
        }
        this.DocBase = $('<div>').width(CaseViewer.ElementWidth);
        this.DocBase.append($('<h4>' + CaseModel.Label + '</h4>'));
        this.DocBase.append($('<p>' + CaseModel.Statement + '</p>'));
        this.InvokePlugInRender(Viewer, CaseModel, this.DocBase);
        // set height
        this.Width = this.DocBase.width();
        this.Height = this.DocBase.height();
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
        this.Width = this.DocBase ? this.DocBase.width() : 0;
        this.Height = this.DocBase ? this.DocBase.height() : 0;
    }
}

class SVGShape {
    ParentView: ElementShape;
	Width  :   number;
	Height :   number;
	Shape  : any;	

	Resize (CaseViewer: CaseViewer, CaseModel: CaseModel, HTMLDoc: HTMLDoc) : void {
        this.Width = HTMLDoc.Width;
        this.Height = HTMLDoc.Height;
	}

}

interface JQuery {
    svg(loadUrl: string): JQuery;
    svg(x: Function): JQuery;
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
        this.HTMLDoc.Render(CaseViewer, CaseModel);
		this.SVGShape = new SVGShape();
	}
	
	Resize() : void {
        this.HTMLDoc.Resize(this.CaseViewer, this.Source);
        this.SVGShape.Resize(this.CaseViewer, this.Source, this.HTMLDoc);
	}

	AppendHTMLElement(root : JQuery) : void {
        // Tetsurom
        // if it has an parent, add an arrow element. 
        //svg.rect(parent, this.AbsX, this.AbsY, this.HTMLDoc.Width, this.HTMLDoc.Height);
        var rect = $(document.createElementNS('http://www.w3.org/2000/svg', "rect")).attr({
            fill: "none", stroke: "gray",
            x: this.AbsX, y: this.AbsY, width: this.HTMLDoc.Width, height: this.HTMLDoc.Height,
            //points: "0,0 0,0 0,0 0,0"
        });
        rect.appendTo(root);
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
			this.ViewMap[shape].Resize();
		}
		this.LayoutElement();
	}

	LayoutElement() : void {
		// TODO: ishii
	}

	Draw(svg : JQuery) : void {
		for(var shape in this.ViewMap) {
            this.ViewMap[shape].AppendHTMLElement(svg);
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

$(function () {
    var model = new CaseModel(null, null, CaseType.Goal, "G0", "Top Goal");
    var Viewer = new CaseViewer(model);
    var root: any = $("#svgroot");
    Viewer.Draw(root);
});
