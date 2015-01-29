'use strict';

angular.module("trello", [])

.factory("trelloService", ['$http', function($http, $q) {
  var service = {};

  service.loadLists = function(url) {
   
    var cardsOfList = function(id, trello) {			
      var cards = [];
      trello.cards.forEach(function(card) {
        if (card.idList == id) cards.push(card);
      });
      return cards;
    };

    var lists = function(trello) {
      var lists = {};
      trello.lists.forEach(function(list) {
        lists[list.name] = cardsOfList(list.id, trello);
      });
      return lists;
    };
    
    return $http.get(url).then(function(response) {
	return lists(response.data);
    });
  };
  return service;
}])

.directive('ngTrelloList', function() {
  return {
    restrict: 'E',
    scope: {
      'url': '=trelloUrl',
      'name': '=trelloListName',
    },
    controller: function($scope, trelloService) {
      trelloService.loadLists($scope.url).then(function(lists) {
        $scope.lists = lists;
      });
      $scope.pepino = $scope.url;
    },
    template: '<div class="trello-list"><p class="trello-list-name">{{name}}</p><div class="trello-card" ng-repeat="card in lists[name]"><p class="trello-card-name">{{card.name}}</p><p class="trello-card-description">{{card.desc}}</p></div></div>'
  }
});
