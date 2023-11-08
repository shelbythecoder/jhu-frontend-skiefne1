(function () {
  "use strict";

  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems", FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      restrict: "A",
      templateUrl: "foundItems.html",
      scope: {
        foundItems: "<",
        onRemove: "&",
      },
      controller: NarrowItDownController,
      controllerAs: "found",
      bindToController: true,
    };

    return ddo;
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    const found = this;
    found.search = function () {
      var promise = MenuSearchService.getMatchedMenuItems(found.term);

      promise
        .then(function (response) {
          found.foundItems = response;
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    found.onRemove = function (itemIndex) {
      found.foundItems.splice(itemIndex, 1);
    };
  }

  MenuSearchService.$inject = ["$http"];
  function MenuSearchService($http) {
    const service = this;
    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json",
      }).then(function (result) {
        // process result and only keep items that match
        var foundItems = [];

        for (var categoryKey of Object.keys(result.data)) {
          for (var menuItem of result.data[categoryKey].menu_items) {
            if (menuItem.description.includes(searchTerm)) {
              foundItems.push(menuItem.short_name);
            }
          }
        }

        // return processed items
        return foundItems;
      });
    };
  }
})();
