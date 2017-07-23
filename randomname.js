
function randomFromArray(array) {
    return array[randomRange(0, array.length - 1)];
}

function randomRange(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

// This is the AngularJS Controller
var app = angular.module('randomNameApp', []);
app.controller('myCtrl', function($scope, $http) {

    $scope.randomCount = 0;

    $http({
        url: "names.txt",
        method: 'GET',
        transformResponse: undefined,
    }).then(function(response) {
        $scope.namesList = response.data.split("\n");
        
        $scope.randomName = function() {
            var name = randomFromArray($scope.namesList);
            $scope.randomCount += 1;
            return name;
        }

        $scope.regenerate();


    });

    $scope.regenerate = function () {
        var outNames = [];
        for (i = 0; i < 10; i++) {
            var row = [];
            for (j = 0; j < 10 ; j++) {
                row.push($scope.randomName());
            }
            outNames.push(row);
        }
        $scope.outputNames = outNames;
    }

});
