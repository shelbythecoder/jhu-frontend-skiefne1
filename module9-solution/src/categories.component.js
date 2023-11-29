(function () {
  "use strict";

  angular.module("data").component("categories", {
    templateUrl: "src/template/categories.template.html",
    bindings: {
      items: "<",
    },
  });
})();
