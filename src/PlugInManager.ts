class PlugIn {
	Name : string;
}

class ActionPlugIn extends PlugIn {
	EventName   : string;
	EventTarget : string;

	IsEnabled(caseViewer: CaseViewer, caseModel: CaseModel) : boolean {
		return true;
	}

	Delegate(caseViewer: CaseViewer, caseModel: CaseModel)  : boolean {
		return true;
	}
}

class CheckerPlugIn extends PlugIn {
	IsEnabled(caseModel: CaseModel, EventType: string) : boolean {
		return true;
	}

	Delegate(caseModel: CaseModel, y: string, z: string) : boolean {
		return true;
	}
}

class RenderPlugIn extends PlugIn {
	IsEnabled(caseViewer: CaseViewer, caseModel: CaseModel) : boolean {
		return true;
	}

	Delegate(caseViewer: CaseViewer, caseModel: CaseModel, element: JQuery) : void {
	}
}

class PlugInManager {

	ActionPlugIns : ActionPlugIn[];
	DefaultCheckerPlugIns : CheckerPlugIn[];
	CheckerPlugInMap : { [index: string]: CheckerPlugIn};
	DefaultRenderPlugIns : RenderPlugIn[];
	RenderPlugInMap : { [index: string]: RenderPlugIn};

	constructor() {
		this.ActionPlugIns = [];
		this.DefaultCheckerPlugIns = [];
		this.CheckerPlugInMap = {};
		this.DefaultRenderPlugIns = [];
		this.RenderPlugInMap = {};
	}


	AddActionPlugIn(key: string, actionPlugIn: ActionPlugIn) {
		this.ActionPlugIns.push(actionPlugIn);
	}

	RegisterActionEventListeners(CaseViewer: CaseViewer, CaseModel: CaseModel): void {
		for(var i: number = 0; i < this.ActionPlugIns.length; i++) {
			if(this.ActionPlugIns[i].IsEnabled(CaseViewer, CaseModel)) {
				this.ActionPlugIns[i].Delegate(CaseViewer, CaseModel);
			}
		}
	}
	/**
	AddCheckerPlugIn(key: string, f : (x : CaseModel, y: string, z : any) => boolean) {
		if(key == null) {
			this.DefaultCheckerPlugIns.push(f);
		}
		else {
			this.CheckerPlugInMap[key] = f;
		}
	}


	AddDefaultActionPlugIn(f : (x : CaseModel, y: string, z : any) => boolean) {
		if(key == null) {
			this.DefaultCheckerPlugIns.push(f);
		}
		else {
			this.CheckerPlugInMap[key] = f;
		}
	}
	**/

	AddRenderPlugIn(key: string, renderPlugIn: RenderPlugIn) {
		this.RenderPlugInMap[key] = renderPlugIn;
	}
}
/** this is sample of ActionPlugIn */
/*
function OnClickApproval(CaseModel: CaseModel) : boolean {
	CaseModel.SetAnnotation('@approval', CaseModel.Case.UserName);
	return true; // resize, redraw
}

*/
