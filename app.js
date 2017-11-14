var app = angular.module('listInsertion', []);

app.controller('MainController', [
  '$scope',
  function($scope) {
    $scope.lists = [
      {content: 'a list item'},
      {content:'another list item'},
      {content: 'one more'}
    ];
    $scope.addList = function() {
      if (!$scope.content || $scope.content === '') { //don't allow empty lists
        return;
      };
      $scope.lists.push({
        content: $scope.content //add to lists
      });
      $scope.content = ''; //clear input field
    };
  }]);
