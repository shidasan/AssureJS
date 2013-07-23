/// <reference path="../src/CaseModel.ts" />
/// <reference path="../src/PlugInManager.ts" />

class SamplePlugIn extends ActionPlugIn {
	IsEnabled (caseViewer: CaseViewer, caseModel: CaseModel) : boolean {
		return true;
	}

	Delegate(caseViewer: CaseViewer, caseModel: CaseModel)  : boolean {
		$('<a href="#">hogehoge</a>').appendTo($('body'));
		return true;
	}

	Event() {
		$('.node').hover(()=> {
			this.Delegate(null, null);
		},()=> {
			console.log("out");
		});
	}
}
