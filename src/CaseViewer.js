var HTMLDoc = (function () {
    function HTMLDoc() {
    }
    HTMLDoc.prototype.Render = function (Viewer, CaseModel) {
        if (this.DocBase != null) {
            var parent = this.DocBase.parent();
            if (parent != null)
                parent.remove(this.DocBase);
        }
        this.DocBase = $('<div>').width(CaseViewer.ElementWidth);
        this.DocBase.append($('<h4>' + CaseModel.Label + '</h4>'));
        this.DocBase.append($('<p>' + CaseModel.Statement + '</p>'));
        this.InvokePlugInRender(Viewer, CaseModel, this.DocBase);

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

var ElementShape = (function () {
    function ElementShape(CaseViewer, CaseModel) {
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

    ElementShape.prototype.AppendHTMLElement = function (root) {
        var rect = $(document.createElementNS('http://www.w3.org/2000/svg', "rect")).attr({
            fill: "none",
            stroke: "gray",
            x: this.AbsX,
            y: this.AbsY,
            width: this.HTMLDoc.Width,
            height: this.HTMLDoc.Height
        });
        rect.appendTo(root);
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
        for (var model in Source) {
            this.ViewMap[model.Label] = new ElementShape(this, model);
        }
        this.Resize();
    }
    CaseViewer.prototype.GetPlugInRender = function (Name) {
        return null;
    };

    CaseViewer.prototype.Resize = function () {
        for (var shape in this.ViewMap) {
            this.ViewMap[shape].Resize();
        }
        this.LayoutElement();
    };

    CaseViewer.prototype.LayoutElement = function () {
    };

    CaseViewer.prototype.Draw = function (svg) {
        for (var shape in this.ViewMap) {
            this.ViewMap[shape].AppendHTMLElement(svg);
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
    var model = new CaseModel(new Case(), null, CaseType.Goal, "G0", "Top Goal");
    var Viewer = new CaseViewer(model);
    var root = $("#svgroot");
    Viewer.Draw(root);
});
