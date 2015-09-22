angular.module('neo.conversation.services', [])

    .run(function($rootScope, $ionicModal) {
      $ionicModal.fromTemplateUrl('js/modules/conversation/templates/chat.html', {
        animation: 'slide-in-up',
        id: 'chat',
      }).then(function(modal) {
        $rootScope.chatModal = modal;
      });

      $rootScope.showChat = function(id) {
        $rootScope.chatId = id;
        $rootScope.chatModal.show();
      };
    })
    .factory('Conversations', function(Resource) {
      return Resource('/conversations/:conversationId');
    })
    .factory('Chats', function(Resource) {
      return Resource('/conversations/:conversationId/messages/:messageLimit');
    })
    .controller('ChatShowCtrl', function($scope, $rootScope, Chats, $ionicScrollDelegate) {
      $scope.showUser = $rootScope.showUser;
      $scope.$on('modal.shown', function(e, m) {
        if (m.id == 'chat') {
          $scope.refresh();
        }
      });

      $scope.$on('modal.hidden', function(e, m) {
        if (m.id == 'chat') {
          $scope.chatData = {};
        }
      });

      $scope.refresh = function() {
        Chats.get({conversationId: $rootScope.chatId}, function(chats) {
          $scope.chatData = chats;
          $scope.$broadcast('scroll.refreshComplete');
          $ionicScrollDelegate.resize();
          $ionicScrollDelegate.scrollBottom(true);
        });
      };

      $scope.postComment = function() {
        $scope.refresh()
        $scope.$parent.$$childHead.text = '';
      };
    });
