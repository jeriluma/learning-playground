(function() {
	var app = angular.module('app', []);
	var message = 'Hello World';

	app.controller('myCtrl', ['$scope', function($scope){
		$scope.message = message;
	}]);

	app.service('myService', [function() {
		this.message = function() {
			return message;
		};
	}]);

	app.factory('myFactory', [function() {
		return {
			message : function() {
				return message;
			}
		}
	}]);

	app.directive('myDirective', [function() {
		return {
			restrict: 'A',
			controller: ['$scope', function($scope){
				$scope.message = message;
			}],
			link: function(scope, element, attrs) {

			}
		}
	}]);
})();