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
		$('.node').click(function() { //FIXME
			var p = $(this).position();
			$('#editor')
				.css({position: 'absolute', top: p.top, left: p.left, display: 'block'})
				.appendTo($('#layer2'))
				.focus()
				.blur(function(e: JQueryEventObject) {
					e.stopPropagation();
					$(this).css({display: 'none'});
				})
				.on("keydown", function(e: JQueryEventObject) {
					if(e.keyCode == 27 /* ESC */){
						e.stopPropagation();
						$(this).css({display: 'none'});
					}
				});
		});
		return true;
	}
}
