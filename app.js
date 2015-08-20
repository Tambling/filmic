var app = angular.module('filmic', []);

app.factory('omdbClient', ['$http', function($http){
  return {
    get: function(id){
      params = {
        i: id,
        plot: "full",
        tomatoes: true
      }
      return $http.get('http://www.omdbapi.com/?', {params: params}).
        then(function(res){
          return(res.data);
        });
    },

    search: function(title){
      params = {
        s: title,
        type: 'movie'
      };
      return $http.get('http://www.omdbapi.com/?', {params: params}).then(function(res){
        var data = res.data
        if(data.hasOwnProperty('Search')){
          return data.Search;
        } else {
          return null;
        }
      });
    }
  }
}]);

app.controller('homeCtrl', ['$scope', 'omdbClient', function($scope, omdbClient){
  $scope.getResults = function(title){
    omdbClient.search(title).then(function(results){
      $scope.results = results;
    });
  };

  $scope.setMovie = function(result){
    omdbClient.get(result.imdbID).then(function(result){
      $scope.active = result;
    });
  };
}]);
