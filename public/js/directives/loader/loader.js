app.directive('loader', function(){
	return {
		restrict: 'E',
		templateUrl: '/js/directives/loader/loader.html'
	};
});

app.directive('flashCard', function(ScoreFactory){
	return {
		restrict: 'E',
		templateUrl: '/js/directives/loader/flash-card.html',
		link: function($scope, element, attr){
			$scope.answered = false;
			$scope.answeredCorrectly;
			$scope.answerQuestion = function(val){
		        if (val){
		            $scope.answeredCorrectly = true;
		            ScoreFactory.correct += 1;
		        }
		        else{
		            $scope.answeredCorrectly = false;  
		            ScoreFactory.incorrect += 1; 
		            $scope.answeredClass = 'incorrect';
		        }
		        $scope.answered = true;
		    };
		},
		scope:{
			card: '='
		}
	}
});

app.directive('borderOnHover', function(){
	return {
		restrict: 'A',
		link: function($scope, element, attr){
			element.on('mouseenter', function(){
				element.css('border', '2px solid black');
			});
			element.on('mouseleave', function(){
				element.css('border', 'none');
			});
		}
	}
});
