(function () {
    'use strict';

    var LunchCheck = angular.module('LunchCheck', []);
    LunchCheck.controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.dishes = '';
        $scope.message = '';
        var MAX_DISHES = 3;

        $scope.checkDishes = function (dishes) {
            if (dishes.length > 0) {
                var arrayOfDishes = dishes.split(',');
                if (enoughDishesAreSelected(arrayOfDishes)) {
                    $scope.message = "Enjoy!";
                } else {
                    $scope.message = "Too much!";
                }
            } else {
                $scope.message = "Please enter data first";
            }
        };

        function enoughDishesAreSelected(arrayOfDishes) {
            return arrayOfDishes.length <= MAX_DISHES;
        }
    }
})();