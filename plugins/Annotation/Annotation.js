var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../src/CaseModel.ts" />
/// <reference path="../../src/CaseViewer.ts" />
/// <reference path="../../src/PlugInManager.ts" />
var AnnotationPlugIn = (function (_super) {
    __extends(AnnotationPlugIn, _super);
    function AnnotationPlugIn() {
        _super.apply(this, arguments);
    }
    AnnotationPlugIn.prototype.IsEnabled = function (caseViewer, caseModel) {
        return true;
    };

    AnnotationPlugIn.prototype.Delegate = function (caseViewer, caseModel, element, anno) {
        var a = anno;
        var p = element.position();
        $('<div class="anno">' + '<font size="5" color="gray">' + '<p>@' + a.Name + '</p>' + '</font></div>').css({ position: 'absolute', top: p.top - 20, left: p.left + 80 }).appendTo(element);
    };
    return AnnotationPlugIn;
})(RenderPlugIn);
