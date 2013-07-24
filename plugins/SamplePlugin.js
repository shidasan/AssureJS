var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../src/CaseModel.ts" />
/// <reference path="../src/PlugInManager.ts" />
var SamplePlugIn = (function (_super) {
    __extends(SamplePlugIn, _super);
    function SamplePlugIn() {
        _super.apply(this, arguments);
    }
    SamplePlugIn.prototype.IsEnabled = function (caseViewer, caseModel) {
        return true;
    };

    SamplePlugIn.prototype.Delegate = function (caseViewer, caseModel) {
        $('<a href="#">hogehoge</a>').appendTo($('body'));
        return true;
    };

    SamplePlugIn.prototype.Event = function () {
        var _this = this;
        $('.node').hover(function () {
            _this.Delegate(null, null);
        }, function () {
            console.log("out");
        });
    };
    return SamplePlugIn;
})(ActionPlugIn);
//@ sourceMappingURL=SamplePlugin.js.map
