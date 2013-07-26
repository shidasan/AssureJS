var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LayoutEngine = (function () {
    function LayoutEngine(ViewMap) {
        this.ViewMap = ViewMap;
    }
    LayoutEngine.prototype.Init = function (Element, x, y) {
    };

    LayoutEngine.prototype.Traverse = function (Element, x, y) {
    };

    LayoutEngine.prototype.SetFootElementPosition = function () {
    };

    LayoutEngine.prototype.SetAllElementPosition = function (Element) {
    };

    LayoutEngine.prototype.GetContextIndex = function (Node) {
        for (var i = 0; i < Node.Children.length; i++) {
            if (Node.Children[i].Type == CaseType.Context) {
                return i;
            }
        }
        return -1;
    };
    return LayoutEngine;
})();

var LayoutLandscape = (function (_super) {
    __extends(LayoutLandscape, _super);
    function LayoutLandscape(ViewMap) {
        _super.call(this, ViewMap);
        this.ViewMap = ViewMap;
        this.footelement = new Array();
        this.contextId = -1;
        this.X_MARGIN = 200;
        this.Y_MARGIN = 140;
    }
    LayoutLandscape.prototype.SetAllElementPosition = function (Element) {
        if (Element.Children.length == 0) {
            return;
        }

        if (Element.Children.length == 1 && Element.Children[0].Type == CaseType.Context) {
            this.ViewMap[Element.Children[0].Label].AbsY = (this.ViewMap[Element.Label].AbsY - 100);
            this.ViewMap[Element.Children[0].Label].ParentDirection = Direction.Bottom;
            this.ViewMap[Element.Children[0].Label].AbsX = this.ViewMap[Element.Label].AbsX;
            return;
        }

        var n = Element.Children.length;
        for (var i = 0; i < n; i++) {
            this.SetAllElementPosition(Element.Children[i]);
        }

        var i = 0;
        i = this.GetContextIndex(Element);
        var yPositionSum = 0;

        for (var j = 0; j < n; j++) {
            if (i != j) {
                yPositionSum += this.ViewMap[Element.Children[j].Label].AbsY;
            }
        }
        if (i == -1) {
            if (Element.Children.length == 1 && Element.Children[0].Type == CaseType.Evidence) {
                this.ViewMap[Element.Label].AbsY = yPositionSum / (Element.Children.length) + 15;
            } else {
                this.ViewMap[Element.Label].AbsY = yPositionSum / (Element.Children.length);
            }
        } else {
            this.ViewMap[Element.Label].AbsY = yPositionSum / (Element.Children.length - 1);
            this.ViewMap[Element.Children[i].Label].AbsY = (this.ViewMap[Element.Label].AbsY - 100);
        }
        console.log(this.ViewMap[Element.Label].AbsX);
    };

    LayoutLandscape.prototype.SetFootElementPosition = function () {
        var n = this.footelement.length;
        for (var i = 0; i < n; i++) {
            var PreviousElementShape = this.ViewMap[this.footelement[i - 1]];
            var CurrentElementShape = this.ViewMap[this.footelement[i]];
            if (i != 0) {
                if ((PreviousElementShape.ParentShape.Source.Label != CurrentElementShape.ParentShape.Source.Label) && (this.GetContextIndex(PreviousElementShape.ParentShape.Source) != -1)) {
                    CurrentElementShape.AbsY += 80;
                    console.log("Previous Element's Parent has a Context Element.");
                }
                if (this.GetContextIndex(this.ViewMap[this.footelement[i - 1]].Source) != -1) {
                    PreviousElementShape.AbsY += 180;
                }
                CurrentElementShape.AbsY += (PreviousElementShape.AbsY + this.Y_MARGIN);
            }
        }
        return;
    };

    LayoutLandscape.prototype.Init = function (Element, x, y) {
        this.ViewMap[Element.Label].AbsX += x;
    };

    LayoutLandscape.prototype.Traverse = function (Element, x, y) {
        if ((Element.Children.length == 0 && Element.Type != CaseType.Context) || (Element.Children.length == 1 && Element.Children[0].Type == CaseType.Context)) {
            this.footelement.push(Element.Label);
            console.log("footelement = " + this.footelement);
            return;
        }
        var i = 0;
        i = this.GetContextIndex(Element);
        if (i != -1) {
            this.ViewMap[Element.Children[i].Label].AbsX += x;
            this.ViewMap[Element.Children[i].Label].AbsY += y;
            this.ViewMap[Element.Children[i].Label].AbsY += this.Y_MARGIN;
            this.ViewMap[Element.Children[i].Label].ParentDirection = Direction.Bottom;
            console.log(Element.Children[i].Label);
            console.log("(" + this.ViewMap[Element.Children[i].Label].AbsX + ", " + this.ViewMap[Element.Children[i].Label].AbsY + ")");
            this.EmitChildrenElement(Element, this.ViewMap[Element.Label].AbsX, this.ViewMap[Element.Label].AbsY, i);
        } else {
            this.EmitChildrenElement(Element, x, y, i);
        }
    };

    LayoutLandscape.prototype.EmitChildrenElement = function (Node, x, y, ContextId) {
        var n = Node.Children.length;
        for (var i = 0; i < n; i++) {
            if (ContextId == i) {
                continue;
            } else {
                this.ViewMap[Node.Children[i].Label].AbsX = x;
                this.ViewMap[Node.Children[i].Label].AbsX += this.X_MARGIN;
                this.ViewMap[Node.Children[i].Label].ParentDirection = Direction.Left;
                this.Traverse(Node.Children[i], this.ViewMap[Node.Children[i].Label].AbsX, this.ViewMap[Node.Children[i].Label].AbsY);
            }
        }
        return;
    };
    return LayoutLandscape;
})(LayoutEngine);

var LayoutPortrait = (function (_super) {
    __extends(LayoutPortrait, _super);
    function LayoutPortrait(ViewMap) {
        _super.call(this, ViewMap);
        this.ViewMap = ViewMap;
        this.X_MARGIN = 200;
        this.Y_MARGIN = 160;
        this.X_CONTEXT_MARGIN = 200;
        this.X_FOOT_MARGIN = 100;
        this.X_MULTI_ELEMENT_MARGIN = 20;
        this.footelement = new Array();
        this.contextId = -1;
    }
    LayoutPortrait.prototype.SetAllElementPosition = function (Element) {
        if (Element.Children.length == 0) {
            return;
        }

        var ParentView = this.ViewMap[Element.Label];

        if (Element.Children.length == 1 && Element.Children[0].Type == CaseType.Context) {
            var ContextView = this.ViewMap[Element.Children[0].Label];
            var h1 = this.ViewMap[Element.Children[0].Label].HTMLDoc.Height;
            var h2 = this.ViewMap[Element.Label].HTMLDoc.Height;
            var h = (h1 - h2) / 2;
            ContextView.ParentDirection = Direction.Left;
            ContextView.AbsX = (ParentView.AbsX + this.X_CONTEXT_MARGIN);
            ContextView.AbsY = (ParentView.AbsY - h);
            return;
        }
        var n = Element.Children.length;
        for (var i = 0; i < n; i++) {
            this.SetAllElementPosition(Element.Children[i]);
        }

        var i = 0;
        i = this.GetContextIndex(Element);
        var xPositionSum = 0;
        n = Element.Children.length;
        for (var j = 0; j < n; j++) {
            if (i != j) {
                xPositionSum += this.ViewMap[Element.Children[j].Label].AbsX;
            }
        }
        if (i == -1) {
            ParentView.AbsX = xPositionSum / (Element.Children.length);
        } else {
            ParentView.AbsX = xPositionSum / (Element.Children.length - 1);
            this.ViewMap[Element.Children[i].Label].AbsX = (ParentView.AbsX + this.X_CONTEXT_MARGIN);
            this.ViewMap[Element.Children[i].Label].AbsY = ParentView.AbsY;
        }
    };

    LayoutPortrait.prototype.CalculateMinPosition = function (ElementList) {
        if (ElementList[0].Type == CaseType.Context) {
            var xPosition = this.ViewMap[ElementList[1].Label].AbsX;
        } else {
            var xPosition = this.ViewMap[ElementList[0].Label].AbsX;
        }
        var n = ElementList.length;
        for (var i = 0; i < n; i++) {
            console.log(this.ViewMap[ElementList[i].Label].AbsX);
            if (ElementList[i].Type == CaseType.Context) {
                continue;
            }
            if (xPosition > this.ViewMap[ElementList[i].Label].AbsX) {
                xPosition = this.ViewMap[ElementList[i].Label].AbsX;
            }
        }
        return xPosition;
    };

    LayoutPortrait.prototype.CalculateMaxPosition = function (ElementList) {
        if (ElementList[0].Type == CaseType.Context) {
            var xPosition = this.ViewMap[ElementList[1].Label].AbsX;
        } else {
            var xPosition = this.ViewMap[ElementList[0].Label].AbsX;
        }

        var n = ElementList.length;
        for (var i = 0; i < n; i++) {
            var ChildView = this.ViewMap[ElementList[i].Label];
            if (ElementList[i].Type == CaseType.Context) {
                continue;
            }
            if (xPosition < ChildView.AbsX) {
                xPosition = ChildView.AbsX;
            }
        }
        return xPosition;
    };

    LayoutPortrait.prototype.SetFootElementPosition = function () {
        var n = this.footelement.length;
        for (var i = 0; i < n; i++) {
            var PreviousElementShape = this.ViewMap[this.footelement[i - 1]];
            var CurrentElementShape = this.ViewMap[this.footelement[i]];
            if (i != 0) {
                if ((PreviousElementShape.ParentShape.Source.Label != CurrentElementShape.ParentShape.Source.Label) && (this.GetContextIndex(PreviousElementShape.ParentShape.Source) != -1)) {
                    var PreviousParentChildren = PreviousElementShape.ParentShape.Source.Children;
                    var Min_xPosition = this.CalculateMinPosition(PreviousParentChildren);
                    var Max_xPosition = this.CalculateMaxPosition(PreviousParentChildren);
                    var ArgumentMargin = (Max_xPosition - Min_xPosition) / 2;
                    if (ArgumentMargin > (this.X_CONTEXT_MARGIN - this.X_MULTI_ELEMENT_MARGIN)) {
                        CurrentElementShape.AbsX += this.X_MULTI_ELEMENT_MARGIN;
                    } else {
                        CurrentElementShape.AbsX += this.X_FOOT_MARGIN;
                    }
                }
                if (this.GetContextIndex(PreviousElementShape.Source) != -1) {
                    CurrentElementShape.AbsX += this.X_MARGIN;
                }
                CurrentElementShape.AbsX += (PreviousElementShape.AbsX + this.X_MARGIN);
            }
        }
        return;
    };

    LayoutPortrait.prototype.Init = function (Element, x, y) {
        this.ViewMap[Element.Label].AbsY += y;
    };

    LayoutPortrait.prototype.Traverse = function (Element, x, y) {
        if ((Element.Children.length == 0 && Element.Type != CaseType.Context) || (Element.Children.length == 1 && Element.Children[0].Type == CaseType.Context)) {
            this.footelement.push(Element.Label);
            return;
        }

        var i = 0;
        i = this.GetContextIndex(Element);
        if (i != -1) {
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
        } else {
            this.EmitChildrenElement(Element, x, y, i);
        }
    };

    LayoutPortrait.prototype.EmitChildrenElement = function (Node, x, y, ContextId) {
        var n = Node.Children.length;
        for (var i = 0; i < n; i++) {
            var ElementView = this.ViewMap[Node.Children[i].Label];
            if (ContextId == i) {
                continue;
            } else {
                ElementView.AbsY = y;
                ElementView.AbsY += this.Y_MARGIN;
                this.Traverse(Node.Children[i], ElementView.AbsX, ElementView.AbsY);
            }
        }
        return;
    };
    return LayoutPortrait;
})(LayoutEngine);
