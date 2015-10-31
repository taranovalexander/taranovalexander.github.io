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
    showMess();
  });

  modes.collection = [
    {
      "messages": ["Need some JS?", "I'm in!", "Javascript, jQuery, Angular, Ajax"],
      "imgSrc": "images/super-man.png",
      "nav": "Day mode",
      "id": 0
    },
    {
      "messages": ["Psssss....", "I have some magic!", "HTML 5, HTML 4, CSS3, CSS2, Sass, Compass, swig"],
      "imgSrc": "images/super-man.png",
      "nav": "Night mode",
      "id": 1
    },
    {
      "messages": ["Bug will not pass!!!"],
      "imgSrc": "images/super-man.png",
      "nav": "Siberian mode",
      "id": 2
    }
  ];
  modes.activeMode = modes.collection[0];
  modes.devStyle = {'background-image': 'url(' + modes.activeMode.imgSrc + ')'};

  modes.showMode = function (idx) {
    modes.activeMode = modes.collection[idx];
  };

  $scope.$on('showMessage', function (ngRepeatFinishedEvent) {
    showMess();
  });
}

function showMess() {
  var $elements = angular.element('.developer__message');
  $elements.eq(idx).fadeIn(2000).fadeOut(2000, function () {
    showMess(mess, idx + 1 < $elements.length ? idx + 1 : 0);
  });
}

