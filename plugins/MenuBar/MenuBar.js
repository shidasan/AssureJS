var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MenuBarPlugIn = (function (_super) {
    __extends(MenuBarPlugIn, _super);
    function MenuBarPlugIn() {
        _super.apply(this, arguments);
    }
    MenuBarPlugIn.prototype.IsEnabled = function (caseViewer, caseModel) {
        return true;
    };

    MenuBarPlugIn.prototype.Delegate = function (caseViewer, caseModel) {
        $('.node').hover(function () {
            $('#menu').remove();
            var p = $(this).position();
            var j = $('<div id="menu">' + '<a href="#" ><img src="images/icon.png" alt="" /></a>' + '<a href="#" ><img src="images/icon.png" alt="" /></a>' + '<a href="#" ><img src="images/icon.png" alt="" /></a>' + '<a href="#" ><img src="images/icon.png" alt="" /></a>' + '<a href="#" ><img src="images/icon.png" alt="" /></a>' + '<a href="#" ><img src="images/icon.png" alt="" /></a></div>').css({ position: 'absolute', top: p.top + 75, left: p.left - 30, display: 'none' }).appendTo($('#layer2'));
            ($('#menu')).jqDock({
                align: 'bottom',
                size: 48,
                distance: 60,
                labels: 'hoge,fuga,foo,bar',
                duration: 500,
                source: function () {
                    return this.src.replace(/(jpg|gif)$/, 'png');
                }
            });
            $('#menu').css({ display: 'block' }).hover(function () {
            }, function () {
                $(this).remove();
            });
        }, function () {
        });
        return true;
    };
    return MenuBarPlugIn;
})(ActionPlugIn);
