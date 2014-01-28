/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var DataPreprocessor = function(resource) {
    this.data = null;
    resource.getAllResources(this.setData.bind(this));
};

DataPreprocessor.prototype.setData = function(data){
    this.data = data;
};


DataPreprocessor.prototype.find = function(key, value, filterName, json){
    for (objKey in json){
        var obj = json[objKey];
        for (kkey in obj){
            if ((kkey == key) && (value == obj[kkey])){
                return obj[filterName];
            }
        }
    }
    return null;
};


var TemplateUrlBuilder = function(vendor, name){
	this.vendor = vendor;
	this.name = name;
}
TemplateUrlBuilder.prototype.post = function(){
	return "restcms.php/template";
}
TemplateUrlBuilder.prototype.get = function(){
	return "restcms.php/template/" + this.vendor + "/" + this.name;
}
TemplateUrlBuilder.prototype.put = function(){
	return "restcms.php/template/" + this.vendor + "/" + this.name;
}


var ComponentUrlBuilder = function(template, name){
	this.template = template;
	this.name = name;
}

ComponentUrlBuilder.prototype.post = function(){
	return "restcms.php/template/" + this.template.vendor + "/" + this.template.name + "/component";
}
ComponentUrlBuilder.prototype.get = function(){
	return "restcms.php/template/" + this.template.vendor + "/" + this.template.name + "/component" + "/" + this.name;
}
ComponentUrlBuilder.prototype.put = function(){
	return "restcms.php/template/" + this.template.vendor + "/" + this.template.name + "/component" + "/" + this.name;
}

var ArticleUrlBuilder = function(component){
    this.component = component;
};
ArticleUrlBuilder.prototype.post = function(){
	return "restcms.php/template/" + this.component.template.vendor + "/" + this.component.template.name + "/component" + "/" + this.component.name + "/article";
}
ArticleUrlBuilder.prototype.get = function(){
	return "restcms.php/template/" + this.component.template.vendor + "/" + this.component.template.name + "/component" + "/" + this.component.name + "/article";
}
ArticleUrlBuilder.prototype.put = function(){
	return "/article";
}