(function () {
    'use strict';

    angular.module('MenuApp')
        .component('items', {
            templateUrl: 'itemsList.template.html',
            bindings: {
                items: '<'
            }
        });

})();