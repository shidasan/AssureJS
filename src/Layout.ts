/// <reference path="CaseModel.ts" />
/// <reference path="CaseViewer.ts" />

class Layout {
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

class LayoutLandscape extends Layout {
//	var CaseArray : any[];
	footelement : string[] = new Array();
	constructor(public ViewMap : { [index: string]: ElementShape; } ) {
		super(ViewMap);
		this.X_MARGIN = 200;
		this.Y_MARGIN = 200;
	}

	SetAllElementPosition(Element : CaseModel) : void {
		if(Element.Children.length == 0) {
			return;
		}

		for(var i in Element.Children) {
			this.SetAllElementPosition(Element.Children[i]);
		}

		var yPositionSum = 0;
		for(var i in Element.Children) {
			yPositionSum += this.ViewMap[Element.Children[i].Label].AbsY;
		}
		this.ViewMap[Element.Label].AbsY = yPositionSum/Element.Children.length;
		console.log(this.ViewMap[Element.Label].AbsX);
	}

	SetFootElementPosition() : void {
		for(var i in this.footelement) {
//			console.log(this.footelement[i] + ".AbsX = " + this.ViewMap[this.footelement[i]].AbsX);
//			console.log(this.footelement[i] + ".AbsY = " + this.ViewMap[this.footelement[i]].AbsY);
			if(i != 0) {
				console.log("parent label of previous element in footelement= " + this.ViewMap[this.footelement[i-1]].ParentShape.Source.Label);
				this.ViewMap[this.footelement[i]].AbsY += this.ViewMap[this.footelement[i]].AbsY + this.Y_MARGIN;
			}
		}
		return;
	}

	Init(Element: CaseModel, x : number, y : number) : void {
		this.ViewMap[Element.Label].AbsX += x;
	}

	Traverse(Element: CaseModel, x : number, y : number) {
		if(Element.Children.length == 0) {
			this.footelement.push(Element.Label);
			console.log("footelement = " + this.footelement);
			return;
		}

		var i : number = 0;
		i = this.GetContextIndex(Element);
		if(i != -1) { //emit context element data
			this.ViewMap[Element.Children[i].Label].AbsX += x;
			this.ViewMap[Element.Children[i].Label].AbsY += y;
			Element.Children = Element.Children.splice(i-1,1);
			this.Traverse(Element, this.ViewMap[Element.Label].AbsX, this.ViewMap[Element.Label].AbsY);
		} else {  //emit element data except context
				this.EmitChildrenElement(Element, x, y);
		}
	}

	EmitChildrenElement(Node : CaseModel, x : number, y : number) : void {
		var n : number = Node.Children.length;
		for(var i : number = 0; i < n; i++) {
			this.ViewMap[Node.Children[i].Label].AbsX = x;
			this.ViewMap[Node.Children[i].Label].AbsX += this.X_MARGIN;
			this.ViewMap[Node.Children[i].Label].ParentDirection = Direction.Left;
			this.Traverse(Node.Children[i], this.ViewMap[Node.Children[i].Label].AbsX, this.ViewMap[Node.Children[i].Label].AbsY);
		}
		return;
	}


}

class LayoutPortrait extends Layout {
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

		if(Element.Children.length == 1 && Element.Children[0].Type == CaseType.Context) {
			this.ViewMap[Element.Children[0].Label].ParentDirection = Direction.Left;
			this.ViewMap[Element.Children[0].Label].AbsX = (this.ViewMap[Element.Label].AbsX + this.X_CONTEXT_MARGIN);
			this.ViewMap[Element.Children[0].Label].AbsY = this.ViewMap[Element.Label].AbsY;
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
			this.ViewMap[Element.Label].AbsX = xPositionSum/(Element.Children.length);
		}
		else {
			this.ViewMap[Element.Label].AbsX = xPositionSum/(Element.Children.length-1);
			this.ViewMap[Element.Children[i].Label].AbsX = (this.ViewMap[Element.Label].AbsX + this.X_CONTEXT_MARGIN);
		}
		console.log(this.ViewMap[Element.Label].AbsX);
	}

	SetFootElementPosition() : void {
		for(var i in this.footelement) {
			var PreviousElementShape : ElementShape = this.ViewMap[this.footelement[i-1]];
			var CurrentElementShape  : ElementShape = this.ViewMap[this.footelement[i]];
			if(i != 0) {
				if((PreviousElementShape.ParentShape.Source.Label != CurrentElementShape.ParentShape.Source.Label) && (this.GetContextIndex(PreviousElementShape.ParentShape.Source) != -1)) {
					CurrentElementShape.AbsX += 80;
					console.log("Previous Element's Parent has a Context Element.");
				}
				if(this.GetContextIndex(this.ViewMap[this.footelement[i-1]].Source) != -1) {
					CurrentElementShape.AbsX += 180;
				}
				console.log("parent label of previous element in footelement= " + this.ViewMap[this.footelement[i-1]].ParentShape.Source.Label);
				CurrentElementShape.AbsX += (PreviousElementShape.AbsX + this.X_MARGIN);
				console.log("footelement.AbsX = " + CurrentElementShape.AbsX);
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
			console.log("footelement = " + this.footelement);
			return;
		}

		var i : number = 0;
		i = this.GetContextIndex(Element);
		if(i != -1) { //emit context element data
			this.ViewMap[Element.Children[i].Label].ParentDirection = Direction.Left;
			this.ViewMap[Element.Children[i].Label].AbsX += x;
			this.ViewMap[Element.Children[i].Label].AbsY += y;
			this.ViewMap[Element.Children[i].Label].AbsX += this.X_CONTEXT_MARGIN;
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
				this.ViewMap[Node.Children[i].Label].AbsY = y;
				this.ViewMap[Node.Children[i].Label].AbsY += this.Y_MARGIN;
				this.Traverse(Node.Children[i], this.ViewMap[Node.Children[i].Label].AbsX, this.ViewMap[Node.Children[i].Label].AbsY);
			}
		}
		return;
	}
}
