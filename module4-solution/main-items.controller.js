(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('MainItemsController', MainItemsController);

    MainItemsController.$inject = ['MenuDataService', 'items'];

    function MainItemsController(MenuDataService, items) {
        var itemsList = this;
        itemsList.items = items;
    }

})();
