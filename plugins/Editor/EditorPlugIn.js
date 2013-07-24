var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EditorPlugIn = (function (_super) {
    __extends(EditorPlugIn, _super);
    function EditorPlugIn() {
        _super.call(this);
        wideArea();
        $('#editor').css({ display: 'none' });
    }
    EditorPlugIn.prototype.IsEnabled = function (caseViewer, caseModel) {
        return true;
    };

    EditorPlugIn.prototype.Delegate = function (caseViewer, caseModel) {
        return true;
    };

    EditorPlugIn.prototype.Event = function () {
        $('.node').click(function () {
            var p = $(this).position();
            $('#editor').css({ position: 'absolute', top: p.top, left: p.left, display: 'block' }).appendTo($('#layer2'));
            $('#editor').blur(function (e) {
                $(this).css({ display: 'none' });
            });
        });
    };
    return EditorPlugIn;
})(ActionPlugIn);
