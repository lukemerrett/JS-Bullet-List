var JSBulletList = {};

JSBulletList = function($) {
	var bulletList = {};
	
	var bulletListSuffix = "_BulletList";
	var bulletSuffix = "_Bullet_";
	var inputSuffix = "_Input_";
	
	// Adds a new editable bullet point list to a placeholder
	bulletList.setupNewBulletList = function(containingDivId) {
		$('#'+containingDivId).html(newBulletListHtml(containingDivId));
		
		addEnterKeyEventHandlerToBulletPoints(containingDivId);
	}
	
	// Focuses the cursor on the first bullet point in the list
	bulletList.setFocusOnFirstBulletPoint = function(containingDivId) {
		setFocusOnSpecificBulletPoint(containingDivId, 1);
	}
	
	function newBulletListHtml(idPrefix) {		
		return "<ul id='"+idPrefix+bulletListSuffix+"' class='jsBulletList'>"+newBulletPointHtml(idPrefix, 1, "")+"</ul>";
	}
	
	function newBulletPointHtml(idPrefix, bulletPointNumber, currentText) {
		return "<li id='"+idPrefix+bulletSuffix+bulletPointNumber+"'>"+
					"<input type='text' id='"+idPrefix+inputSuffix+bulletPointNumber+"' name='"+bulletPointNumber+"'>"+currentText+"</input>"+
				"</li>";
	}
	
	function addEnterKeyEventHandlerToBulletPoints(idPrefix) {
		$('#'+idPrefix+" ul").on("keyup", "li input", function(event){
				if (event.which == 13) {
					handleEnterKeyOnBulletPoint(this.id);
				}
			});
	}
	
	function handleEnterKeyOnBulletPoint(inputBoxId) {
		var currentListItem = $('#'+inputBoxId).parent();
		var currentNumber = parseInt($('#'+inputBoxId).attr("name"));
		var newNumber = currentNumber + 1
		var idPrefix = currentListItem.parent().parent().attr("id");
		
		currentListItem.append(newBulletPointHtml(idPrefix, newNumber, ""));
		setFocusOnSpecificBulletPoint(idPrefix, newNumber);
	}
	
	function setFocusOnSpecificBulletPoint(idPrefix, bulletPointNumber) {
		$('#'+idPrefix+bulletSuffix+bulletPointNumber+" input").focus();
	}
	
	return bulletList;
}(jQuery);