(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'itemsList.html',
            restrict: "E",
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.searchTerm = "";
        ctrl.found = [];

        ctrl.findItems = function () {
            ctrl.found = [];
            if (ctrl.searchTerm) {
                var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
                promise.then(function (response) {
                    ctrl.found = response;
                    ctrl.searchTerm = "";
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }

        ctrl.removeItem = function (itemIndex) {
            ctrl.found.splice(itemIndex, 1);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            var data;
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (response) {
                data = response.data;
                var foundItems = [];

                for (var i = 0; i < data.menu_items.length; i++) {
                    if (data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1) {

                        var item = {
                            name: data.menu_items[i].name,
                            short_name: data.menu_items[i].short_name,
                            description: data.menu_items[i].description
                        }

                        foundItems.push(item);
                    }
                }
                return foundItems;
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
})();