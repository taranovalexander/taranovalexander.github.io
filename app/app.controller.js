"use strict";

angular
  .module('app')
  .controller('SceneController', SceneController);

SceneController.$inject = ['$scope'];

function SceneController($scope) {

  var modes = this,
    windowElement = angular.element(window);

  windowElement.load(function(){
    angular.element('#loader').hide();
    $scope.$apply();
  });

  modes.collection = [
    {
      "messages": ["Need some JS?", "I'm in!", "Javascript, jQuery, Angular", "I'll do it! :)"],
      "imgSrc": "images/mod-1.png",
      "nav": "Siberian mode",
      "id": 0
    },
    {
      "messages": ["Psssss....", "I have some secrets!", "HTML5, HTML4, CSS3, CSS2, Sass, Compass, swig", "It's like a magic!"],
      "imgSrc": "images/mod-2.png",
      "nav": "Night mode",
      "id": 1
    },
    {
      "messages": ["Bug will not pass!!!"],
      "imgSrc": "images/mod-3.png",
      "nav": "Middle-earth mode",
      "id": 2
    }
  ];
  angular.forEach(modes.collection, function(value, key) {
    angular.element('<img/>')[0].src = value.imgSrc;
  });

  modes.activeMode = modes.collection[0];

  modes.showMode = function (idx) {
    modes.activeMode = modes.collection[idx];
  };

  $scope.$on('showMessage', function (ngRepeatFinishedEvent) {
    var mess = angular.element('.developer__message');

    showMess(0, mess);
    modes.devStyle = {'background-image': 'url(' + modes.activeMode.imgSrc + ')'};
  });
}

function showMess(idx, mess) {
  var $elements = mess;
  $elements.eq(idx).fadeIn(2500).fadeOut(2500, function () {
    showMess(idx + 1 < $elements.length ? idx + 1 : 0, mess);
  });
}