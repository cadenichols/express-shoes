'use strict';

var app = angular.module('testApp', []);

app.controller('testCtrl', function($scope) {

  $scope.shoes = [{"brand":"Nike","size":"10","type":"sneaker","id":"72d62688-35c1-4990-8192-95fbfee87b03"},{"brand":"Adidas","size":"12","type":"snow","id":"1727229a-9528-4eb1-8bfd-6bb75e446f38"},{"brand":"Vans","size":"9","type":"dance","id":"a99602c7-5106-4fbc-bee3-d95267304332"}];
});

