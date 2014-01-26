/**
	Created by Jan Brejcha 14. 5. 2013.
	this program is licenced under GNU-GPL licence,
	free to use and redistribute
*/


/**
	Constructor for article component
	@param resource		the resource object to persist the data.
*/
var ArticleComponent = function(componentName){
	this._componentName = componentName;
	//component name prefix to be able to have separate components on different pages created dynamically.
	this.componentNamePrefix = "";
	this._dragElement = null;
	this._movedElements = [];
	this._articleCount = 0;
	this._firstArticle = null;
	this._dragElementContent = null;
	this._addArticleButton = null;
	this._longPressTimer = null;
};

/**
	Extends component object
*/
ArticleComponent.prototype = Object.create(Component.prototype);

ArticleComponent.prototype.loadArticlesCallback = function(data){
	this._articles = [];
	//alert(data);
	var articles = JSON.parse(data);
	for (var key in articles){
		var article = articles[key];
		this.createNewArticle(article);
	}
};

/**
 Resource factory method for articles.
 */
ArticleComponent.prototype.createArticleResource = function(){
	var successHandler = function(){
		//alert("success");
	}
	var errorHandler = function(e){
		if (e.status == 424){
			//if the component was not found
			//install the component
			var component = {name: this.componentNamePrefix + this._componentName};
			this.resource.setUrlBuilder(this._componentUrlBuilder);
			this.resource.addResource(component, (function(){
				this.resource.setUrlBuilder(this._articleUrlBuilder);
				this.resource.getAllResources(this.loadArticlesCallback.bind(this), true);
			}).bind(this), true);
		}
	}
	var resource = new Resource(errorHandler.bind(this), successHandler, this.componentNamePrefix + this._componentName, this.componentNamePrefix + this._componentName, "sampleurl", ["seq", "text"]);
	var templateUrlBuilder = new TemplateUrlBuilder(window.templateVendor, window.templateName);
	this._componentUrlBuilder = new ComponentUrlBuilder(templateUrlBuilder, this.componentNamePrefix + this._componentName);
	this._articleUrlBuilder = new ArticleUrlBuilder(this._componentUrlBuilder);
	resource.setUrlBuilder(this._articleUrlBuilder);
	return resource;
};

/**
	@Override 
	Component builder function.
	Builds this component.
*/
ArticleComponent.prototype.buildComponent = function(){
	this.removeAllArticles();
	//support for dragging children
	this._parent.addEventListener("mousemove", this.drag.bind(this), false);
	
	this._addArticleButton = document.createElement("input");
	this._addArticleButton.type = "button";
	this._addArticleButton.value = _("Add article");
	this._addArticleButton.addEventListener("click", this.createNewArticle.bind(this), false);
	this._parent.appendChild(this._addArticleButton);
	
	//create new resource
	this.resource = this.createArticleResource();
	//load articles from resource
	this.resource.getAllResources(this.loadArticlesCallback.bind(this), true);
};

ArticleComponent.prototype.removeAllArticles = function(){
	if (this._addArticleButton != null){
		this._parent.removeChild(this._addArticleButton);
		this._addArticleButton = null;
	}
	var article = this._firstArticle;
	var nextArticle;
	while (article != null){
		nextArticle = article.nextSibling;
		if (this._parent.children.length > 0){
			this._parent.removeChild(article);
		}
		article = nextArticle;
	}
	this._articleCount = 0;
};

/**
	Creates new article
*/
ArticleComponent.prototype.createNewArticle = function(articleData){
	if (articleData.text != null){
		this.createTextInputComponent(articleData.url, articleData);
	}
	else{
		//persist new article
		var newArticle = {};
		newArticle.text = "";
		newArticle.seq = "AUTO";
		this.resource.addResource(newArticle,
		(function(resourceUrl)
		{
			this.createTextInputComponent(resourceUrl, null);
		}).bind(this), true);
	}
	this._articleCount++;
	
};

ArticleComponent.prototype.createTextInputComponent = function(resourceUrl, articleData){
	//create new resource for particular article
	var articleResource = this.createArticleResource();
	
	var articleTag = document.createElement("article");
	articleTag.style.position = "relative";
	//make article tag draggable
	this.setDraggable(articleTag);
	
	if (this._articleCount == 0){
		this._parent.appendChild(articleTag);
		this._firstArticle = articleTag;
	}
	else{
		this._parent.insertBefore(articleTag, this._firstArticle);
		this._firstArticle = articleTag;
	}
	var articleDiv = document.createElement("div");
	articleDiv.className = "articleDiv";
	this.makeUnselectable(articleDiv);
	articleTag.appendChild(articleDiv);
	var textInput = new TextInputComponent(articleResource, resourceUrl, articleData);
	textInput.attachToElement(articleDiv);
	this._articles.push({article:textInput, tag:articleTag});
	var toolBar = this.buildArticleToolBar(textInput, articleDiv, articleTag);
	this.makeUnselectable(toolBar);
	articleTag.insertBefore(toolBar, articleDiv);
};

ArticleComponent.prototype.setDraggable = function(article){
	article.addEventListener("mousedown", (function(e){this.registerDrag(article);}).bind(this), false);
	article.addEventListener("mouseup", this.unregisterDrag.bind(this), false);
};

ArticleComponent.prototype.registerDrag = function(tag){
	//find first textinput component
	//find article text input component
	for (var key in this._articles){
		var art = this._articles[key];
		if (art.tag == this._firstArticle){
			this._firstSeq = art.article.getSeq();
		}
	}
	this._dragElement = tag
	
	var articleDiv = tag.firstChild.nextSibling;
	var text = _("Drag this article to a new position between articles.");
	if (articleDiv.innerHTML != text){
		this._dragElementContent = articleDiv.innerHTML;
		this._longPressTimer = setTimeout((function(){
			//change the drag element content to the advice what to do when dragging
			articleDiv.innerHTML = text;
		}).bind(this), 200);
	}
};


ArticleComponent.prototype.unregisterDrag = function(tag){
	//eventually stop long press timeout
	clearTimeout(this._longPressTimer);
	this._longPressTimer = null;
	//finish editting DOM
	this._dragElement.style.position = "relative";
	this._dragElement.style.top = "0px";
	this._dragElement.style.left = "0px";
	this.updateComponentDOM();
	this.animateBack(0);
	
	//return the former content of the article
	var articleDiv = this._dragElement.firstChild.nextSibling;
	articleDiv.innerHTML = this._dragElementContent;
	this._dragElementContent = null;
	
	this._dragElement = null;
	
	this.updateSeq();
};

ArticleComponent.prototype.updateSeq = function(){
	var article = this._firstArticle;
	var seq = this._firstSeq;
	while(article != null){
		//find article text input component
		for (var key in this._articles){
			var art = this._articles[key];
			if (art.tag == article){
				//found, update
				art.article.updateResource(seq);
				seq--;
			}
		}
		//update article
		article = article.nextSibling;
	}
}

ArticleComponent.prototype.drag = function(e){
	//if (e.target.className == "articleDiv")
		//document.getSelection().removeAllRanges();
	if (this._dragElement != null && e.target.className == "articleDiv"){
		this._dragElement.style.position = "absolute";
		var pos = this.getMouseXY(e);
		this._dragElement.style.left = (pos.x - this._dragElement.offsetWidth / 2.0) + "px";
		//this._dragElement.style.width = this._dragElement.offsetWidth;
		this._dragElement.style.top = (pos.y  - this._dragElement.offsetHeight / 2.0) + "px";
		this.updateComponentDOM();
	}
};


ArticleComponent.prototype.updateComponentDOM = function(){
	//iterate over all children of this component, sort them according to the y position,
	//then recalculate seq for each article and persist changes on server.
	var article = this._firstArticle;
	var map = [];
	var previousMap = [];
	var i = 0;
	while(article != null){
		map[i] = article;
		previousMap[i] = article;
		//update article
		article = article.nextSibling;
		i++;
	}
	//sort according their y position
	map.sort(this.sortArticles);
	//compare if sort made some change
	var changed = false;
	for (key in map){
		if (map[key] != previousMap[key]){
			changed = true;
			break;
		}
	}
	if (changed == true){
		map.reverse();
		//update component DOM
		//remove all articles from DOM
		for (key in map){
			var art = map[key];
			this._parent.removeChild(art);
		}
		this._articleCount = 0;
		//reinsert all articles back to DOM
		for (key in map){
			var current = map[key];
			if (this._articleCount == 0){
				this._parent.appendChild(current);
			}
			else{
				this._parent.insertBefore(current, this._firstArticle);
			}
			this._firstArticle = map[key];
			this._articleCount++;
		}
		//make animations
		this.animateBack(300, (function(){
			map.reverse();
			var animate = false;
			for (key in map){
				var current = map[key];
				//animate forward
				if (animate || current == this._dragElement){
					animate = true;
					var next = current.nextSibling;
					if (next != null && next != this._dragElement){
						$(next).animate({top: "+=" + 40}, {duration:300, queue:false});
						this._movedElements.push(next);
					}
				}
			}
		}).bind(this));
	}
}

ArticleComponent.prototype.animateBack = function(time, callback){
	//animate back
	var i = 0;
	var run = false;
	if (this._movedElements.length > 0){
		while (this._movedElements.length - 1 > 0){
			var el = this._movedElements.shift();
			$(el).animate({top: "0px"}, {duration:time, queue:false});
		}
		var el = this._movedElements.shift();
		$(el).animate({top: "0px"}, {duration:time, queue:false, complete:callback});
	}
	else{
		if (callback != null && callback != undefined)
			callback();
	}
}

ArticleComponent.prototype.sortArticles = function(a1, a2){
	var a1y = $(a1).position().top;
	var a2y = $(a2).position().top;
	if (a1y < a2y)
		return -1;
	if (a1y > a2y)
		return 1;
	return 0;
}


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