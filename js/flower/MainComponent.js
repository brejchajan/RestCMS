/**
 Created by Jan Brejcha 23. 1. 2014.
 this program is licenced under GNU-GPL licence,
 free to use and redistribute
 */


/**
 Constructor for main component
 @param resource		the resource object to persist the data.
 */
var MainComponent = function(){
	this._componentName = "main";
	this._pages = [];
	this._currentPageId = null;
	this._pageComponents = [];
};

/**
 Extends component object
 */
MainComponent.prototype = Object.create(Component.prototype);

/**
 Adds page to the main component
 @param pageId	the ID of the element that contains the page HTML
 */
MainComponent.prototype.addPage = function(pageId){
	var pageElement = document.getElementById(pageId);
	this._pages[pageId] = {parent: pageElement.parentNode, page:pageElement};
	//alert(this._pages[pageId]);
};

MainComponent.prototype.setCurrentPage = function(pageId){
	this._currentPageId = pageId;
	this.buildComponent();
};

/**
 Registers component that will load specific data on each page separately
 */
MainComponent.prototype.registerPageComponent = function(component){
	this._pageComponents.push(component);
}

MainComponent.prototype.buildComponent = function(){
	//remove contents the components
	for (var key in this._pageComponents){
		var component = this._pageComponents[key];
		component.removeAllArticles();
	}
	//find the current page
	//hide all other pages
	for (var key in this._pages){
		var page = this._pages[key].page;
		var parent = this._pages[key].parent;
		if (page.id == this._currentPageId){
			//append the page to the DOM
			parent.appendChild(page);
		}
		else{
			//remove the page from DOM
			parent.removeChild(page);
		}
	}
	//reattach components
	for (var key in this._pageComponents){
		var component = this._pageComponents[key];
		component.reattachToClass();
	}
	
};