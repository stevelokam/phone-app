angular.module('neo.conversation.controllers', [])

    .controller('ConversationListCtrl', function($scope, $rootScope, Conversations, User) {

      $scope.doneLoading = false;

      $scope.refresh = function() {
        $scope.start = undefined;
        Conversations.query(function(data) {
          $scope.items = data;

          for (var i = 0; i < $scope.items.length; i++) {
            $scope.items[i].users = JSON.parse($scope.items[i].users);
            for (var j in $scope.items[i].users) {
              if ($scope.items[i].users[j] != $rootScope.currentUser.id) {
                $scope.items[i].users[j] = User.get({userId: $scope.items[i].users[j]}, function(data) {});
                $scope.items[i].recipient = $scope.items[i].users[j];
              } else {
                $scope.items[i].users[j] = $rootScope.currentUser;
              }
            }
          }

          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      $scope.refresh();
    });