/* 
 This is a part of project named RestCMS. It is lightweight, extensible and easy to use
 content management system that stands on the idea that server should serve the
 content and clients should give the form to that content.
 
 Copyright (C) 2014  Jan Brejcha
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or 
 any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


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