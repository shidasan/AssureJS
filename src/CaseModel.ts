class CaseAnnotation {
	Name : string;
	Body : any;	
}

class CaseNote {
	Name : string;
	Body : string;
	
}

enum CaseType {
	Goal, Context, Strategy, Evidence
}

class CaseModel {
	Argument : Argument;
	Type  : CaseType;
	Label : string;
	Statement: string;
	Annotations : CaseAnnotation[];
	Notes: CaseNote[];
	Parent : CaseModel;
	Children: CaseModel[];

	constructor(Argument : Argument, Parent : CaseModel, Type : CaseType, Label : string, Statement : string) {
		this.Argument = Argument;
		this.Type = Type;
		this.Label = (Label == null) ? Context.NewLabel(Type) : Label;
		this.Statement = (Statement == null) ? "" : Statement;
		this.Parent = Parent;
		if(Parent != null) {
			Parent.AppendChildren(this);
		}
		this.Children = [];
		this.Annotations = [];
		this.Notes = [];
	}

	AppendChildren(Node : CaseModel) : void {
		this.Children.push(Node);
	}

    GetAnnotation(Name: string) : CaseAnnotation {
		for(var a in this.Annotations) {
			if(a.Name == Name) {
				return a;
			}
		}
		return a;
	}
	
}

class Argument {
	Ids : number[];
	constructor() {
		this.Ids = [0, 0, 0, 0, 0];
	}
	NewLabel(Type : CaseType) : string {
		this.Ids[Type] = this.Ids[Type] + 1;
		return CaseType[Type].charAt(0) + this.Ids[Type]; // TODO G1, S1, E1, C1
	}
}

