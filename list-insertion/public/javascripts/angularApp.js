var app = angular.module('listInsertion', []);


app.factory('lists', [function() {
  var o = {
    lists: []
  };

  o.getAll = function() {
   return $http.get('/lists').success(function(data){
     angular.copy(data, o.lists);
   });
 };

  return o;
}])

app.controller('MainController', [
  '$scope',
  'lists',
  function($scope, lists) {
    $scope.lists = lists.lists;
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
