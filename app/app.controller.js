"use strict";

angular
  .module('app')
  .controller('ChangeMode', ['$scope', function ($scope) {

    var modes = this;

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

    $scope.activeMode = modes.collection[0];
    $scope.devStyle = {'background-image': 'url(' + $scope.activeMode.imgSrc + ')'};

    $scope.showMode = function (idx) {
      $scope.activeMode = modes.collection[idx];
    };

    $scope.$on('showMessage', function (ngRepeatFinishedEvent) {
      var items = angular.element('.developer__message');

      showMess(items, 0);

      function showMess(mess, idx) {
        var $elements = mess;
        $elements.eq(idx).fadeIn(2000).fadeOut(2000, function () {
          showMess(mess, idx + 1 < $elements.length ? idx + 1 : 0);
        });
      }
    });
  }]);



