(function () {
  "use strict";

  angular.module("data").component("items", {
    templateUrl: "src/template/items.template.html",
    bindings: {
      items: "<",
    },
  });
})();
