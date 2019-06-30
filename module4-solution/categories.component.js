(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            templateUrl: 'categoriesList.template.html',
            bindings: {
                categories: '<'
            }
        });

})();