
/* VIEW (MVC) */

class HTMLDoc {
        DocBase:  JQuery;
        Width :   number;
        Height :  number;

        Render (CaseViewer : CaseViewer, CaseModel : CaseModel) : void {
                // todo
                // set document from CaseModel
				DocBase = $('<div></div>').width(CaseViewer.ElementWidth);
				DocBase.Append($('<h4>' + CaseModel.Label + '</h4>'));
				DocBase.Append($('<p>' + CaseModel.Statement + '</p>'));
                InvokePlugInRender(CaseViewer, CaseModel, DocBase);
                // set height
				this.Width  = DocBase.width(); 
				this.Height = DocBase.height();
        }

        InvokePlugInRender(CaseViewer : CaseViewer, CaseModel : CaseModel, DocBase : JQuery) : void {
                for(var anno in CaseModel.Annotations) {
                       	var f = CaseViewer.GetPlugInRender(anno.Name);
                        DocBase.append(f(CaseViewer, CaseModel, anno));
                }
                for(var note in CaseModel.Notes) {
                        f = CaseViewer.GetPlugInRender(note.Name);
                        DocBase.append(f(CaseViewer, CaseModel, note));
                }
        }

}

class SVGShape {
	ParentView : CaseView;
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
	x, y : number;
	
	constructor(CaseViewer CaseViewer, CaseModel : CaseModel) {
		this.CaseViewer = CaseViewer;
		this.CaseModel = CaseModel;
		this.HTMLDoc = new HTMLDoc();
		this.SVGShape = new SVGShape();
	}
	
	Resize() : void {
		HTMLDoc.Resize(this.CaseViewer, this.CaseModel);
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

CaseViewerConfig = new CaseViserConfig();

class CaseViewer {
	ViewMap : Map<string, CaseView>;
	
	constructor(Source : CaseModel) {
		this.ViewMap = new Map();
		for(var model in Source) {
			this.ViewMap[model.Label] = new CaseView(this, model);
		}
		Resize();
	}
	
	Resize() : void {
		for(var shape in this.ViewMap) {
			shape.Resize();
		}
		LayoutElement();
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

function StartCaseViewer(url : string, id : string) {
	var loader = new ServerApi(url)
	var JsonData = loader.GetCase(project, id);
        var Argument = new Argument();
	var model = new CaseDecoder().ParseJson(Argument, JsonData);
	var CaseViewer = new CaseViewer(model);
	var svg = document.getElementBy(id);
	CaseViewer.Draw(svg);
}
