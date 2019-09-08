(function () {
    "use strict";

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['SignUpDataService', 'MenuService', 'ApiPath'];

    function MyInfoController(SignUpDataService, MenuService, ApiPath) {
        var $ctrl = this;
//        $ctrl.alreadyLoaded = false;

        $ctrl.isRegistered = function () {
            var signUpInfo = SignUpDataService.getSignUpInfo();

            if (signUpInfo) {
                $ctrl.lastName = signUpInfo.firstname;
                $ctrl.firstName = signUpInfo.lastname;
                $ctrl.email = signUpInfo.email;
                $ctrl.phoneNumber = signUpInfo.phone;

                $ctrl.favoriteDishShortName = signUpInfo.dishData.short_name;
                $ctrl.favoriteDishDescription = signUpInfo.dishData.description;
                $ctrl.favoriteDishName = signUpInfo.dishData.name;

                $ctrl.basePath = ApiPath;


//                $ctrl.alreadyLoaded = true;

/*                var promise = MenuService.getMenuItem(signUpInfo.dish);
                promise.then(function (response) {
                    $ctrl.favoriteDishShortName = response.short_name;
                    $ctrl.favoriteDishDescription = response.description;
                    $ctrl.favoriteDishName = response.name;

                    $ctrl.basePath = ApiPath;

                    $ctrl.alreadyLoaded = true;
                }).catch(function (error) {
                    console.log(error);
                });*/

                return true;
            } else {
                return false;
            }
        }
    }

})();
