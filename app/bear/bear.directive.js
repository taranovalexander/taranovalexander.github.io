
"use strict";

angular
  .module('bear')
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
