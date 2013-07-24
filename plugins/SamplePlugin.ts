/// <reference path="../src/CaseModel.ts" />
/// <reference path="../src/PlugInManager.ts" />

class SamplePlugIn extends ActionPlugIn {
	IsEnabled (caseViewer: CaseViewer, caseModel: CaseModel) : boolean {
		return true;
	}

	Delegate(caseViewer: CaseViewer, caseModel: CaseModel)  : boolean {
		$('<a href="#">hogehoge</a>').appendTo($('body'));
		return true;
	}

	Event() {
		$('.node').hover(function() {
				$('#menu').remove();
				var p = $(this).position();
				var j = $('<div id="menu">' +
					'<a href="#" ><img src="images/icon.png" alt="" /></a>'+
					'<a href="#" ><img src="images/icon.png" alt="" /></a>'+
					'<a href="#" ><img src="images/icon.png" alt="" /></a>'+
					'<a href="#" ><img src="images/icon.png" alt="" /></a>'+
					'<a href="#" ><img src="images/icon.png" alt="" /></a>'+
					'<a href="#" ><img src="images/icon.png" alt="" /></a></div>')
					.css({position: 'absolute', top: p.top + 75, left: p.left - 30, display: 'none'}).appendTo($('#layer2'));
				(<any>$('#menu')).jqDock({
					align: 'bottom',
					size: 48,
					distance: 60,
					labels: 'hoge,fuga,foo,bar',
					duration: 500,
					source: function() { return this.src.replace(/(jpg|gif)$/, 'png'); }
				});
				$('#menu').css({display: 'block'}).hover(function(){}, function(){$(this).remove();});
		},()=> {
//			if(menuFlag) {
//				$('#menu').remove();
//			}
		});
	}
}
