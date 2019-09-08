(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['MenuService', 'SignUpDataService'];

    function SignUpController(MenuService, SignUpDataService) {
        var $ctrl = this;

        $ctrl.submit = function (dish) {

            var promise = MenuService.getMenuItem(dish);
            promise.then(function (response) {
                SignUpDataService.storeSignUpInfo($ctrl.user, response);

                $ctrl.invalidFavoriteDish = false;
                $ctrl.completed = true;
            }).catch(function (error) {
                $ctrl.invalidFavoriteDish = true;
                console.log(error);
            });
        };
    }


})();
