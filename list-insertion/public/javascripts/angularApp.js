var app = angular.module('listInsertion', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainController',
      resolve: {
    postPromise: ['lists', function(lists){
      return lists.getAll();
    }]
  }
    });

  $urlRouterProvider.otherwise('home');
}]);


app.factory('lists', ['$http', function($http) {
  var o = {
    lists: []
  };

  o.getAll = function() {
   return $http.get('/lists').success(function(data){
     angular.copy(data, o.lists);
   });
 };

 o.create = function(list) {
  return $http.post('/lists', list).success(function(data){
    o.lists.push(data);
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
      lists.create({
        content: $scope.content //add to lists
      });
      $scope.content = ''; //clear input field
    };
  }]);
