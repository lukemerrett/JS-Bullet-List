var JSBulletList = {};

JSBulletList = function($) {
	var bulletList = {};
	
	var bulletListSuffix = "_BulletList";
	var bulletSuffix = "_Bullet_";
	
	// Adds a new editable bullet point list to a placeholder
	bulletList.setupNewBulletList = function(containingDivId) {
		$('#'+containingDivId).html(newBulletListHtml(containingDivId));
	}
	
	// Focuses the cursor on the first bullet point in the list
	bulletList.setFocusOnFirstBulletPoint = function(containingDivId) {
		setFocusOnSpecificBulletPoint(containingDivId, 1);
	}
	
	function newBulletListHtml(idPrefix) {		
		return "<ul id='"+idPrefix+bulletListSuffix+"' class='jsBulletList'>"+newBulletPointHtml(idPrefix, 1, "")+"</ul>";
	}
	
	function newBulletPointHtml(idPrefix, bulletPointNumber, currentText) {
		return "<li id='"+idPrefix+bulletSuffix+bulletPointNumber+"'><input type='text'>"+currentText+"</input></li>";
	}
	
	function setFocusOnSpecificBulletPoint(idPrefix, bulletPointNumber) {
		$('#'+idPrefix+bulletSuffix+bulletPointNumber+" input").focus();
	}
	
	return bulletList;
}(jQuery);