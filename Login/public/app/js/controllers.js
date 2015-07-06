angular.module('F1FeederApp.controllers', []).
controller('driversController', function($scope, ergastAPIservice) {
   /*assigning array ourselves

    $scope.driversList = [ //scope wali cheezein is model
      {
          Driver: {
              givenName: 'Sebastian',
              familyName: 'Vettel'
          },
          points: 322,
          nationality: "German",
          Constructors: [
              {name: "Red Bull"}
          ]
      },
      {
          Driver: {
          givenName: 'Fernando',
              familyName: 'Alonso'
          },
          points: 207,
          nationality: "Spanish",
          Constructors: [
              {name: "Ferrari"}
          ]
      }
    ];
  
    setTimeout(function(){
$scope.driversList.push(
   {
          Driver: {
          givenName: 'Anna',
              familyName: 'Alonso'
          },
          points: 207,
          nationality: "Spanish",
          Constructors: [
              {name: "Ferrari"}
          ]
      }
      );

$scope.$apply();

}, 1000
); */

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



});




