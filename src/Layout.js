var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Layout = (function () {
    function Layout(ViewMap) {
        this.ViewMap = ViewMap;
    }
    Layout.prototype.Init = function (Element, x, y) {
    };

    Layout.prototype.Traverse = function (Element, x, y) {
    };

    Layout.prototype.SetFootElementPosition = function () {
    };

    Layout.prototype.SetAllElementPosition = function (Element) {
    };
    return Layout;
})();

var LayoutLandscape = (function (_super) {
    __extends(LayoutLandscape, _super);
    function LayoutLandscape(ViewMap) {
        _super.call(this, ViewMap);
        this.ViewMap = ViewMap;
        this.X_MARGIN = 200;
        this.Y_MARGIN = 100;
    }
    LayoutLandscape.prototype.GetContextIndex = function (Node) {
        var i = 0;
        for (; i < Node.Children.length; i++) {
            if (Node.Children[i].Type == CaseType.Context) {
                return i;
            }
        }
        return -1;
    };

    LayoutLandscape.prototype.Init = function (Element, x, y) {
        this.ViewMap[Element.Label].AbsX += x;
        this.ViewMap[Element.Label].AbsY += y;
    };

    LayoutLandscape.prototype.Traverse = function (Element, x, y) {
        if (Element.Children.length == 0) {
            return;
        }

        var i = this.GetContextIndex(Element);
        if (i != -1) {
            this.ViewMap[Element.Children[i].Label].AbsX += x;
            this.ViewMap[Element.Children[i].Label].AbsY += y;
            this.ViewMap[Element.Children[i].Label].AbsY += this.Y_MARGIN;
            console.log(Element.Label);
            console.log("(" + this.ViewMap[Element.Label].AbsX + ", " + this.ViewMap[Element.Label].AbsY + ")");
            Element.Children = Element.Children.splice(i - 1, 1);
            this.Traverse(Element, this.ViewMap[Element.Label].AbsX, this.ViewMap[Element.Label].AbsY);
        } else {
            if (Element.Children.length % 2 == 1) {
                this.EmitOddNumberChildren(Element, x, y);
            }
            if (Element.Children.length % 2 == 0) {
                this.EmitEvenNumberChildren(Element, x, y);
            }
        }
    };

    LayoutLandscape.prototype.EmitOddNumberChildren = function (Node, x, y) {
        var n = Node.Children.length;
        for (var i = 0; i < n; i++) {
            this.ViewMap[Node.Children[i].Label].AbsX = x;
            this.ViewMap[Node.Children[i].Label].AbsY = y;
            this.ViewMap[Node.Children[i].Label].AbsX += this.X_MARGIN;
        }
        var num = (n - 1) / 2;
        var k;
        for (var j = -num, k = 0; j <= num; j++, k++) {
            this.ViewMap[Node.Children[k].Label].AbsY += this.Y_MARGIN * j;
        }

        for (var i = 0; i < n; i++) {
            console.log(Node.Children[i].Label);
            console.log("(" + this.ViewMap[Node.Children[i].Label].AbsX + ", " + this.ViewMap[Node.Children[i].Label].AbsY + ")");
            this.Traverse(Node.Children[i], this.ViewMap[Node.Children[i].Label].AbsX, this.ViewMap[Node.Children[i].Label].AbsY);
        }
        return;
    };

    LayoutLandscape.prototype.EmitEvenNumberChildren = function (Node, x, y) {
        var n = Node.Children.length;
        var num = n / 2;
        var index = new Array();

        for (var j = -num; j <= num; j++) {
            if (j == 0) {
                continue;
            }
            index.push(j);
        }

        for (var i = 0; i < n; i++) {
            this.ViewMap[Node.Children[i].Label].AbsX += x;
            this.ViewMap[Node.Children[i].Label].AbsY += y;
            this.ViewMap[Node.Children[i].Label].AbsY += this.Y_MARGIN * index[i];
            this.ViewMap[Node.Children[i].Label].AbsX += this.X_MARGIN;
            console.log(Node.Children[i].Label);
            console.log("(" + this.ViewMap[Node.Children[i].Label].AbsX + ", " + this.ViewMap[Node.Children[i].Label].AbsY + ")");
            this.Traverse(Node.Children[i], this.ViewMap[Node.Children[i].Label].AbsX, this.ViewMap[Node.Children[i].Label].AbsY);
        }
        return;
    };
    return LayoutLandscape;
})(Layout);

var LayoutPortrait = (function (_super) {
    __extends(LayoutPortrait, _super);
    function LayoutPortrait(ViewMap) {
        _super.call(this, ViewMap);
        this.ViewMap = ViewMap;
        this.X_MARGIN = 200;
        this.Y_MARGIN = 160;
        this.X_CONTEXT_MARGIN = 30;
        this.footelement = new Array();
    }
    LayoutPortrait.prototype.SetAllElementPosition = function (Element) {
        if (Element.Children.length == 0) {
            return;
        }

        for (var i in Element.Children) {
            this.SetAllElementPosition(Element.Children[i]);
        }

        var xPositionSum = 0;
        for (var i in Element.Children) {
            xPositionSum += this.ViewMap[Element.Children[i].Label].AbsX;
        }
        this.ViewMap[Element.Label].AbsX = xPositionSum / Element.Children.length;
        console.log(this.ViewMap[Element.Label].AbsX);
    };

    LayoutPortrait.prototype.SetFootElementPosition = function () {
        for (var i in this.footelement) {
            if (i != 0) {
                console.log("parent label of previous element in footelement= " + this.ViewMap[this.footelement[i - 1]].ParentShape.Source.Label);
                this.ViewMap[this.footelement[i]].AbsX += this.ViewMap[this.footelement[i]].AbsX + this.X_MARGIN;
            }
        }
        return;
    };

    LayoutPortrait.prototype.GetContextIndex = function (Node) {
        var i = 0;
        for (; i < Node.Children.length; i++) {
            if (Node.Children[i].Type == CaseType.Context) {
                return i;
            }
        }
        return -1;
    };

    LayoutPortrait.prototype.Init = function (Element, x, y) {
        this.ViewMap[Element.Label].AbsY += y;
    };

    LayoutPortrait.prototype.Traverse = function (Element, x, y) {
        if (Element.Children.length == 0) {
            this.footelement.push(Element.Label);
            console.log("footelement = " + this.footelement);
            return;
        }

        var i = 0;
        i = this.GetContextIndex(Element);
        if (i != -1) {
            this.ViewMap[Element.Children[i].Label].AbsX += x;
            this.ViewMap[Element.Children[i].Label].AbsY += y;
            this.ViewMap[Element.Children[i].Label].AbsX += this.X_CONTEXT_MARGIN;
            console.log(Element.Label);
            console.log("(" + this.ViewMap[Element.Label].AbsX + ", " + this.ViewMap[Element.Label].AbsY + ")");
            Element.Children = Element.Children.splice(i - 1, 1);
            this.Traverse(Element, this.ViewMap[Element.Label].AbsX, this.ViewMap[Element.Label].AbsY);
        } else {
            this.EmitChildrenElement(Element, x, y);
        }
    };

    LayoutPortrait.prototype.EmitChildrenElement = function (Node, x, y) {
        var n = Node.Children.length;
        for (var i = 0; i < n; i++) {
            this.ViewMap[Node.Children[i].Label].AbsY = y;
            this.ViewMap[Node.Children[i].Label].AbsY += this.Y_MARGIN;
            this.Traverse(Node.Children[i], this.ViewMap[Node.Children[i].Label].AbsX, this.ViewMap[Node.Children[i].Label].AbsY);
        }
        return;
    };
    return LayoutPortrait;
})(Layout);
