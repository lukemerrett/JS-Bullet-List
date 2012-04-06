
// Holds details on a single bullet point
function BulletPointObject(inputBoxId) {
	
	// The client id of the input box this object refers to
	this.inputBoxId = inputBoxId;
}

// Holds details on all the bullet points within a group
function BulletListModel() {

	// Current unique identifier for all bullet points
	this.currentUid = -1;

	// Holds all the bullet points in the group
	this.bulletPoints = [];
}

BulletListModel.prototype.addBulletPoint = function(position, bulletPointObject) {
	// Add at a specific index to preserve ordering
    this.bulletPoints.splice(position, 0, bulletPointObject);
};

BulletListModel.prototype.getBulletPointByIndex = function(position) {
	return this.bulletPoints[position];
}

BulletListModel.prototype.getBulletPointIndexByInputBoxId = function(inputBoxId) {
	var bulletPoint = $.grep(this.bulletPoints, function(value,index){
		return value.inputBoxId == inputBoxId;
	})[0];
	
	return $.inArray(bulletPoint, this.bulletPoints);
}

BulletListModel.prototype.removeBulletPoint = function(position) {
	this.bulletPoints.splice(position, 1);
};

var JSBulletList = {};

JSBulletList = function($) {
	var bulletList = {};
	
	// Holds the models defining the bullet list
	// There may be multiple lists on a page so we must hold them 
	// in an object with the containing div id used as they key
	var bulletListModels = {};
	
	var bulletListSuffix = "_BulletList";
	var bulletSuffix = "_Bullet_";
	var inputSuffix = "_Input_";
	
	var enterKeyCode = 13;
	var backspaceKeyCode = 8;
	
	// Adds a new editable bullet point list to a placeholder
	bulletList.setupNewBulletList = function(containingDivId) {
	
		// Setup the model
		bulletListModels[containingDivId] = new BulletListModel();
	
		// Add the containing html and first bullet point
		$('#'+containingDivId).html(newBulletListHtml(containingDivId));
		
		addKeyEventHandlersToBulletPoints(containingDivId);
	}
	
	// Focuses the cursor on the first bullet point in the list
	bulletList.setFocusOnFirstBulletPoint = function(containingDivId) {
		var bulletPoint = bulletListModels[containingDivId].getBulletPointByIndex(0);
		setFocusOnSpecificBulletPoint(bulletPoint.inputBoxId);
	}
	
	function newBulletListHtml(idPrefix) {		
		return "<ul id='"+idPrefix+bulletListSuffix+"' class='jsBulletList'>"+
					newBulletPointHtml(idPrefix, 0)+
				"</ul>";
	}
	
	function newBulletPointHtml(idPrefix, position) {
	
		bulletListModels[idPrefix].currentUid++;
		
		var bulletPointNumber = bulletListModels[idPrefix].currentUid;
		
		var inputBoxId = idPrefix+inputSuffix+bulletPointNumber;
		
		// Add bullet point to the model
		var newPoint = new BulletPointObject(inputBoxId);
		bulletListModels[idPrefix].addBulletPoint(position, newPoint);
	
		return "<li id='"+idPrefix+bulletSuffix+bulletPointNumber+"'>"+
					"<input type='text' id='"+inputBoxId+"' name='"+bulletPointNumber+"'>"+
					"</input>"+
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
		var idPrefix = currentListItem.parent().parent().attr("id");
		
		var bulletPointIndex = bulletListModels[idPrefix].getBulletPointIndexByInputBoxId(inputBoxId);
		var newIndex = bulletPointIndex + 1;
		
		currentListItem.after(newBulletPointHtml(idPrefix, newIndex));
		
		var bulletPointToSwitchTo = bulletListModels[idPrefix].getBulletPointByIndex(newIndex);
		
		setFocusOnSpecificBulletPoint(bulletPointToSwitchTo.inputBoxId);
	}
	
	// Deletes the current bullet point if backspace is pressed when there is no text left in the bullet point
	function handleBackspaceKeyOnBulletPoint(inputBoxId) {
		var inputBoxTextLength = $('#'+inputBoxId).val().length;
		
		if (inputBoxTextLength == 0) {
			var currentListItem = $('#'+inputBoxId).parent();
			var idPrefix = currentListItem.parent().parent().attr("id");
			currentListItem.remove();
			
			var bulletPointIndex = bulletListModels[idPrefix].getBulletPointIndexByInputBoxId(inputBoxId);

			var bulletPointToSwitchTo = bulletListModels[idPrefix].getBulletPointByIndex(bulletPointIndex - 1);
			
			setFocusOnSpecificBulletPoint(bulletPointToSwitchTo.inputBoxId);
			
			bulletListModels[idPrefix].removeBulletPoint(bulletPointIndex);
		}
	}
	
	function setFocusOnSpecificBulletPoint(inputBoxId) {
		$('#'+inputBoxId).focus();
	}
	
	return bulletList;
}(jQuery);

