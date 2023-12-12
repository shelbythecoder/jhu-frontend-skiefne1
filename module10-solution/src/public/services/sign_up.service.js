(function () {
  "use strict";
  angular.module("public").service("SaveInfoService", SaveInfoService);

  SaveInfoService.$inject = ["$http"];
  function SaveInfoService($http) {
    var service = this;
    var _firstName = "";
    var _lastName = "";
    var _email = "";
    var _phone = "";
    var _menuItem = "";
    var _categoryShortName = "";
    var _menuItemInfo = "";

    /**
     * Load the current user with username and token
     */
    service.saveInfo = function (
      firstName,
      lastName,
      email,
      phone,
      menuItem,
      categoryShortName,
      menuItemInfo
    ) {
      _firstName = firstName;
      _lastName = lastName;
      _email = email;
      _phone = phone;
      _menuItem = menuItem;
      _categoryShortName = categoryShortName;
      _menuItemInfo = menuItemInfo;
    };

    service.getInfoItems = function () {
      return {
        firstName: _firstName,
        lastName: _lastName,
        email: _email,
        phone: _phone,
        menuItem: _menuItem,
        categoryShortName: _categoryShortName,
        menuItemInfo: _menuItemInfo,
      };
    };

    service.checkMenuItem = function () {
      return $http({
        method: "GET",
        "Access-Control-Allow-Origin": "*",
        url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json",
      }).then(function (result) {
        return result.data;
      });
    };
  }
})();
