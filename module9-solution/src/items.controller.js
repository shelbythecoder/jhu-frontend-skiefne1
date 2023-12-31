(function () {
  "use strict";

  angular.module("data").controller("ItemsListController", ItemsListController);

  ItemsListController.$inject = ["MenuDataService", "items"];
  function ItemsListController(MenuDataService, items) {
    var itemsList = this;
    itemsList.items = items;
  }
})();
