'use strict';

angular.module("trello", [])

.factory("trelloService", ['$http', function($http, $q) {
  var service = {};

  service.loadList = function(id, key) {    
    return $http.get('https://api.trello.com/1/lists/'+id+'?cards=open&key='+key).then(function(response) {
	return response.data;
    });
  };
  return service;
}])

.directive('ngTrelloList', function() {
  return {
    restrict: 'E',
    scope: {
      'id': '=trelloId',
      'key': '=trelloKey',
    },
    controller: function($scope, trelloService) {
      trelloService.loadList($scope.id, $scope.key).then(function(list) {
        $scope.list = list;
      });
    },
    template: '<div class="trello-list"><p class="trello-list-name">{{list.name}}</p><div class="trello-card" ng-repeat="card in list.cards"><p class="trello-card-name">{{card.name}}</p><p class="trello-card-description">{{card.desc}}</p></div></div>'
  }
});
