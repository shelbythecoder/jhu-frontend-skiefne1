describe("sign up validation", function () {
  "use strict";

  var signUpController;
  var $httpBackend;
  var ApiBasePath;

  beforeEach(function () {
    angular.mock.module("public");

    inject(function ($injector) {
      var $controller = $injector.get("$controller");
      $httpBackend = $injector.get("$httpBackend");
      SaveInfoService = $injector.get("SaveInfoService");
      ApiPath = $injector.get("ApiPath");

      // Instantiate controller
      signUpController = $controller("SignUpController", {
        SaveInfoService: SaveInfoService,
      });
    });
  });

  it("should return categories list", function () {
    expect(signUpController).toBeDefined();
    $httpBackend.whenGET(ApiBasePath + "/menu_items.json").respond({
      A: {
        category: {
          id: 82,
          name: "Soup",
          short_name: "A",
          special_instructions: "",
        },
        menu_items: [
          {
            description:
              "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
            large_portion_name: "quart",
            name: "Won Ton Soup with Chicken",
            price_large: 5,
            price_small: 2.55,
            short_name: "A1",
            small_portion_name: "pint",
          },
          {
            description: "chicken broth with egg drop",
            large_portion_name: "quart",
            name: "Egg Drop Soup",
            price_large: 4.5,
            price_small: 2.25,
            short_name: "A2",
            small_portion_name: "pint",
          },
        ],
      },
      L: {
        category: {
          id: 81,
          name: "Lunch",
          short_name: "L",
          special_instructions:
            "Sunday-Friday 11:15am-3:00pm. Served with your choice of rice (Vegetable Fried RIce, Steamed Rice, Brown Rice), AND EITHER soup (Hot & Sour, Wonton, Vegetable, Egg Drop, Chicken Corn Soup) OR veggie egg roll. $1.00 extra to have both soup and egg roll.",
        },
        menu_items: [
          {
            description:
              "chunks of chicken, breaded and deep-fried with sauce containing orange peels; white meat by request: for pint $1 extra, for large $2 extra",
            name: "Orange Chicken",
            price_large: 9.75,
            short_name: "L1",
          },
          {
            description:
              "chunks of chicken, breaded and deep-fried with sauce and scallions; white meat by request: for pint $1 extra, for large $2 extra",
            name: "General Tso's Chicken",
            price_large: 9.75,
            short_name: "L2",
          },
        ],
      },
    });

    signUpController.menuItem = "L1";
    signUpController.validateMenuItem().then(function (response) {
      expect(signUpController.error).toEqual("");
    });
    $httpBackend.flush();
  });
});
