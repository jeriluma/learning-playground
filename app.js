(function() {
	var app = angular.module("app", []);

	app.controller("myCtrl", ["$scope", function($scope) {
		$scope.message = "Hello World";
	}]);
	
})();