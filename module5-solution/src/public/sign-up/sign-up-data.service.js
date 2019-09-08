(function () {
    "use strict";

    angular.module('public')
        .service('SignUpDataService', SignUpDataService);

    function SignUpDataService() {
        var $ctrl = this;

        $ctrl.storeSignUpInfo = function (user, dishData) {
            user.dishData = dishData;
            $ctrl.signUpInfo = user;
        }

        $ctrl.getSignUpInfo = function () {
            return $ctrl.signUpInfo;
        }
    }
})();
