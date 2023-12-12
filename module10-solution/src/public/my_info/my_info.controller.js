(function () {
  "use strict";

  angular.module("public").controller("MyInfoController", MyInfoController);

  MyInfoController.$inject = ["SaveInfoService", "info_items"];
  function MyInfoController(SaveInfoService, info_items) {
    var $ctrl = this;
    $ctrl.items = info_items;
  }
})();
