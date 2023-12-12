(function () {
  angular.module("public").controller("SignUpController", SignUpController);

  SignUpController.$inject = ["SaveInfoService"];
  function SignUpController(SaveInfoService) {
    var $ctrl = this;
    $ctrl.firstName = "";
    $ctrl.lastName = "";
    $ctrl.email = "";
    $ctrl.phone = "";
    $ctrl.menuItem = "";
    $ctrl.categoryShortName = "";
    $ctrl.menuItemInfo = "";

    $ctrl.validateMenuItem = function () {
      SaveInfoService.checkMenuItem().then(function (menuItems) {
        var split = $ctrl.menuItem.split(/(\d+)/);
        var categoryShortName = split[0];
        $ctrl.categoryShortName = categoryShortName;
        var menuItemNumber = split[1] - 1;
        $ctrl.error = "No such menu number exists";

        Object.keys(menuItems).forEach((shortName) => {
          if (shortName === categoryShortName) {
            menuItems[categoryShortName].menu_items.forEach((item, i) => {
              if (i === menuItemNumber) {
                $ctrl.error = "";
                $ctrl.menuItemInfo = menuItems[categoryShortName].menu_items[i];
              }
            });
          }
        });
      });
    };

    $ctrl.submit = function () {
      SaveInfoService.saveInfo(
        $ctrl.firstName,
        $ctrl.lastName,
        $ctrl.email,
        $ctrl.phone,
        $ctrl.menuItem,
        $ctrl.categoryShortName,
        $ctrl.menuItemInfo
      );
      $ctrl.completed = "Your information has been saved.";
    };
  }
})();
