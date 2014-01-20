/**
	Created by Jan Brejcha 14. 5. 2013.
	this program is licenced under GNU-GPL licence,
	free to use and redistribute
*/


/**
	Constructor for article component
*/
var ArticleComponent = function(){};

/**
	Extends component object
*/
ArticleComponent.prototype = Object.create(Component.prototype);

/**
	@Override 
	Component builder function.
	Builds this component.
*/
ArticleComponent.prototype.buildComponent = function(){
	this._addArticleButton = document.createElement("input");
	this._addArticleButton.type = "button";
	this._addArticleButton.value = _("Add article");
	this._addArticleButton.addEventListener("click", this.createNewArticle.bind(this), false);
	this._parent.appendChild(this._addArticleButton);
};

/**
	Creates new article
*/
ArticleComponent.prototype.createNewArticle = function(){
	var articleTag = document.createElement("article");
	this._parent.appendChild(articleTag);
	var articleDiv = document.createElement("div");
	articleDiv.className = "articleDiv";
	articleTag.appendChild(articleDiv);
	var textInput = new TextInputComponent();
	textInput.attachToElement(articleDiv);
	var toolBar = this.buildArticleToolBar(textInput, articleDiv, articleTag);
	articleTag.insertBefore(toolBar, articleDiv);
};

/**	
	Builds article tool bar
	used for tools like B I U, etc.
	@param textInput - textInputComponent
	@param articleDiv - element that stores the article
*/
ArticleComponent.prototype.buildArticleToolBar = function(textInput, articleDiv, articleTag){
	var toolBar = document.createElement("div");
	toolBar.className = "articleToolBar";

	var toolBarEditBox = document.createElement("span");
	toolBarEditBox.className = "articleToolBarEditBox";
	var toolBarEditLink = document.createElement("a");
	toolBarEditLink.href = "";
	toolBarEditLink.innerHTML = _("Edit");
	toolBarEditLink.addEventListener("click", textInput.showInputUIEventProxy.bind(textInput), false);
	toolBarEditBox.appendChild(toolBarEditLink);

	var toolBarDeleteBox = document.createElement("span");
	toolBarDeleteBox.className = "articleToolBarDeleteBox";
	var toolBarDeleteLink = document.createElement("a");
	toolBarDeleteLink.href = "";
	toolBarDeleteLink.innerHTML = _("Delete");
	toolBarDeleteLink.addEventListener("click", function(e){
		e.preventDefault();
		textInput.hideInputUI();
		articleTag.removeChild(articleDiv);
		articleTag.removeChild(toolBar);
	}.bind(this), false);
	toolBarDeleteBox.appendChild(toolBarDeleteLink);

	toolBar.appendChild(toolBarEditBox);
	toolBar.appendChild(toolBarDeleteBox);
	return toolBar;
};