/**
	Creates new TextInputComponent
	@param 	resource	the resource object to persist the data
*/
var TextInputComponent = function(resource, resourceUrl, articleData){
	this._inputUIVisible = false;
	this._resource = resource;
	this._resourceUrl = resourceUrl;
	this._articleData = articleData;
};

TextInputComponent.prototype = new Component();

TextInputComponent.prototype.buildComponent = function(){
	this.buildBold();
	this.buildItalic();
	this.buildUnderline();
	this.buildHeadings();
	this.buildTextarea();
	this.buildDoneButton();

	this._parent.addEventListener("dblclick", this.showInputUI.bind(this), false);
	
	//if brand new article is created (using button), show UI
	//else the article is created from database and the UI should not be present.
	if (this._articleData === null || this._articleData === undefined){
		this.showInputUI();
	}
};

TextInputComponent.prototype.buildBold = function(){
	this._bold = document.createElement("a");
	this._bold.href = "";
	this._bold.title = _("Bold");
	this._bold.className = "deselected";
	this._bold.innerHTML = _("B");
	this._bold.addEventListener("click", this.bold.bind(this), false);
};

TextInputComponent.prototype.buildItalic = function(){
	this._italic = document.createElement("a");
	this._italic.href = "";
	this._italic.title = _("Italic");
	this._italic.className = "deselected";
	this._italic.innerHTML = _("I");
	this._italic.addEventListener("click", this.italic.bind(this), false);
};

TextInputComponent.prototype.buildUnderline = function(){
	this._underline = document.createElement("a");
	this._underline.href = "";
	this._underline.title = _("Underline");
	this._underline.className = "deselected";
	this._underline.innerHTML = _("U");
	this._underline.addEventListener("click", this.underline.bind(this), false);
};

TextInputComponent.prototype.buildHeadings = function(){
	this._headings = document.createElement("select");
	this._headings.name = "headings";
	this._headings.addEventListener("change", this.headings.bind(this), false);

	var normalOption = document.createElement("option");
	normalOption.value = "P";
	normalOption.innerHTML = _("paragraph");
	this._headings.appendChild(normalOption);

	for (var i = 0; i < 6; i++){
		var hOption = document.createElement("option");
		hOption.value = "H" + (i + 1);
		hOption.innerHTML = _("heading " + (i + 1));
		this._headings.appendChild(hOption);
	}
};

TextInputComponent.prototype.buildTextarea = function(){
	this._textarea = document.createElement("div");
	this._textarea.contentEditable = "true";
	this._textarea.id = "flowerTextEditor";
	this._textarea.addEventListener("keyup", this.updateParent.bind(this), false);
	this._textarea.addEventListener("click", this.checkToggleButtons.bind(this), false);
	this._textarea.addEventListener("keyup", this.checkToggleButtons.bind(this), false);
	//fill textarea if data present
	if (this._articleData != null && this._articleData != undefined){
		this._textarea.innerHTML = this._articleData.text;
		this.updateParent();
	}
};

TextInputComponent.prototype.buildDoneButton = function(){
	this._doneButton = document.createElement("input");
	this._doneButton.type = "button";
	this._doneButton.value = _("Done");
	this._doneButton.addEventListener("click", this.doneBtnClicked.bind(this), false);
};

TextInputComponent.prototype.doneBtnClicked = function(){
	//update resource
	var data = {};
	data.text = this._textarea.innerHTML;
	data.seq = "AUTO";
	this._resource.updateResource(data, this._resourceUrl, null, null);
	//manage UI
	this.hideInputUI();
}

TextInputComponent.prototype.hideInputUI = function(){
	if (this._inputUIVisible){
		this._parent.parentNode.removeChild(this._doneButton);
		this._parent.parentNode.removeChild(this._textarea);
		this._parent.parentNode.removeChild(this._headings);
		this._parent.parentNode.removeChild(this._underline);
		this._parent.parentNode.removeChild(this._italic);
		this._parent.parentNode.removeChild(this._bold);
		this._inputUIVisible = false;
	}
};

TextInputComponent.prototype.showInputUI = function(){
	if (!this._inputUIVisible){
		this._parent.parentNode.insertBefore(this._textarea, this._parent.nextSibling);
		this._parent.parentNode.insertBefore(this._doneButton, this._parent.nextSibling.nextSibling);
		this._parent.parentNode.insertBefore(this._headings, this._parent.nextSibling);
		this._parent.parentNode.insertBefore(this._underline, this._parent.nextSibling);
		this._parent.parentNode.insertBefore(this._italic, this._parent.nextSibling);
		this._parent.parentNode.insertBefore(this._bold, this._parent.nextSibling);
		this._inputUIVisible = true;
	}

};

TextInputComponent.prototype.showInputUIEventProxy = function(e){
	e.preventDefault();
	this.showInputUI();
};

TextInputComponent.prototype.hideInputUIEventProxy = function(e){
	e.preventDefault();
	this.hideInputUI();
};

TextInputComponent.prototype.updateParent = function(e){
	this._parent.innerHTML = this._textarea.innerHTML;
};

/**
	text formatting events 
*/


TextInputComponent.prototype.bold = function(e){
	e.preventDefault();
	this.setToggle(this._bold);
	this._textarea.designMode = "On";
	this._textarea.focus();
	document.execCommand("bold", false, null);
	this._textarea.designMode = "Off";
};

TextInputComponent.prototype.italic = function(e){
	e.preventDefault();
	this.setToggle(this._italic);
	this._textarea.designMode = "On";
	this._textarea.focus();
	document.execCommand("italic", false, null);
	this._textarea.designMode = "Off";
};

TextInputComponent.prototype.underline = function(e){
	e.preventDefault();
	this.setToggle(this._underline);
	this._textarea.designMode = "On";
	this._textarea.focus();
	document.execCommand("underline", false, null);
	this._textarea.designMode = "Off";
};

TextInputComponent.prototype.headings = function(e){
	e.preventDefault();
	var value = e.target.value;
	this._textarea.designMode = "On";
	this._textarea.focus();
	document.execCommand("formatBlock", false, value);
	this._textarea.designMode = "Off";	
};

TextInputComponent.prototype.setToggle = function(element){
	if (element.className == "selected"){
		element.className = "deselected";
	}
	else{
		element.className = "selected";
	}
};

TextInputComponent.prototype.checkToggleButtons = function(e){
	var selection = this.getSelection();
	//resolve bold face
	if (selection.anchorNode.parentNode.tagName == "b" || selection.anchorNode.parentNode.tagName == "B"){
		this._bold.className = "selected";
	}
	else{
		this._bold.className = "deselected";
	}

	//resolve italic face
	if (selection.anchorNode.parentNode.tagName == "i" || selection.anchorNode.parentNode.tagName == "I"){
		this._italic.className = "selected";
	}
	else{
		this._italic.className = "deselected";
	}

	//resolve undeline face
	if (selection.anchorNode.parentNode.tagName == "u" || selection.anchorNode.parentNode.tagName == "U"){
		this._underline.className = "selected";
	}
	else{
		this._underline.className = "deselected";
	}

	//resolve headings
	//resolve undeline face
	if (selection.anchorNode.parentNode.tagName[0] == "h" || selection.anchorNode.parentNode.tagName[0] == "H"){
		this._headings.options.selectedIndex = selection.anchorNode.parentNode.tagName[1];
	}
	if (selection.anchorNode.parentNode.tagName == "p" || selection.anchorNode.parentNode.tagName == "P" || selection.anchorNode.parentNode.tagName == "DIV"){
		this._headings.options.selectedIndex = 0;
	}
};

TextInputComponent.prototype.getSelection = function(){
	if (window.getSelection){
		return window.getSelection();
	}
	if (document.selection){
		return document.selection();
	}
	i = 5;
};