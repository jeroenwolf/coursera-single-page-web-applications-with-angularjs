(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['MenuService', 'SignUpDataService'];

    function SignUpController(MenuService, SignUpDataService) {
        var $ctrl = this;

        $ctrl.submit = function (dish) {
            MenuService.getMenuItem(dish).then(function (response) {
                SignUpDataService.storeSignUpInfo($ctrl.user, response);
                $ctrl.invalidFavoriteDish = false;
                $ctrl.completed = true;
            }).catch(function (error) {
                $ctrl.invalidFavoriteDish = true;
                console.log(error);
            });
        };

        $ctrl.validateFavoriteDish = function (form) {
            if (form.dish && form.dish.$modelValue && form.dish.$modelValue.length > 0) {
                MenuService.getMenuItem(form.dish.$modelValue).then(function (response) {
                    $ctrl.invalidFavoriteDish = false;
                    form.dish.$invalid = false;
                }).catch(function (error) {
                    $ctrl.invalidFavoriteDish = true;
                    form.dish.$invalid = true;
                    console.log(error);
                });
            } else {
                $ctrl.invalidFavoriteDish = false;
                form.dish.$invalid = true;
            }
        }
    }


})();
