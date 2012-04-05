var JSBulletList = {};

JSBulletList = function($) {
	var bulletList = {};
	
	bulletList.setupNewBulletList = function(containingDivId) {
		$('#'+containingDivId).html(newBulletListHtml());
	}
	
	function newBulletListHtml() {
		var html = "<ul class='jsBulletList'><li><input type='text'></input></li></ul>";
		
		return html;
	}
	
	return bulletList;
}(jQuery);