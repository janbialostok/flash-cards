app.factory('FlashCardsFactory', function ($http){
    return {
        getFlashCards: function(category){
            var reqQuery = {};
            if (category){
                reqQuery.category = category;
            }
            return $http.get('/cards', { params: reqQuery }).then(function (res){
                return res.data
            });
        }
    };
});

app.controller('FlashCardController', function($scope, ScoreFactory){
    
    $scope.flashCard = {
        question: 'What is Angular?',
        answers: [
            { text: 'A front-end framework for great power!', correct: true },
            { text: 'Something lame, who cares, whatever.', correct: false },
            { text: 'Some kind of fish, right?', correct: false }
        ]
    };

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
        setTimeout(function(){ $scope.flashCards.shift(); $scope.$apply(); }, 1000);
    };

});

app.filter('cheat', function(){
    return function(elem){
        if (arguments[1]){
            return elem.filter(function(answer){
                return answer.correct;
            });
        }
        else {
            return elem;
        }
    }
});

app.controller('MainController', function($scope, FlashCardsFactory){
    
    FlashCardsFactory.getFlashCards().then(function(cards){
        $scope.flashCards = cards; 
    });

    $scope.categories = [
        'MongoDB',
        'Express',
        'Angular',
        'Node'
    ];

    $scope.currentCategory;

    $scope.getCategoryCards = function (category){
        $scope.currentCategory = category;
        FlashCardsFactory.getFlashCards(category).then(function(cards){
            $scope.flashCards = cards;
        });
    };

    $scope.checkCategory = function (category){
        if (category == $scope.currentCategory){
            return true;
        }
        else{
            return false;
        }
    }

    $scope.resetButton = function(){
        FlashCardsFactory.getFlashCards().then(function(cards){
            $scope.currentCategory = undefined;
            $scope.flashCards = cards;
        });
    }

    $scope.showCheat = false;

    $scope.cheatButton = function(){
        if ($scope.showCheat) $scope.showCheat = false; 
        else $scope.showCheat = true;
    }

});