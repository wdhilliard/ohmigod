(function (angular) {

var ohmApp = angular.module('ohmApp', []);

ohmApp.controller('ohmCtrl', ['$scope', function($scope){
  $scope.colors = [
    {hex: '#000000' ,value:0        ,multiplier:0   ,tolerance:null },
    {hex: '#964B00' ,value:1        ,multiplier:1   ,tolerance:'±1%'},
    {hex: '#FF0000' ,value:2        ,multiplier:2   ,tolerance:'±2%'},
    {hex: '#FFA500' ,value:3        ,multiplier:3   ,tolerance:null},
    {hex: '#FFFF00' ,value:4        ,multiplier:4   ,tolerance:'(±5%)'},
    {hex: '#9ACD32' ,value:5        ,multiplier:5   ,tolerance:'±0.5%'},
    {hex: '#6495EE' ,value:6        ,multiplier:6   ,tolerance:'±0.25%'},
    {hex: '#EE82EF' ,value:7        ,multiplier:7   ,tolerance:'±0.1%'},
    {hex: '#A0A0A0' ,value:8        ,multiplier:8   ,tolerance:'±0.05%'},
    {hex: '#FFFFFF' ,value:9        ,multiplier:9   ,tolerance:null},
    {hex: '#CFB53B' ,value:null     ,multiplier:-1  ,tolerance:'±5%'},
    {hex: '#C0C0C0' ,value:null     ,multiplier:-2  ,tolerance:'±10%'},
    {hex: null      ,value:'empty'  ,multiplier:null,tolerance:'±20%'},
  ];

  $scope.stripe_1 = $scope.stripe_2 =$scope.stripe_3 = $scope.colors[0];
  $scope.stripe_4 = $scope.colors[$scope.colors.length-1];
  $scope.selectedStripe = 1;

  $scope.getBorder = function(color){
    if(color.value == 'empty'){
      return 'dashed';
    }
    else{
      return 'solid';
    }
  }

  $scope.setActive = function(stripe_number){
    console.log('click');
    $scope.selectedStripe = parseInt(stripe_number);
  }

  $scope.colorDisplay = function(color){
    switch($scope.selectedStripe){
      case 3:
        return (color.multiplier != null) ? 'block' : 'none';
      case 4:
        return (color.tolerance != null) ? 'block' : 'none';
      default:
        return (!isNaN(parseInt(color.value)))  ? 'block' : 'none';
    }
  }

  $scope.setColor= function(color){
    $scope['stripe_'+$scope.selectedStripe] = color;
  }

  $scope.$watch('stripe_4',function(newVal,oldVal){
    $scope.tolerance = newVal.tolerance;
  });

  $scope.$watchGroup(['stripe_1','stripe_2','stripe_3'],function(newVals,oldVals){
    $scope.resistance = ((newVals[0].value * 10) + newVals[1].value) * Math.pow(10, newVals[2].multiplier);

    if($scope.resistance / 1000000 > 1){
      $scope.resistance = ($scope.resistance / 1000000).toString()+' M';
    }else if($scope.resistance / 1000 > 1){
      $scope.resistance = ($scope.resistance / 1000).toString()+' K';
    }
  });

}]);

})(angular);