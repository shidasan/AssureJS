/// <reference path="../../src/CaseModel.ts" />
/// <reference path="../../src/CaseViewer.ts" />
/// <reference path="../../src/PlugInManager.ts" />

class AnnotationPlugIn extends RenderPlugIn {
	IsEnabled(caseViewer: CaseViewer, caseModel: CaseModel) : boolean {
		return true;
	}

	Delegate(caseViewer: CaseViewer, caseModel: CaseModel, element: JQuery, anno: Object) : void {
		var a : CaseAnnotation = <CaseAnnotation>anno;
		var p : {top: number; left: number} = element.position();
		$('<div class="anno">' +
			'<font size="5" color="gray">' +
			'<p>@' + a.Name + '</p>' +
			'</font></div>')
			.css({position: 'absolute', top: p.top - 20, left: p.left + 80}).appendTo(element);
	}
}
