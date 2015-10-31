
"use strict";

angular
  .module('app.bear')
  .directive('bindBearTouch', bindBearTouch);

function bindBearTouch() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('touchstart touchend', function(e) {
        e.preventDefault();
        $(this).toggleClass('hover-effect');
      });
    }
  }
}
