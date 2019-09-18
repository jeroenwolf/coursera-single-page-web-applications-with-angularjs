(function () {
    "use strict";

    angular.module('public')
        .service('SignUpDataService', SignUpDataService);

    function SignUpDataService() {
        var service = this;

        service.storeSignUpInfo = function (user, dishData) {
            user.dishData = dishData;
            service.signUpInfo = user;
        }

        service.getSignUpInfo = function () {
            return service.signUpInfo;
        }
    }
})();
