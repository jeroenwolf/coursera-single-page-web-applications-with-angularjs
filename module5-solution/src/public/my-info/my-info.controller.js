(function () {
    "use strict";

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['SignUpDataService', 'MenuService', 'ApiPath'];

    function MyInfoController(SignUpDataService, MenuService, ApiPath) {
        var $ctrl = this;

        $ctrl.isRegistered = function () {
            var signUpInfo = SignUpDataService.getSignUpInfo();

            if (signUpInfo) {
                $ctrl.lastName = signUpInfo.lastname;
                $ctrl.firstName = signUpInfo.firstname;
                $ctrl.email = signUpInfo.email;
                $ctrl.phoneNumber = signUpInfo.phone;

                $ctrl.favoriteDishShortName = signUpInfo.dishData.short_name;
                $ctrl.favoriteDishDescription = signUpInfo.dishData.description;
                $ctrl.favoriteDishName = signUpInfo.dishData.name;

                $ctrl.basePath = ApiPath;

                return true;
            } else {
                return false;
            }
        }
    }

})();
