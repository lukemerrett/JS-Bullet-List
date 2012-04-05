var JSBulletList = {};

JSBulletList = function($) {
	var bulletList = {};
	
	// Adds a new editable bullet point list to a placeholder
	bulletList.setupNewBulletList = function(containingDivId) {
		$('#'+containingDivId).html(newBulletListHtml(containingDivId));
	}
	
	// Focuses the cursor on the first bullet point in the list
	bulletList.setFocusOnFirstBulletPoint = function(containingDivId) {
		$('#'+containingDivId+" ul li:first-child input").focus();
	}
	
	function newBulletListHtml(idPrefix) {		
		return "<ul id='"+idPrefix+"_BulletList' class='jsBulletList'>"+newBulletPointHtml(idPrefix, 1, "")+"</ul>";
	}
	
	function newBulletPointHtml(idPrefix, bulletPointNumber, currentText) {
		return "<li id='"+idPrefix+"_Bullet_"+bulletPointNumber+"'><input type='text'>"+currentText+"</input></li>";
	}
	
	return bulletList;
}(jQuery);