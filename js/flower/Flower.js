/**
	Created by Jan Brejcha 14. 5. 2013.
	this program is licenced under GNU-GPL licence,
	free to use and redistribute
*/
/**
	Flower system constructor.
	Registers onLoad event listener to start the Flower system
	@param callback - user callback function that initializes components on the page
*/
var Flower = function(callback, templateVendor, templateName, defaultLanguage){
	window.templateName = templateName;
	window.templateVendor = templateVendor;
	addEventListener("load", callback, false);
	Flower.initLanguages();
	Flower.setDefaultLanguage(defaultLanguage);
};

/**
	proxy for translate method
*/
_ = function(text){
	return Flower.translate(text);
};
/**
	Translates from english to default language
	@param text - text to be translated.
*/
Flower.translate = function(text){
	for (i = 0; i < this._translations.length; i++){
		if (this._translations[i][0] == text){
			return this._translations[i][this._defaultLanguage];
		}
	}
	//if nothing was found return original text
	return text;
};

/**
	sets default language
	@param language - abbreviation of the desired language
*/
Flower.setDefaultLanguage = function(language){
	//set default language to english if the desired language is not found
	this._defaultLanguage = 0;
	//set default language according to the language parameter
	var langSet = false;
	for(i = 0; i < this._languages.length; i++){
		if (this._languages[i] == language){
			this._defaultLanguage = i;
			langSet = true;
		}
	}
	if (!langSet){
		alert("The chosen language is not available. Due to this problem english was chosen.");
	}
};

Flower.initLanguages = function(){
	this._languages = ["en", "cz"];
	this._translations = [];
	new Translation();
};

Flower.addTranslation = function(translationArray){
	if (translationArray.length != this._languages.length){
		alert("ERROR: translation for word " + translationArray[0] + " contains different number of languages than is available.");
		return;
	}
	this._translations[this._translations.length] = translationArray;
};