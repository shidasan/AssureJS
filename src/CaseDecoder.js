var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
function OutputError(o) {
    console.log("error: " + o);
}

var Parser = (function () {
    function Parser(Case) {
        this.Case = Case;
    }
    Parser.prototype.Parse = function (source, root) {
        return null;
    };
    return Parser;
})();

var JsonParser = (function (_super) {
    __extends(JsonParser, _super);
    function JsonParser() {
        _super.apply(this, arguments);
        this.caseModelMap = {};
    }
    JsonParser.prototype.InitCaseModelMap = function (NodeList) {
        for (var i = 0; i < NodeList.length; i++) {
            this.caseModelMap[NodeList[i]["Label"]] = NodeList[i];
        }
    };

    JsonParser.prototype.ParseChild = function (childLabel, Parent) {
        var caseModelData = this.caseModelMap[childLabel];
        var Type = caseModelData["NodeType"];
        var Statement = caseModelData["Statement"];
        var Children = caseModelData["Children"];
        var Notes = caseModelData["Notes"];
        var Annotations = caseModelData["Annotations"];

        var childCaseModel = new CaseModel(this.Case, Parent, Type, childLabel, Statement);

        for (var i = 0; i < Children.length; i++) {
            this.ParseChild(Children[i], childCaseModel);
        }

        if (Parent == null) {
            return childCaseModel;
        } else {
            return Parent;
        }
    };

    JsonParser.prototype.Parse = function (JsonData) {
        var DCaseName = JsonData["DCaseName"];
        var NodeCount = JsonData["NodeCount"];
        var TopGoalLabel = JsonData["TopGoalLabel"];
        var NodeList = JsonData["NodeList"];

        this.InitCaseModelMap(NodeList);

        var root = this.ParseChild(TopGoalLabel, null);

        return root;
    };
    return JsonParser;
})(Parser);

var ASNParser = (function (_super) {
    __extends(ASNParser, _super);
    function ASNParser() {
        _super.apply(this, arguments);
    }
    ASNParser.prototype.Parse = function (ASNData, root) {
        return null;
    };
    return ASNParser;
})(Parser);

var CaseDecoder = (function () {
    function CaseDecoder() {
    }
    CaseDecoder.prototype.ParseJson = function (Case, JsonData) {
        var jsonParser = new JsonParser(Case);
        var root = jsonParser.Parse(JsonData);
        return root;
    };

    CaseDecoder.prototype.ParseDCaseXML = function (Case, XMLData) {
        return null;
    };

    CaseDecoder.prototype.ParseASN = function (Case, ASNData, root) {
        return null;
    };
    return CaseDecoder;
})();
