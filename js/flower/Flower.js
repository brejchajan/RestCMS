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
	addEventListener("load", Flower.initPage.bind(this), false);
	Flower.initLanguages();
	Flower.setDefaultLanguage(defaultLanguage);
	window.permission = null;
	window.state = null;
	this._mainComponent = null;
};

Flower.initPage = function(){
	$('#gDisconnect').click(Flower.logout.bind(this));
	$('#gDisconnect').hide();
}

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

Flower.onSignInCallback = function(authResult){
	if (authResult['access_token']) {
        // The user is signed in
        this._authResult = authResult;
        Flower.connectServer();
	} else if (authResult['error']) {
        // There was an error, which means the user is not signed in.
        // As an example, you can troubleshoot by writing to the console:
        console.log('There was an error: ' + authResult['error']);
        $('#authResult').append('Logged out');
        $('#authOps').hide('slow');
        $('#gConnect').show();
	}
}

Flower.connectServer = function(){
	$.ajax({
		   type: 'GET',
		   url: 'http://' + window.location.host + '/restcms.php/connect',
		   contentType: 'application/octet-stream; charset=utf-8',
		   success: (function(result) {
				var res = JSON.parse(result);
				$.ajax({
					  type: 'POST',
					  url: 'http://' + window.location.host + '/restcms.php/connect?state='+res.state,
					  contentType: 'application/octet-stream; charset=utf-8',
					  success: function(result) {
							var res = JSON.parse(result);
							Flower.doLogin(res);
					  },
					  processData: false,
					  data: this._authResult.code
				});
		   }).bind(this)
	});
}

Flower.doLogin = function(response){
	window.state = response.state;
	alert(window.state);
	this._mainComponent.onLogin(response);
	$('#gConnect').hide('slow');
	$('#gDisconnect').show('slow');
}

Flower.doLogout = function(){
	$('#gConnect').show('slow');
	$('#gDisconnect').hide('slow');
	
	this._mainComponent.onLogout();
}

Flower.logout = function(){
	$.ajax({
		   type: 'DELETE',
		   url: 'http://' + window.location.host + '/restcms.php/connect?state='+window.state,
		   contentType: 'application/octet-stream; charset=utf-8',
		   success: function(result) {
				Flower.doLogout();
		   }
	});
}

/**
 Registers main component to handle login/logout or other system events
 */
Flower.setMainComponent = function(mainComponent){
	this._mainComponent = mainComponent;
}