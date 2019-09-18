describe("SignUpController", function () {
    'use strict';

    let signUpController;
    let menuService;
    let signUpDataService;
    let ApiPath;
    let $httpBackend;
    let formObject;
    let $rootScope;

    let menuItemTestData = [{
        id: 1,
        short_name: "A1",
        name: "Egg Drop Soup",
        description: "chicken broth with egg drop",
        price_small: 2.25,
        price_large: 4.5,
        small_portion_name: "pint",
        large_portion_name: "quart",
        image_present: true
    }];

    let userTestData = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        dish: ''
    };

    beforeEach(function () {
        module('public');

        inject(function ($injector) {
            let $controller = $injector.get('$controller');
            menuService = $injector.get('MenuService');
            signUpDataService = $injector.get('SignUpDataService');
            $httpBackend = $injector.get('$httpBackend');
            ApiPath = $injector.get('ApiPath');
            $rootScope = $injector.get('$rootScope');
            let $templateCache = $injector.get('$templateCache');
            let $compile = $injector.get('$compile');

            signUpController = $controller('SignUpController', {
                MenuService: menuService,
                SignUpDataService: signUpDataService
            });

            $httpBackend.whenGET('src/public/home/home.html').respond('');
            $httpBackend.whenGET('src/public/public.html').respond('');

            const html = $templateCache.get("src/public/sign-up/sign-up.html");
            const template = angular.element(html);
            $compile(template)($rootScope);

            formObject = $rootScope.signUpForm;
        });

    });

    it("submit - should change invalidFavoriteDish status to false and completed to true in controller when calling submit", function () {
        let dish = "A1";
        signUpController.user = userTestData;

        $httpBackend.expectGET(ApiPath + '/menu_items/A1.json').respond(menuItemTestData);

        expect(signUpController).toBeDefined();
        expect(signUpController.invalidFavoriteDish).not.toBeDefined();
        expect(signUpController.completed).not.toBeDefined();

        signUpController.submit(dish);

        $httpBackend.flush();

        expect(signUpController.invalidFavoriteDish).toEqual(false);
        expect(signUpController.completed).toEqual(true);
    });

    it("validateFavoriteDish - should change invalidFavoriteDish status to false in controller when calling validateFavoriteDish", function () {
        let dish = "A1";
        signUpController.user = userTestData;

        formObject.dish.$modelValue = "A1";

        $httpBackend.expectGET(ApiPath + '/menu_items/A1.json').respond(menuItemTestData);
        expect(signUpController).toBeDefined();
        expect(signUpController.invalidFavoriteDish).not.toBeDefined();

        signUpController.validateFavoriteDish(formObject);

        $httpBackend.flush();

        expect(signUpController.invalidFavoriteDish).toEqual(false);
        expect(formObject.dish.$invalid).toBeFalsy();
    });

});
