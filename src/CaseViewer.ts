
/* VIEW (MVC) */

class HTMLDoc {
	Document: string;
	Width :   number;
	Height :  number;
	
	Render (CaseViewer : CaseViewer, CaseModel : CaseModel) : void {
		// todo
		// set document from CaseModel
		this.Document += CaseModel.InvokeRender(CaseViewer)
		// set height	
	}
	
	InvokePlugInRender(CaseViewer : CaseViewer, CaseModel : CaseModel) : String {
		var doc = "";
		for(var anno in CaseModel.Annotations) {
			f = CaseViewer.GetPlugInRender(anno.Name);
			doc += f(CaseViewer, CaseModel, anno);
		}
		for(var note in CaseModel.Notes) {
			f = CaseViewer.GetPlugInRender(note.Name);
			doc += f(CaseViewer, CaseModel, note);
		}
		return doc;
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

