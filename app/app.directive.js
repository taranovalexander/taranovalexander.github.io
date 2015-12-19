"use strict";

angular
    .module('app')
    .directive('pageScroll', pageScroll);

function pageScroll() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var regions = element.find('.section, .scene');
      angular.element(window).on('scroll', regions, onScroll);
    }
  }
}

function onScroll(event) {
  var scrollPos = angular.element(window).scrollTop(),
      wHeight = angular.element(window).height(),
      regions = event.data;

  angular.forEach(regions, function(value, key) {
    var $currentElement = angular.element(value);
    if ($currentElement.position().top < scrollPos + wHeight/2 &&
        $currentElement.position().top +  $currentElement.height() > scrollPos + wHeight/2) {
      if (!$currentElement.hasClass('active')){
        regions.removeClass("active");
        $currentElement.addClass("active");
      }
    }
  });
}
