var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PlugIn = (function () {
    function PlugIn() {
    }
    return PlugIn;
})();

var ActionPlugIn = (function (_super) {
    __extends(ActionPlugIn, _super);
    function ActionPlugIn() {
        _super.apply(this, arguments);
    }
    ActionPlugIn.prototype.IsEnabled = function (caseViewer, case0) {
        return true;
    };

    ActionPlugIn.prototype.Delegate = function (caseViewer, case0, serverApi) {
        return true;
    };
    return ActionPlugIn;
})(PlugIn);

var CheckerPlugIn = (function (_super) {
    __extends(CheckerPlugIn, _super);
    function CheckerPlugIn() {
        _super.apply(this, arguments);
    }
    CheckerPlugIn.prototype.IsEnabled = function (caseModel, EventType) {
        return true;
    };

    CheckerPlugIn.prototype.Delegate = function (caseModel, y, z) {
        return true;
    };
    return CheckerPlugIn;
})(PlugIn);

var RenderPlugIn = (function (_super) {
    __extends(RenderPlugIn, _super);
    function RenderPlugIn() {
        _super.apply(this, arguments);
    }
    RenderPlugIn.prototype.IsEnabled = function (caseViewer, caseModel) {
        return true;
    };

    RenderPlugIn.prototype.Delegate = function (caseViewer, caseModel, element) {
    };
    return RenderPlugIn;
})(PlugIn);

var PlugInManager = (function () {
    function PlugInManager() {
        this.ActionPlugIns = [];
        this.DefaultCheckerPlugIns = [];
        this.CheckerPlugInMap = {};
        this.DefaultRenderPlugIns = [];
        this.RenderPlugInMap = {};
    }
    PlugInManager.prototype.AddActionPlugIn = function (key, actionPlugIn) {
        this.ActionPlugIns.push(actionPlugIn);
    };

    PlugInManager.prototype.RegisterActionEventListeners = function (CaseViewer, case0, serverApi) {
        for (var i = 0; i < this.ActionPlugIns.length; i++) {
            if (this.ActionPlugIns[i].IsEnabled(CaseViewer, case0)) {
                this.ActionPlugIns[i].Delegate(CaseViewer, case0, serverApi);
            }
        }
    };

    PlugInManager.prototype.AddRenderPlugIn = function (key, renderPlugIn) {
        this.RenderPlugInMap[key] = renderPlugIn;
    };
    return PlugInManager;
})();
