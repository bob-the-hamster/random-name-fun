
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
            let name = randomFromArray($scope.namesList);
            $scope.randomCount += 1;
            return name;
        }

        $scope.regenerate();

    });
    
    $scope.synthesizeName = function () {
        let name1 = $scope.randomName();
        for(let i = 0; i < 10; i++) {
            let segmentOffset = randomRange(1, name1.length - 2);
            let segment = name1.substring(segmentOffset, segmentOffset + 2);
            // Try 100 times to find another name that can be grafted together on the segment
            for(let i = 0; i < 100; i++) {
                let name2 = $scope.randomName().toLowerCase();
                let foundAt = name2.indexOf(segment);
                if (foundAt >= 0) {
                    outName = name1.substring(0, segmentOffset) + name2.substring(foundAt, name2.length)
                    return outName;
                }
            }
        }
        // After 1000 attempts, it is time to give up, and just return the first name unmodified
        return name1;
    }

    $scope.regenerate = function () {
        outNames = [];
        for (let i = 0; i < 10; i++) {
            let row = [];
            for (let j = 0; j < 10 ; j++) {
                //row.push($scope.randomName());
                row.push($scope.synthesizeName());
            }
            outNames.push(row);
        }
        $scope.outputNames = outNames;
    }

});
