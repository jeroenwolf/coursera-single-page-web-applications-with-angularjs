describe("SignUpController", function() {

    beforeEach(module('restaurant'));

    var $controller;
    var signUpController;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;

        var MenuServiceErrorMock = {};
        MenuServiceErrorMock.getMenuItem = function (dish) {
            throw new Error("Test message.");
        };

        signUpController =
            $controller('SignUpController',
                {MenuService: MenuServiceErrorMock});

    }));

    it("should change invalidFavoriteDish status in controller", function() {
        signUpController.submit(dish);
        expect(signUpController.invalidFavoriteDish).toBe(true);
    });

});
