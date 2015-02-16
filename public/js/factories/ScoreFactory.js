app.factory('ScoreFactory', function(){
     return {
        correct: 0,
        incorrect: 0
     };
});

app.controller('StatsController', function($scope, ScoreFactory){
    $scope.statsTemplate = '/templates/stats.html';
    $scope.score = ScoreFactory;
});