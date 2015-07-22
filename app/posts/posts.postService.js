(function() {
  'use strict';

  angular
    .module('posts')
    .factory('postsService', ['$http', '$rootScope', function($http, $rootScope) {

      // public service methods
      return {
        getPosts: getPosts,
        getPost: getPost,
        createPost: createPost,
        editPost: editPost,
        deletePost: deletePost
      };

      function getPosts() {

        return $http.get('api/collections/tiffanysposts');
      }

      function getPost(postId) {
        return $http.get('api/collections/tiffanysposts/' + postId);
      }

      function createPost(newPost) {
        $http.post('api/collections/tiffanysposts', newPost).then(function(res) {
          $rootScope.$broadcast('post:added');
        });
      }

      function editPost(post) {
        $http.put('api/collections/tiffanysposts/' + post._id, post).then(function(res) {
          $rootScope.$broadcast('post:updated');
        });

      }

      function deletePost(postId) {
        $http.delete('api/collections/tiffanysposts/' + postId).then(function(res) {
          $rootScope.$broadcast('post:deleted');
        });
      }



    }]);
})();
