/// <reference path="../../src/CaseModel.ts" />
/// <reference path="../../src/PlugInManager.ts" />

//--- Interface for widearea.js
declare function wideArea(selector?: string): void;
//---

class EditorPlugIn extends ActionPlugIn {
	constructor() {
		super();
		wideArea();
		$('#editor').css({display: 'none'});
	}

	IsEnabled (caseViewer: CaseViewer, caseModel: CaseModel) : boolean {
		return true;
	}

	Delegate(caseViewer: CaseViewer, caseModel: CaseModel)  : boolean {
		return true;
	}

	Event() { //FIXME add parameter Case class
		$('.node').click(function() {
			var p = $(this).position();
			$('#editor').css({position: 'absolute', top: p.top, left: p.left, display: 'block'}).appendTo($('#layer2'));
			$('#editor').blur(function(e){
				$(this).css({display: 'none'});
			});
		});
	}
}
