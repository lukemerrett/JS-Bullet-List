
// Holds details on a single bullet point
function BulletPointObject(inputBoxId) {
	
	// The client id of the input box this object refers to
	this.inputBoxId = inputBoxId;
}

// Holds details on all the bullet points within a group
function BulletListModel() {

	// Current unique identifier for all bullet points
	// Used to ensure the generated client id is unique for the model
	this.currentUid = -1;

	// Holds all the bullet points in the group
	this.bulletPoints = [];
}

// Add a bullet point to the model.  We add at a specific position by splicing the
// array; this means we can efficiently preserve the ordering of the bullet points
// in the instance that one is inserted above an existing point
BulletListModel.prototype.addBulletPoint = function(position, bulletPointObject) {
    this.bulletPoints.splice(position, 0, bulletPointObject);
};

// Get a bullet point by its index within the array
BulletListModel.prototype.getBulletPointByIndex = function(position) {
	return this.bulletPoints[position];
}

// Get a bullet point's index by the inputBoxId stored on the bullet point object
BulletListModel.prototype.getBulletPointIndexByInputBoxId = function(inputBoxId) {
	var bulletPoint = $.grep(this.bulletPoints, function(value,index){
		return value.inputBoxId == inputBoxId;
	})[0];
	
	return $.inArray(bulletPoint, this.bulletPoints);
}

// Reove a bullet point from the array. This is done with a splice and subsequentially
// preserves the indexing and ordering of the points
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
	var upArrowKeyCode = 38;
	var downArrowKeyCode = 40;
	
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
		setFocusOnSpecificBulletPoint(bulletPoint);
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
					"<input type='text' id='"+inputBoxId+"'></input>"+
				"</li>";
	}
	
	function addKeyEventHandlersToBulletPoints(idPrefix) {
		$('#'+idPrefix+" ul").on("keyup", "li input", function(event){
				if (event.which == enterKeyCode) {
					handleEnterKeyOnBulletPoint(idPrefix, this.id);
				}
				if (event.which == backspaceKeyCode) {
					handleBackspaceKeyOnBulletPoint(idPrefix, this.id);
				}
				if (event.which == upArrowKeyCode) {
					navigateBetweenBulletPoints(idPrefix, this.id, -1);
				}
				if (event.which == downArrowKeyCode) {
					navigateBetweenBulletPoints(idPrefix, this.id, 1);
				}
			});
	}
	
	// Adds a new bullet point under the existing bullet point when pressing enter
	function handleEnterKeyOnBulletPoint(idPrefix, inputBoxId) {
		var currentListItem = $('#'+inputBoxId).parent();
		
		var bulletPointIndex = bulletListModels[idPrefix].getBulletPointIndexByInputBoxId(inputBoxId);
		var newIndex = bulletPointIndex + 1;
		
		currentListItem.after(newBulletPointHtml(idPrefix, newIndex));
		
		var bulletPointToSwitchTo = bulletListModels[idPrefix].getBulletPointByIndex(newIndex);
		
		setFocusOnSpecificBulletPoint(bulletPointToSwitchTo);
	}
	
	// Deletes the current bullet point if backspace is pressed when there is no text left in the bullet point
	function handleBackspaceKeyOnBulletPoint(idPrefix, inputBoxId) {
		var inputBoxTextLength = $('#'+inputBoxId).val().length;
		
		if (inputBoxTextLength == 0) {
			var currentListItem = $('#'+inputBoxId).parent();
			currentListItem.remove();
			
			var bulletPointIndex = bulletListModels[idPrefix].getBulletPointIndexByInputBoxId(inputBoxId);

			var bulletPointToSwitchTo = bulletListModels[idPrefix].getBulletPointByIndex(bulletPointIndex - 1);
			
			setFocusOnSpecificBulletPoint(bulletPointToSwitchTo);
			
			bulletListModels[idPrefix].removeBulletPoint(bulletPointIndex);
		};
	}
	
	function navigateBetweenBulletPoints(idPrefix, inputBoxId, increment) {
		var bulletPointIndex = bulletListModels[idPrefix].getBulletPointIndexByInputBoxId(inputBoxId);
		var bulletPointToSwitchTo = bulletListModels[idPrefix].getBulletPointByIndex(bulletPointIndex + increment);
		
		// Bullet point doesn't necessarily exist above or below the current point
		if (bulletPointToSwitchTo != null) {
			setFocusOnSpecificBulletPoint(bulletPointToSwitchTo);
		}
	}
	
	function setFocusOnSpecificBulletPoint(bulletPoint) {
		$('#'+bulletPoint.inputBoxId).focus();
	}
	
	return bulletList;
}(jQuery);

