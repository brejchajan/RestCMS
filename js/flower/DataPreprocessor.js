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


var ReservationUrlBuilder = function(){
    this.flightID = null;
    this.reservationID = null;
};

ReservationUrlBuilder.prototype.setFlightID = function(flightID){
    this.flightID = flightID;
};


ReservationUrlBuilder.prototype.setReservationID = function(flightID){
    this.reservationID = flightID;
};

ReservationUrlBuilder.prototype.post = function(){
    return "http://localhost:8080/aos-airport/reservation";
};

ReservationUrlBuilder.prototype.get = function(){
    return "http://localhost:8080/aos-airport/reservation";
};

ReservationUrlBuilder.prototype.put = function(){
    return "http://localhost:8080/aos-airport/reservation/";
};