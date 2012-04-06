var JSBulletList = {};

JSBulletList = function($) {
	var bulletList = {};
	
	var bulletListSuffix = "_BulletList";
	var bulletSuffix = "_Bullet_";
	var inputSuffix = "_Input_";
	
	var enterKeyCode = 13;
	var backspaceKeyCode = 8;
	
	// Adds a new editable bullet point list to a placeholder
	bulletList.setupNewBulletList = function(containingDivId) {
		$('#'+containingDivId).html(newBulletListHtml(containingDivId));
		
		addKeyEventHandlersToBulletPoints(containingDivId);
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
	
	function addKeyEventHandlersToBulletPoints(idPrefix) {
		$('#'+idPrefix+" ul").on("keyup", "li input", function(event){
				if (event.which == enterKeyCode) {
					handleEnterKeyOnBulletPoint(this.id);
				}
				if (event.which == backspaceKeyCode) {
					handleBackspaceKeyOnBulletPoint(this.id);
				}
			});
	}
	
	// Adds a new bullet point under the existing bullet point when pressing enter
	function handleEnterKeyOnBulletPoint(inputBoxId) {
		var currentListItem = $('#'+inputBoxId).parent();
		var currentNumber = parseInt($('#'+inputBoxId).attr("name"));
		var newNumber = currentNumber + 1
		var idPrefix = currentListItem.parent().parent().attr("id");
		
		currentListItem.after(newBulletPointHtml(idPrefix, newNumber, ""));
		setFocusOnSpecificBulletPoint(idPrefix, newNumber);
	}
	
	// Deletes the current bullet point if backspace is pressed when there is no text left in the bullet point
	function handleBackspaceKeyOnBulletPoint(inputBoxId) {
		var inputBoxTextLength = $('#'+inputBoxId).val().length;
		
		if (inputBoxTextLength == 0) {
			var currentListItem = $('#'+inputBoxId).parent();
			var currentNumber = parseInt($('#'+inputBoxId).attr("name"));
			var numberToSwitchFocusTo = currentNumber - 1;
			var idPrefix = currentListItem.parent().parent().attr("id");
			
			currentListItem.remove();
			setFocusOnSpecificBulletPoint(idPrefix, numberToSwitchFocusTo);
		}
	}
	
	function setFocusOnSpecificBulletPoint(idPrefix, bulletPointNumber) {
		$('#'+idPrefix+bulletSuffix+bulletPointNumber+" input").focus();
	}
	
	return bulletList;
}(jQuery);