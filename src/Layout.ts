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
}

class LayoutLandscape extends Layout {
	constructor(public ViewMap : { [index: string]: ElementShape; } ) {
		super(ViewMap);
	}

	Init(Element: CaseModel, x : number, y : number) : void {
	}

	Traverse(Element: CaseModel, x : number, y : number) : void {
	}
}

class LayoutPortrait extends Layout {
	constructor(public ViewMap : { [index: string]: ElementShape; } ) {
		super(ViewMap);
	}

	GetContextIndex(Node : CaseModel, x : number, y : number) : number {
		var i = 0
			for(; i < Node.Children.length; i++) {
				if(Node.Children[i].Type == CaseType.Context) {
					return i;
				}
			}
		return -1;
	}

	Init(Element: CaseModel, x : number, y : number) : void {
	}

	Traverse(Element: CaseModel, x : number, y : number) {
		if(Element.Children.length == 0) {
			return;
		}

		var i = 0;
		i = this.hasContext(Element, this.ViewMap[Element.Label].AbsX, this.ViewMap[Element.Label].AbsY);
		if(i != -1) { //emit context element data
			this.ViewMap[Element.Label].AbsX += x;
			this.ViewMap[Element.Label].AbsY += y;
			this.ViewMap[Element.Label].AbsX += 50;
			console.log(Element.Label);
			console.log("(" + this.ViewMap[Element.Label].AbsX + ", " + this.ViewMap[Element.Label].AbsY + ")");
			Element.Children = Element.Children.splice(i-1,1);
			this.traverse(Element, this.ViewMap[Element.Label].AbsX, this.ViewMap[Element.Label].AbsY);
		} else {  //emit element data except context
			if(Element.Label == "G1") {
				this.ViewMap[Element.Label].AbsX += x;
				this.ViewMap[Element.Label].AbsY += y;
			}
			if(Element.Children.length % 2 == 1) {
//				this.emitOddNumberChildren(Element, this.ViewMap[Element.Label].AbsX, this.ViewMap[Element.Label].AbsY);
				this.emitOddNumberChildren(Element, x, y);
			}
			if(Element.Children.length % 2 == 0) {
//				this.emitEvenNumberChildren(Element, this.ViewMap[Element.Label].AbsX, this.ViewMap[Element.Label].AbsY);
				this.emitEvenNumberChildren(Element, x, y);
			}
		}
	}

	EmitOddNumberChildren(Node : CaseModel, x : number, y : number) : void {
		var n = Node.Children.length;
		for(var i in Node.Children) {
			this.ViewMap[Node.Children[i].Label].AbsX = x;
			this.ViewMap[Node.Children[i].Label].AbsY = y;
			this.ViewMap[Node.Children[i].Label].AbsY += 160;
		}
		var num = (n-1)/2;
		var k = 0;
		for(var j = -num; j <= num; j++) {
			this.ViewMap[Node.Children[k].Label].AbsX += 160 * j;
			k++;
		}

		for(var i in Node.Children) {
			console.log(Node.Children[i].Label);
			console.log("(" + this.ViewMap[Node.Children[i].Label].AbsX + ", " + this.ViewMap[Node.Children[i].Label].AbsY + ")");
			this.traverse(Node.Children[i], this.ViewMap[Node.Children[i].Label].AbsX, this.ViewMap[Node.Children[i].Label].AbsY);
		}
		return;
	}

	EmitEvenNumberChildren(Node : CaseModel, x : number, y : number) : void {
		var n = Node.Children.length;
		var num = n/2;
		var index = new Array();

		for(var j = -num; j <= num; j++) {
			if(j == 0) {
				continue;
			}
			index.push(j);
		}

		for(var i in Node.Children) {
			this.ViewMap[Node.Children[i].Label].AbsX += x;
			this.ViewMap[Node.Children[i].Label].AbsY += y;
			this.ViewMap[Node.Children[i].Label].AbsX += 160 * index[i];
			this.ViewMap[Node.Children[i].Label].AbsY += 160;
			console.log(Node.Children[i].Label);
//			console.log("(" + Node.Children[i].x + ", " + Node.Children[i].y + ")");
			console.log("(" + this.ViewMap[Node.Children[i].Label].AbsX + ", " + this.ViewMap[Node.Children[i].Label].AbsY + ")");
			this.traverse(Node.Children[i], this.ViewMap[Node.Children[i].Label].AbsX, this.ViewMap[Node.Children[i].Label].AbsY);
		}
		return;
	}
}
