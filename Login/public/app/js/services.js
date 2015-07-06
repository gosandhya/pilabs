
angular.module('F1FeederApp.services', []).
  factory('ergastAPIservice', function($http) {

    var ergastAPI = {};

    ergastAPI.getDrivers = function() {
      return $http({
        method: 'GET', 
        url: 'http://datastore.asadmemon.com/f1ranking'
      });
    }



ergastAPI.post = function(res) {

  var req = {
 method: 'POST',
 url: 'http://datastore.asadmemon.com/f1rankingPost',

 data: res
}

$http(req);
}

  ergastAPI.getDriver = function(id) {
      return $http({
        method: 'GET', 
        url: 'http://datastore.asadmemon.com/f1ranking/'+id
      });
    }
    return ergastAPI;

  });