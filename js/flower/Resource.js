/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Resource = function(_errorHandler, _successHandler, _resourceName, _elementID, _baseURL, _dataHeading){
    this.errorHandler = _errorHandler;
    this.successHandler = _successHandler;
    this.resourceName = _resourceName;
    this.elementID = _elementID;
    this.url = _baseURL;
    this.dataHeading = _dataHeading;
    this.filter = null;
    this.order = null;
    this.currentPage = 0;
    this.itemsOnPage = null;
    this.dataPreprocessor = null;
    this.urlBuilder = null;
    this.displayColName = null;
    this.itemIdName = null;
    this.binding = {};
};

Resource.prototype.addFilter = function(filter){
    if (this.filter === null){
        this.filter = {};
    }
    for(var key in filter){
        this.filter[key] = filter[key];
    }
};


Resource.prototype.setDisplayColName = function(name)
{
    this.displayColName = name;
};

Resource.prototype.setItemIdName = function(id){
    this.itemIdName = id;
};


Resource.prototype.setDataPreprocessor = function(prep){
    this.dataPreprocessor = prep;
};

Resource.prototype.setOrder = function(order){
    this.order = order;
    this.listAllResources();
};

Resource.prototype.setCurrentPage = function(currentPage){
    this.currentPage = currentPage;
};

Resource.prototype.setItemsOnPage = function(itemsOnPage){
    this.itemsOnPage = itemsOnPage;
};

Resource.prototype.defaultErrorHandler = function(err){
    alert(err);
};

Resource.prototype.buildXFilter = function(){
    if (this.filter !== null){
        var filter = "";
        var i = 0;
        var count = 0;
        for (key in this.filter){
            count++;
        }
        for (key in this.filter){
            filter += key + "=" + this.filter[key];
            if (i < count - 1){
                filter += ",";
            }
            i++;
        }
        return filter;
    }
    return null;
};

/*
 Resource.prototype.listAllResources = function(){
 if (this.urlBuilder !== null){
 this.url = this.urlBuilder.get();
 }
 jQuery.ajax({
 url: this.url,
 type: "GET",
 accept: "application/json; charset=utf-8",
 beforeSend: (function (XMLHttpRequest) {
 //Specifying this header ensures that the results will be returned as JSON.
 var filter = this.buildXFilter();
 if (filter !== null){
 XMLHttpRequest.setRequestHeader("X-Filter", filter);
 }
 if (this.order !== null){
 XMLHttpRequest.setRequestHeader("X-Order", this.order);
 }
 }).bind(this),
 success: (function(res){
 //TODO preprocess JSON data to exchange destination IDs for destination names
 if (this.dataPreprocessor !== null){
 res = this.dataPreprocessor.process(res);
 }
 var resourcesList = document.getElementById(this.elementID);
 if (resourcesList.firstChild !== null){
 resourcesList.removeChild(resourcesList.firstChild);
 }
 document.getElementById(this.elementID).appendChild(this.airport.buildBootstrapTableFromJSON(this.resourceName, res, this.updateResource.bind(this), this.removeResource.bind(this)));
 this.successHandler();
 }).bind(this),
 error: (function(XMLHttpRequest, textStatus, errorThrown) {
 this.errorHandler("Chyba.\n" + textStatus + " " + errorThrown);
 }).bind(this)
 });
 };
 */

Resource.prototype.getAllResources = function(callback, asynchronous){
    if (asynchronous !== false){
        asynchronous = true;
    }
    if (this.urlBuilder !== null){
        this.url = this.urlBuilder.get();
    }
    jQuery.ajax({
				url: this.url,
				type: "GET",
				accept: "application/json; charset=utf-8",
				async: asynchronous,
				beforeSend: (function (XMLHttpRequest) {
							 //Specifying this header ensures that the results will be returned as JSON.
							 var filter = this.buildXFilter();
							 if (filter !== null){
							 XMLHttpRequest.setRequestHeader("X-Filter", filter);
							 }
							 }).bind(this),
				success: (function(res){
						  callback(res);
						  }).bind(this),
				error: (function(XMLHttpRequest, textStatus, errorThrown) {
						this.errorHandler("Chyba.\n" + textStatus + " " + errorThrown);
						}).bind(this)
				});
};

Resource.prototype.isBound = function(name){
    for (var item in this.binding){
        if (item === name){
            return true;
        }
    }
    return false;
};

Resource.prototype.getResource = function(id, callback, asynchronous){
    if (asynchronous !== false){
        asynchronous = true;
    }
    if (this.urlBuilder !== null){
        this.url = this.urlBuilder.get();
    }
    jQuery.ajax({
				url: this.url + id,
				type: "GET",
				accept: "application/json; charset=utf-8",
				async: asynchronous,
				beforeSend: (function (XMLHttpRequest) {
							 //Specifying this header ensures that the results will be returned as JSON.
							 var filter = this.buildXFilter();
							 if (filter !== null){
							 XMLHttpRequest.setRequestHeader("X-Filter", filter);
							 }
							 }).bind(this),
				success: (function(res){
						  callback(res);
						  }).bind(this),
				error: (function(XMLHttpRequest, textStatus, errorThrown) {
						this.errorHandler("Chyba.\n" + textStatus + " " + errorThrown);
						}).bind(this)
				});
};

Resource.prototype.isBound = function(name){
    for (var item in this.binding){
        if (item === name){
            return true;
        }
    }
    return false;
};


Resource.prototype.updateResource = function(cell, prevCellText, cancelHandler){
    if (this.urlBuilder !== null){
        this.url = this.urlBuilder.put();
    }
    var row = cell.parentNode;
    var obj = row.firstChild.nextSibling;
    var updateData = {};
    for (var i = 0; i < this.dataHeading.length; i++){
        var headingItem = this.dataHeading[i];
        if (this.isBound(headingItem)){
            //get data from select box
            var select = obj.firstChild;
            this.binding[headingItem].getResource(select.value, function(json){
												  updateData[headingItem] = json;
												  }, false);
        }
        else{
            updateData[headingItem] = obj.innerHTML;
        }
        obj = obj.nextSibling;
    }
    if (updateData.dateOfDeparture !== null && updateData.dateOfDeparture !== undefined){
        updateData.dateOfDeparture = this.dateStringToDate(updateData.dateOfDeparture);
    }
    if (this.dataPreprocessor !== null){
        var updateArrayData = new Array();
        updateArrayData.push(updateData);
        updateArrayData = this.dataPreprocessor.processBack(updateArrayData);
        updateData = updateArrayData[0];
    }
	
    var resourceID = row.firstChild.innerHTML;
    var jsonString = JSON.stringify(updateData);
    jQuery.ajax({
				url: this.url + resourceID,
				type: "PUT",
				contentType: "application/json; charset=utf-8",
				data: jsonString,
				success: (function(res){
						  this.successHandler();
						  }).bind(this),
				error: (function(XMLHttpRequest, textStatus, errorThrown) {
						cancelHandler(cell, prevCellText);
						this.errorHandler(textStatus + ": " + errorThrown);
						}).bind(this)
				});
};

Resource.prototype.setUrlBuilder = function(urlBuilder){
    this.urlBuilder = urlBuilder;
};

Resource.prototype.addResource = function(data, callback, asynchronous){
	if (asynchronous !== false){
        asynchronous = true;
    }
    var jsonRequest = JSON.stringify(data);
    if (this.urlBuilder !== null){
        this.url = this.urlBuilder.post();
    }
    jQuery.ajax({
				url: this.url,
				type: "POST",
				contentType: "application/json; charset=utf-8",
				async: asynchronous,
				data: jsonRequest,
				success: (function(res){
						  if (callback != null)
							callback(res);
						  }).bind(this),
				error: (function(XMLHttpRequest, textStatus, errorThrown) {
						this.errorHandler(textStatus + ": " + errorThrown);
						}).bind(this)
				});
};

Resource.prototype.removeResource = function(row){
    if (this.urlBuilder !== null){
        this.url = this.urlBuilder.post();
    }
    jQuery.ajax({
				url: this.url + row.id,
				type: "DELETE",
				contentType: "application/json; charset=utf-8",
				success: (function(res){
						  this.successHandler(this.resourceName + " deleted successfully.");
						  this.listAllResources();
						  }).bind(this),
				error: (function(XMLHttpRequest, textStatus, errorThrown) {
						this.errorHandler("resourceCouldNotBeDeleted");
						}).bind(this)
				});
};

/**
 * Adds new resource binding for nested objects
 * @param {string} name       name of the column in the table
 * @param {Resource} resource   Resource object to be bound with the specified column
 */
Resource.prototype.addBinding = function(name, resource)
{
    this.binding[name] = resource;
    //this.airport.addBinding(name, resource);
};


Resource.prototype.dateStringToDate = function(dateString){
    var a = dateString.split("");
    a[10] = 'T';
    dateString = a.join("");
    return new Date(dateString);
};