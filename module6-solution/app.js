(function () {
  "use strict";

  angular
    .module("LunchCheck", [])
    .controller("LunchCheckController", LunchController);

  LunchController.$inject = ["$scope"];
  function LunchController($scope) {
    $scope.checkIfTooMuch = function () {
      var list = $scope.lunch_list;

      if (!$scope.lunch_list) {
        $scope.lunch_message = "Please enter data first";
        $scope.text_color = "text_red";
        $scope.border_color = "border_red";

        // Bonus #3 NOT considering an empty item as an item towards to the count
      } else if (
        list.split(",").filter((item) => item.trim() != "").length <= 3
      ) {
        $scope.lunch_message = "Enjoy!";
        $scope.text_color = "text_green";
        $scope.border_color = "border_green";
      } else {
        $scope.lunch_message = "Too Much!";
        $scope.text_color = "text_green";
        $scope.border_color = "border_green";
      }
    };
  }
})();
