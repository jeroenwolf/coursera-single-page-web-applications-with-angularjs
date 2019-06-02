(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

        toBuy.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var showBoughtList = this;

        showBoughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [
            {
                name: "cookies",
                quantity: 10
            },
            {
                name: "mangoes",
                quantity: 5
            },
            {
                name: "avocados",
                quantity: 8
            },
            {
                name: "peaches",
                quantity: 7
            },
            {
                name: "strawberries",
                quantity: 9
            }
        ];

        var boughtItems = [];

        service.buyItem = function (itemIndex) {
            var toBuyItem = toBuyItems[itemIndex];
            boughtItems.push(toBuyItem);

            toBuyItems.splice(itemIndex, 1);
        }

        service.getBoughtItems = function () {
            return boughtItems;
        };

        service.getItemsToBuy = function () {
            return toBuyItems;
        }
    }

})();