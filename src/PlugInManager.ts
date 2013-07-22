class PlugIn {
	Name : string;
}

class ActionPlugIn extends PlugIn {
	IsEnabled : (x: CaseViewer, y: CaseModel) => boolean;
	Delegate : (x: CaseViewer, y: CaseModel) => boolean;
}

class CheckerPlugIn extends PlugIn {
	IsEnabled : (x: CaseModel, EventType: string) => boolean; 
	Delegate : (x: CaseModel, y: string, z: string) => boolean;
}

class RenderPlugIn extends PlugIn {
	IsEnabled : (x: CaseViewer, y: CaseModel) => boolean; 
	Delegate : (x: CaseViewer, y: CaseModel, HTMLDoc: JQuery) => void;
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
	
}
/** this is sample of ActionPlagIn */
function OnClickApproval(CaseModel: CaseModel) : boolean {
	CaseModel.SetAnnotation('@approval', CaseModel.Case.UserName);
	return true; // resize, redraw
}


