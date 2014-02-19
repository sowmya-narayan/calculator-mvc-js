var app = angular.module("calculatorApplication", []).config(function ($routeProvider) {

    $routeProvider.when("/", {
        templateUrl: "app/view/page.html",
        controller: "PageController"
    });


})
.directive('displayPanel', function(){
  return {
    restrict: 'A',
    templateUrl: "app/view/templates/displaypanel.html",
  }
})
.directive('btn', function(){
  return{
    restrict: 'E',
    scope: true,
    templateUrl: "app/view/templates/button.html",
  }
})
.directive('calc', function(){
  return{
    restrict: 'AE',
    scope: {},
    templateUrl: 'app/view/templates/calc.html',
    controller: 'CalculatorController'
  }
});


app.controller("CalculatorController", function ($scope) {
  $scope.keys = ['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', 'C', '0', '=', '/'];
  $scope.displayPanel = "";

  $scope.handler = function(val){
    if(val == 'C'){
      $scope.clearVal(val);
    }else if(val == '='){
      $scope.evaluate();
    }
    else{
      $scope.setVal(val);
    }
  }

  $scope.clearVal = function(){
     $scope.displayPanel = "";
  }

  $scope.setVal = function(val){
    $scope.displayPanel += val;
  }

   $scope.evaluate = function(){
    $scope.displayPanel = eval($scope.displayPanel);
   }

});

app.controller("PageController", function($scope){


});
