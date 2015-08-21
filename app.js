var app = angular.module('filmic', []);

app.factory('omdbClient', ['$http', function($http){
  var client = {};

  client.get = function(id){
    params = {
      i: id,
      plot: "full",
      tomatoes: true
    }

    return $http.get('http://www.omdbapi.com/?', {params: params}).
      then(function(res){
        return(res.data);
      });
    };

  client.search = function(title){
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
  };

  client.validProperty = function(property){
    return property && property !== 'N/A';
  };

  return client;
}]);

app.controller('homeCtrl', [
    '$scope', 
    '$location', 
    'omdbClient',
    function($scope, $location, omdbClient){
      $scope.$on('$locationChangeStart', function(e){
        console.log(history.state);
        var path = $location.path()         
        if(path){ 
          $scope.setMovie(path.match(/tt\d{7}/)[0]);
        } else {
          $scope.active = false;
        }
      });

      $scope.getResults = function(title, oldTitle){
        omdbClient.search(title).then(function(results){
          $scope.results = results;
        });
      };

      $scope.setMovie = function(id){
        omdbClient.get(id).then(function(result){
          $scope.active = result;
        });
      };

      $scope.validProperty = omdbClient.validProperty;
}]);
