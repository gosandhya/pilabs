'use strict';


angular.module('F1FeederApp', [
  'F1FeederApp.controllers', 'F1FeederApp.services', 'ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/", {templateUrl: "app/partials/form.html", controller: "loginController"}).
	//when("/register", {templateUrl: "app/partials/form.html", controller: "registerController"}).
	when("/register", {templateUrl: "app/partials/register.html", controller: "registerController"}).
    when("/account", {templateUrl: "app/partials/blog.html", controller: "blogController"}).
	when("/blogSite", {templateUrl: "app/partials/blogSite.html", controller: "blogSiteController"}).
	when("/myBlogSite/:user", {templateUrl: "app/partials/myBlogSite.html", controller: "myBlogSiteController"}).
	//when("/myBlogSite/", {templateUrl: "app/partials/myBlogSite.html", controller: "myBlogSiteController"}).


	when("/blogSite/:user/:id", {templateUrl: "app/partials/blogDetail.html", controller: "blogDetailController"}).


	otherwise({redirectTo: '/drivers'});
}]);
