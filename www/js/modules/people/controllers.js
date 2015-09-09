angular.module('neo.people.controllers', [])

    .controller('PeopleListCtrl', function($scope, User) {

      $scope.searchKey = '';
      $scope.start = undefined;
      $scope.limit = 20;

      $scope.clearSearch = function() {
        $scope.start = undefined;
        $scope.searchKey = '';
        $scope.items = User.query();
      };

      $scope.search = function() {
        $scope.start = undefined;
        $scope.items = User.query({query: $scope.searchKey, limit: $scope.limit});
      };

      $scope.refresh = function() {
        $scope.start = undefined;
        User.queryFresh({limit: $scope.limit}, function(data) {
          $scope.items = data;
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      $scope.canLoadMore = function() {
        if ($scope.start > 0 && $scope.start % $scope.limit != $scope.limit) {
          console.log('false');
          return false;
        }

        console.log('true');
        return true;
      };

      $scope.loadMore = function() {
        $scope.start = $scope.start || 0;
        $scope.start = $scope.start + $scope.limit;
        User.query({start: $scope.start, limit: $scope.limit}, function(data) {
          $scope.items = $scope.items.concat(data);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      };

      $scope.items = User.query({start: $scope.start, limit: $scope.limit});

    });
