/// <reference path="CaseModel.ts" />
/// <reference path="CaseDecoder.ts" />
/// <reference path="../d.ts/jquery.d.ts" />
// <reference path="../d.ts/jQuery.svg.d.ts" />
/* VIEW (MVC) */
var HTMLDoc = (function () {
    function HTMLDoc() {
    }
    HTMLDoc.prototype.Render = function (Viewer, CaseModel) {
        if (this.DocBase != null) {
            var parent = this.DocBase.parent();
            if (parent != null)
                parent.remove(this.DocBase);
        }
        this.DocBase = $('<div>').width(CaseViewer.ElementWidth).css("position", "absolute");
        this.DocBase.append($('<h4>' + CaseModel.Label + '</h4>'));
        this.DocBase.append($('<p>' + CaseModel.Statement + '</p>'));
        this.InvokePlugInRender(Viewer, CaseModel, this.DocBase);

        // set height
        this.Width = this.DocBase.width();
        this.Height = this.DocBase.height();
    };

    HTMLDoc.prototype.InvokePlugInRender = function (CaseViewer, CaseModel, DocBase) {
        for (var anno in CaseModel.Annotations) {
            var f = CaseViewer.GetPlugInRender(anno.Name);
            DocBase.append(f(CaseViewer, CaseModel, anno));
        }
        for (var note in CaseModel.Notes) {
            var f = CaseViewer.GetPlugInRender(note.Name);
            DocBase.append(f(CaseViewer, CaseModel, note));
        }
    };

    HTMLDoc.prototype.Resize = function (Viewer, Source) {
        this.Width = this.DocBase ? this.DocBase.width() : 0;
        this.Height = this.DocBase ? this.DocBase.height() : 0;
    };
    return HTMLDoc;
})();

var SVGShape = (function () {
    function SVGShape() {
    }
    SVGShape.prototype.Resize = function (CaseViewer, CaseModel, HTMLDoc) {
        this.Width = HTMLDoc.Width;
        this.Height = HTMLDoc.Height;
    };
    return SVGShape;
})();

document.createSVGElement = function (name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
};

var ElementShape = (function () {
    function ElementShape(CaseViewer, CaseModel) {
        this.AbsX = 0;
        this.AbsY = 0;
        this.x = 0;
        this.y = 0;
        this.CaseViewer = CaseViewer;
        this.Source = CaseModel;
        this.HTMLDoc = new HTMLDoc();
        this.HTMLDoc.Render(CaseViewer, CaseModel);
        this.SVGShape = new SVGShape();
    }
    ElementShape.prototype.Resize = function () {
        this.HTMLDoc.Resize(this.CaseViewer, this.Source);
        this.SVGShape.Resize(this.CaseViewer, this.Source, this.HTMLDoc);
    };

    ElementShape.prototype.AppendHTMLElement = function (svgroot, divroot) {
        var content = this.HTMLDoc.DocBase;
        divroot.append(content);
        content.css({ top: this.AbsY + "px", left: this.AbsX + "px" });
        this.Resize();

        // TODO
        // if it has an parent, add an arrow element.
        //svg.rect(parent, this.AbsX, this.AbsY, this.HTMLDoc.Width, this.HTMLDoc.Height);
        var rect = $(document.createSVGElement("rect")).attr({
            fill: "none",
            stroke: "gray",
            x: this.AbsX,
            y: this.AbsY,
            width: this.HTMLDoc.Width,
            height: this.HTMLDoc.Height
        });
        rect.appendTo(svgroot);
        return;
    };
    return ElementShape;
})();

var CaseViewerConfig = (function () {
    function CaseViewerConfig() {
    }
    return CaseViewerConfig;
})();

var ViewerConfig = new CaseViewerConfig();

var CaseViewer = (function () {
    function CaseViewer(Source) {
        this.ViewMap = [];
        Source.ElementMap;
        for (var elementkey in Source.ElementMap) {
            var element = Source.ElementMap[elementkey];
            this.ViewMap[element.Label] = new ElementShape(this, element);
        }
        this.Resize();
    }
    CaseViewer.prototype.GetPlugInRender = function (Name) {
        return null;
    };

    CaseViewer.prototype.Resize = function () {
        for (var shapekey in this.ViewMap) {
            this.ViewMap[shapekey].Resize();
        }
        this.LayoutElement();
    };

    CaseViewer.prototype.LayoutElement = function () {
    };

    CaseViewer.prototype.Draw = function (svg, div) {
        for (var shape in this.ViewMap) {
            this.ViewMap[shape].AppendHTMLElement(svg, div);
        }
    };
    CaseViewer.ElementWidth = 150;
    return CaseViewer;
})();

var ServerApi = (function () {
    function ServerApi(url) {
    }
    ServerApi.prototype.GetCase = function (project, id) {
        return "[]";
    };
    return ServerApi;
})();

function StartCaseViewer(url, id) {
    var loader = new ServerApi(url);
    var project;
    var JsonData = loader.GetCase(project, id);
    var Argument = new Argument();
    var model = new CaseDecoder().ParseJson(Argument, JsonData);
    var CaseViewer = new CaseViewer(model);
    var svg = document.getElementById(id);
    CaseViewer.Draw(svg);
}

$(function () {
    var Case0 = new Case();
    var goal = new CaseModel(Case0, null, CaseType.Goal, null, "Top Goal");
    var str = new CaseModel(Case0, goal, CaseType.Strategy, null, "Strategy");
    var evi = new CaseModel(Case0, str, CaseType.Evidence, null, "Evidence");
    var Viewer = new CaseViewer(Case0);
    var svgroot = $("#svg1");
    var divroot = $("#div1");
    Viewer.Draw(svgroot, divroot);
});
//@ sourceMappingURL=CaseViewer.js.map
