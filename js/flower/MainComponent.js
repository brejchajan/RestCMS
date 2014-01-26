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
	
	
	//init functions
	this.registerHashEventListeners();
};

/**
 Extends component object
 */
MainComponent.prototype = Object.create(Component.prototype);


MainComponent.prototype.registerHashEventListeners = function(){
	var links = document.querySelectorAll("a[href^='#']");
	for (var i = 0; i < links.length; i++){
		var link = links[i];
		link.addEventListener('click', this.hashLinkClicked.bind(this), true);
	}
}

MainComponent.prototype.hashLinkClicked = function(e){
	var pageId = e.target.getAttribute('data-use-template');
	if (pageId != null){
		e.preventDefault();
		window.location = e.target.href;
		this.setCurrentPage(pageId);
	}
}

/**
 Adds page to the main component
 @param pageId	the ID of the element that contains the page HTML
 */
MainComponent.prototype.addPage = function(pageId){
	var pageElement = document.getElementById(pageId);
	this._pages[pageId] = {parent: pageElement.parentNode, page:pageElement};
	//alert(this._pages[pageId]);
};

MainComponent.prototype.setIndexPage = function(templatePageId, pageHref){
	window.location.href = (window.location.href.split("#"))[0] + "#" + pageHref;
	this._currentPageId = templatePageId;
	this.buildComponent();
}

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
	var prefix = (window.location.hash.split("#"))[1];
	if (prefix == null || prefix == undefined){
		window.location.href = window.location.href + "#" + this._currentPageId;
	}
	/*if (prefix != this._currentPageId){
		this.setCurrentPage(prefix);
		return;
	}*/
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
			if ($(parent).children("#" + page.id).length > 0){
				parent.removeChild(page);
			}
		}
	}
	//reattach components
	for (var key in this._pageComponents){
		var component = this._pageComponents[key];
		//TODO uncomment this line and implement automatic installation to component.
		component.componentNamePrefix = prefix;
		component.reattachToClass();
	}
	
};