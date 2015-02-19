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