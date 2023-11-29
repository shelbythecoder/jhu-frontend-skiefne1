(function () {
  "use strict";

  angular.module("data").config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise("/");

    // *** Set up UI states ***
    $stateProvider

      // Home page
      .state("home", {
        url: "/",
        templateUrl: "src/templates/home.template.html",
      })

      // Category list page
      .state("categoriesList", {
        url: "/categories-list",
        templateUrl: "src/templates/categories.template.html",
        controller: "CategoriesListController as categoriesList",
        resolve: {
          categories: [
            "MenuDataService",
            function (MenuDataService) {
              return MenuDataService.getAllCategories();
            },
          ],
        },
      })

      // Item detail
      .state("itemsList", {
        url: "/{shortName}",
        templateUrl: "src/templates/items.template.html",
        controller: "ItemsListController as itemsList",
        params: {
          shortName: null,
        },
        resolve: {
          items: [
            "MenuDataService",
            function (MenuDataService, $stateparams) {
              return MenuDataService.getItemsForCategory(
                $stateparams.shortName
              );
            },
          ],
        },
      });
  }
})();
