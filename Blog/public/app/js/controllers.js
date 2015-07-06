angular.module('F1FeederApp.controllers', []).
controller('driversController', function($scope, ergastAPIservice) {


var Arr = [];


ergastAPIservice.getDrivers().success(function(res){
      //alert("loaded");
      $scope.driversList = res;
      $scope.filter = "";
      $scope.search = function(driver)
      {
        var keyword = new RegExp($scope.filter, 'i');
        return !$scope.filter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
      };

//$scope.m = 1;

   $scope.$watch('filter', function() {
       
   });



$scope.clickWalaFunction = function() {
    console.log("button clicked");
    var test = [];
for(var i in $scope.driversList)
{

  test.push($scope.driversList[i].Driver.givenName);

}
    ergastAPIservice.post(test);

console.log(test);
  };

    });



})


.controller('driverController', function($scope, ergastAPIservice, $routeParams) {

  $scope.id = $routeParams.id;

ergastAPIservice.getDriver($scope.id).success(function(res){

      $scope.driver = res;
      

     
     });

})

.controller('loginController', function($scope, ergastAPIservice, $location, $rootScope ) {
            $rootScope.location = $location.path();

      $scope.login = function() {

ergastAPIservice.login($scope.text, $scope.pass).success(function(res){


     console.log("res" + " ",res);
      if(res.success){

        console.log('success');
        $location.path("/account");

        $rootScope.username = $scope.text;

      }
        else
        { 

            console.log('unsuccessful1');
            $location.path("/login");

        }
         //console.log($scope.text);
         //console.log($scope.pass);

        });
      }
    })



.controller('registerController', function($scope, ergastAPIservice, $location, $rootScope) {
          $rootScope.location = $location.path();

      $scope.register = function() {
ergastAPIservice.register($scope.user, $scope.email, $scope.pass).success(function(res){

      
         console.log($scope.user);
         console.log($scope.email);
         console.log($scope.pass);
         console.log("res" + " ",res);
      if(res.success){


        console.log('success');
        $location.path("/login");

      }
        else
        { 

            console.log('unsuccessful2');
            //$location.path("/login");

        }


        });
      }
    })



.controller('blogController', function($scope, $location, ergastAPIservice, $location, $rootScope) {
$rootScope.location = $location.path();
console.log("hi");
$scope.entry = function()
{


ergastAPIservice.blog($scope.title, $scope.content).success(function(res){

       
         
         console.log("res" + " ",res);
      if(res.success){


        console.log('success');
        $location.path("/blogSite");

      }
        else
        { 

            console.log('unsuccessful3');
            //$location.path("/login");

        }
         //console.log($scope.text);
         //console.log($scope.pass);

        });
      }
})


.controller('blogSiteController', function($scope, $location, ergastAPIservice, $rootScope )
{
          $rootScope.location = $location.path();

ergastAPIservice.getBlogSite().success(function(res){
      //alert("loaded");

           $scope.allblogs = res;
      console.log('blog aa blog' + " ", $scope.allblogs);
      //$scope.blog = res;
      
     


})

})



.controller('blogDetailController', function($scope, ergastAPIservice, $location, $routeParams, $rootScope) {
          $rootScope.location = $location.path();

  $scope.id = $routeParams.id;
  $scope.user = $routeParams.user;

//ergastAPIservice.getBlogDetail($scope.blog.title, $scope.blog.content).success(function(res){
    console.log($scope.id);
    console.log($scope.user);

ergastAPIservice.getBlogDetail($scope.user,$scope.id).success(function(res){

    console.log("res" + " ",res);
    $scope.blog = res;
      if(res.success){


        console.log('ddddsuccess');
      }

      
     
     });



})

.controller('myBlogSiteController', function($scope, ergastAPIservice, $routeParams , $location, $rootScope)
{
            $rootScope.location = $location.path();


    $scope.user = $routeParams.user;

ergastAPIservice.myBlogSite($scope.user).success(function(res){
      //alert("loaded");

           //$scope.allblogs = res;
      //console.log("reslinggg" + " ",res);
          $scope.blog = res;

      //$scope.blog = res;
      if(res.success)
      {

        console.log("party");
      }

});

});



