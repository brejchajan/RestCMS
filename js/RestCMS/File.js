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

/**
	The class to hold the file info to show and to upload on server.
 */

var File = function(name, position, formData){
	this._name = name;
	this._position = position;
	this._formData = formData;
	this._boxUI = null;
	this.buildBoxUI();
}

File.prototype.getBoxUI = function(){
	return this._boxUI;
}

File.prototype.buildBoxUI = function(){
	var button = document.createElement("span");
	button.setAttribute("draggable", "true");
	var icon = document.createElement("span");
	icon.className = "glyphicon glyphicon-file";
	button.appendChild(icon);
	var a = document.createElement("a");
	a.appendChild(document.createTextNode(this._name));
	button.appendChild(a);
	this._boxUI = button;
}