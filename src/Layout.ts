/// <reference path="CaseModel.ts" />
/// <reference path="CaseViewer.ts" />

class LayoutEngine {
	X_MARGIN : number;
	Y_MARGIN : number;

	constructor(public ViewMap : { [index: string]: ElementShape; } ) {
	}

	Init(Element: CaseModel, x : number, y : number) : void {
	}

	Traverse(Element: CaseModel, x : number, y : number) : void {
	}

	SetFootElementPosition() : void {
	}

	SetAllElementPosition(Element: CaseModel) : void {
	}

	GetContextIndex(Node : CaseModel) : number {
		for(var i : number = 0; i < Node.Children.length; i++) {
			if(Node.Children[i].Type == CaseType.Context) {
				return i;
			}
		}
		return -1;
	}
}

class LayoutLandscape extends LayoutEngine {
//	var CaseArray : any[];
	footelement : string[] = new Array();
	contextId : number = -1;

	constructor(public ViewMap : { [index: string]: ElementShape; } ) {
		super(ViewMap);
		this.X_MARGIN = 200;
		this.Y_MARGIN = 200;
	}

	SetAllElementPosition(Element : CaseModel) : void {
		if(Element.Children.length == 0) {
			return;
		}

		if(Element.Children.length == 1 && Element.Children[0].Type == CaseType.Context) {
			this.ViewMap[Element.Children[0].Label].AbsY = (this.ViewMap[Element.Label].AbsY + this.Y_MARGIN);
			this.ViewMap[Element.Children[0].Label].AbsX = this.ViewMap[Element.Label].AbsX;
			return;
		}

		for(var i in Element.Children) {
			this.SetAllElementPosition(Element.Children[i]);
		}

		var i : number = 0;
		i = this.GetContextIndex(Element);
		var yPositionSum : number = 0;
		for(var j in Element.Children) {
			if(i != j) {
				yPositionSum += this.ViewMap[Element.Children[j].Label].AbsY;
			}
		}
		if(i == -1) {
			if(Element.Children.length == 1 && Element.Children[0].Type == CaseType.Evidence) {
				this.ViewMap[Element.Label].AbsY = yPositionSum/(Element.Children.length) + 15;
			} else {
				this.ViewMap[Element.Label].AbsY = yPositionSum/(Element.Children.length);
			}
		}
		else {
			this.ViewMap[Element.Label].AbsY = yPositionSum/(Element.Children.length-1);
			this.ViewMap[Element.Children[i].Label].AbsY = (this.ViewMap[Element.Label].AbsY + 100);
		}
		console.log(this.ViewMap[Element.Label].AbsX);
	}

	SetFootElementPosition() : void {
		for(var i in this.footelement) {
			var PreviousElementShape : ElementShape = this.ViewMap[this.footelement[i-1]];
			var CurrentElementShape  : ElementShape = this.ViewMap[this.footelement[i]];
			if(i != 0) {
				if((PreviousElementShape.ParentShape.Source.Label != CurrentElementShape.ParentShape.Source.Label) && (this.GetContextIndex(PreviousElementShape.ParentShape.Source) != -1)) {
					CurrentElementShape.AbsY += 80;
					console.log("Previous Element's Parent has a Context Element.");
				}
				if(this.GetContextIndex(this.ViewMap[this.footelement[i-1]].Source) != -1) {
					CurrentElementShape.AbsY += 180;
				}
				console.log("parent label of previous element in footelement= " + this.ViewMap[this.footelement[i-1]].ParentShape.Source.Label);
				CurrentElementShape.AbsY += (PreviousElementShape.AbsY + this.Y_MARGIN);
				console.log("footelement.AbsX = " + CurrentElementShape.AbsY);
			}
		}
		return;
	}

	Init(Element: CaseModel, x : number, y : number) : void {
		this.ViewMap[Element.Label].AbsX += x;
	}

	Traverse(Element: CaseModel, x : number, y : number) {
		if((Element.Children.length == 0 && Element.Type != CaseType.Context)|| (Element.Children.length == 1 && Element.Children[0].Type == CaseType.Context)) {
			this.footelement.push(Element.Label);
			console.log("footelement = " + this.footelement);
			return;
		}

		var i : number = 0;
		i = this.GetContextIndex(Element);
		if(i != -1) { //emit context element data
			this.ViewMap[Element.Children[i].Label].AbsX += x;
			this.ViewMap[Element.Children[i].Label].AbsY += y;
			this.ViewMap[Element.Children[i].Label].AbsY += this.Y_MARGIN;
			console.log(Element.Children[i].Label);
			console.log("(" + this.ViewMap[Element.Children[i].Label].AbsX + ", " + this.ViewMap[Element.Children[i].Label].AbsY + ")");
			this.EmitChildrenElement(Element, this.ViewMap[Element.Label].AbsX, this.ViewMap[Element.Label].AbsY, i);
		} else {  //emit element data except context
			this.EmitChildrenElement(Element, x, y, i);
		}
	}

	EmitChildrenElement(Node : CaseModel, x : number, y : number, ContextId : number) : void {
		var n : number = Node.Children.length;
		for(var i : number = 0; i < n; i++) {
			if(ContextId == i) {
				continue;
			}
			else {
				this.ViewMap[Node.Children[i].Label].AbsX = x;
				this.ViewMap[Node.Children[i].Label].AbsX += this.X_MARGIN;
				this.ViewMap[Node.Children[i].Label].ParentDirection = Direction.Left;
				this.Traverse(Node.Children[i], this.ViewMap[Node.Children[i].Label].AbsX, this.ViewMap[Node.Children[i].Label].AbsY);
			}
		}
		return;
	}
}

class LayoutPortrait extends LayoutEngine {
	X_MARGIN = 200;
	Y_MARGIN = 160;
	X_CONTEXT_MARGIN : number = 200;
	footelement : string[] = new Array();
	contextId : number = -1;

	constructor(public ViewMap : { [index: string]: ElementShape; } ) {
		super(ViewMap);
	}

	SetAllElementPosition(Element : CaseModel) : void {
		if(Element.Children.length == 0) {
			return;
		}

		var ParentView = this.ViewMap[Element.Label];

		if(Element.Children.length == 1 && Element.Children[0].Type == CaseType.Context) {
			var ContextView = this.ViewMap[Element.Children[0].Label];
			var h1 = this.ViewMap[Element.Children[0].Label].HTMLDoc.Height;
			var h2 = this.ViewMap[Element.Label].HTMLDoc.Height;
			var h = (h1 - h2) / 2;
			ContextView.ParentDirection = Direction.Left;
			ContextView.AbsX = (ParentView.AbsX + this.X_CONTEXT_MARGIN);
			ContextView.AbsY = (ParentView.AbsY - h);
			return;
		}

		for(var i in Element.Children) {
			this.SetAllElementPosition(Element.Children[i]);
		}

		var i : number = 0;
		i = this.GetContextIndex(Element);
		var xPositionSum : number = 0;
		for(var j in Element.Children) {
			if(i != j) {
				xPositionSum += this.ViewMap[Element.Children[j].Label].AbsX;
			}
		}
		if(i == -1) {
			ParentView.AbsX = xPositionSum/(Element.Children.length);
		}
		else {
			ParentView.AbsX = xPositionSum/(Element.Children.length-1);
			this.ViewMap[Element.Children[i].Label].AbsX = (ParentView.AbsX + this.X_CONTEXT_MARGIN);
		}
	}

	SetFootElementPosition() : void {
		for(var i in this.footelement) {
			var PreviousElementShape : ElementShape = this.ViewMap[this.footelement[i-1]];
			var CurrentElementShape  : ElementShape = this.ViewMap[this.footelement[i]];
			if(i != 0) {
				if((PreviousElementShape.ParentShape.Source.Label != CurrentElementShape.ParentShape.Source.Label) && (this.GetContextIndex(PreviousElementShape.ParentShape.Source) != -1)) {
					CurrentElementShape.AbsX += 10;
				}
				if(this.GetContextIndex(PreviousElementShape.Source) != -1) {
					CurrentElementShape.AbsX += 180;
				}
				CurrentElementShape.AbsX += (PreviousElementShape.AbsX + this.X_MARGIN);
			}
		}
		return;
	}

	Init(Element: CaseModel, x : number, y : number) : void {
		this.ViewMap[Element.Label].AbsY += y;
	}

	Traverse(Element: CaseModel, x : number, y : number) {
		if((Element.Children.length == 0 && Element.Type != CaseType.Context)|| (Element.Children.length == 1 && Element.Children[0].Type == CaseType.Context)) {
			this.footelement.push(Element.Label);
			return;
		}

		var i : number = 0;
		i = this.GetContextIndex(Element);
		if(i != -1) { //emit context element data
			var ContextView = this.ViewMap[Element.Children[i].Label];
			var ParentView = ContextView.ParentShape;
			var h1 = ContextView.HTMLDoc.Height;
			var h2 = ParentView.HTMLDoc.Height;
			var h = (h1 - h2) / 2;
			ContextView.ParentDirection = Direction.Left;
			ContextView.AbsX += x;
			ContextView.AbsY += (y - h);
			ContextView.AbsX += this.X_CONTEXT_MARGIN;
			this.EmitChildrenElement(Element, ParentView.AbsX, ParentView.AbsY, i);
		} else {  //emit element data except context
			this.EmitChildrenElement(Element, x, y, i);
		}
	}

	EmitChildrenElement(Node : CaseModel, x : number, y : number, ContextId : number) : void {
		var n : number = Node.Children.length;
		for(var i : number = 0; i < n; i++) {
			var ElementView = this.ViewMap[Node.Children[i].Label];
			if(ContextId == i) {
				continue;
			}
			else {
				ElementView.AbsY = y;
				ElementView.AbsY += this.Y_MARGIN;
				this.Traverse(Node.Children[i], ElementView.AbsX, ElementView.AbsY);
			}
		}
		return;
	}
}
