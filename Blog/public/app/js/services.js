
angular.module('F1FeederApp.services', []).
  factory('ergastAPIservice', function($http) {

    var ergastAPI = {};

    ergastAPI.getDrivers = function() {
      return $http({
        method: 'GET', 
        url: 'http://datastore.asadmemon.com/f1ranking'
      });
    }


/*ergastAPI.getBlogSite = function() {
      return $http({
        method: 'GET', 
        url: '/blogSite'
      });
    }*/




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



ergastAPI.login = function(user,pass) {
      var req = {
 method: 'POST',
 url: '/login',

 data:{username:user, password:pass}
}
return $http(req);

}



ergastAPI.register = function(user,email,pass) {
      var req = {
 method: 'POST',
 url: '/',

 data:{username:user, email:email, password:pass}
}
return $http(req);

}


ergastAPI.blog = function(title,content) {
      var req = {
 method: 'POST',
 url: '/register',

 data:{title:title, content:content}
}
return $http(req);

}



 ergastAPI.getBlogSite = function() {
      return $http({
        method: 'GET', 
        url: '/blogSite'
      });
    }



 ergastAPI.myBlogSite = function(user) {
     /* return $http({
        method: 'GET', 
        url: '/myBlogSite'
      });*/
 var req = {
 method: 'POST',
 url: '/myBlogSite',
 data:{user:user}

    }

    return $http(req);

  }


 ergastAPI.getBlogDetail = function(user, id) {
   
     var req = {
 method: 'POST',
 url: '/blogSite',
 data:{user:user, id:id}

}
return $http(req);

}


    return ergastAPI;

  });

