/**
	Created by Jan Brejcha 14. 5. 2013.
	this program is licenced under GNU-GPL licence,
	free to use and redistribute
*/

/**
	Generic component constructor
	param tagName - name of the tag this component is assigned to
*/
var Component = function(){};
/**
	Abstract method.
	Component builder function.
*/
Component.prototype.buildComponent = function(){
	alert("ERROR: trying to build abstract component.");
};

/**
	Attaches this component to the tag in html DOM structure.
	Every component must be attached to some html element to be visible.
	@param tagName - name of the tag to attach this component to.
*/
Component.prototype.attachToTag = function(tagName){
	this._parent = document.querySelector(tagName);
	this.buildComponent();
};

/** 
	Attaches this component to the class name in html DOM structure.
	@param className - name of the class to be this component attached to.
*/
Component.prototype.attachToClass = function(className){
	this._parent = document.querySelector("." + className);
	this.buildComponent();
};

/**
	Attaches this component to the DOM element.
	@param element - javascript DOM element
*/
Component.prototype.attachToElement = function(element){
	this._parent = element;
	this.buildComponent();
};
