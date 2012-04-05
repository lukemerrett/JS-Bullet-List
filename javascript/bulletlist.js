var JSBulletList = {};

JSBulletList = function($) {
	var bulletList = {};
	
	bulletList.setupNewBulletList = function(containingDivId) {
		$('#'+containingDivId).html(newBulletListHtml());
	}
	
	function newBulletListHtml() {
		// TODO
	}
	
	return bulletList;
}(jQuery);