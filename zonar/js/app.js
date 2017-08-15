(function() {
	var app = angular.module('app', []);

	const PAGINATION_COUNT = 20;

	app.controller('employeeCtl', [
		'$scope', 'employeeService',
		function($scope, employeeService) {
			$scope.employees = [];
			$scope.totalCount = "";
			$scope.selectedEmployee = {};
			$scope.pagination = {
				currentPage: 1,
				totalPages: 0
			};
			$scope.pageState = {
				loading: true
			}

			function getEmployees(pageCount) {
				// reset state
				$scope.pageState.loading = true;
				$scope.selectedEmployee = {};

				employeeService.getEmployees(pageCount).then(function(response) {
					$scope.employees = response.employees;

					if($scope.pagination.totalPages === 0) {
						$scope.pagination.totalPages = Math.ceil(response._results / PAGINATION_COUNT);
					}

					$scope.pageState.loading = false;
				});
			}

			// init get employees right away
			getEmployees($scope.pagination.currentPage);

			$scope.pageNext = function() {
				$scope.pagination.currentPage++;
				getEmployees($scope.pagination.currentPage);
			};

			$scope.pagePrevious = function() {
				$scope.pagination.currentPage--;
				getEmployees($scope.pagination.currentPage);
			};

			$scope.pageFirst = function() {
				$scope.pagination.currentPage = 1;
				getEmployees($scope.pagination.currentPage);
			};

			$scope.pageLast = function() {
				$scope.pagination.currentPage = $scope.pagination.totalPages;
				getEmployees($scope.pagination.currentPage);
			};

			$scope.selectEmployee = function(employee) {
				$scope.pageState.loading = true;
				$scope.selectedEmployee = employee;
				employeeService.getEmployeeSalary($scope.selectedEmployee.emp_no).then(function(response) {
					$scope.selectedEmployee.salaries = response.salaries;
					$scope.pageState.loading = false;
				});
			};

		}
	]);

	app.service('employeeService', [
		'$http',
		function($http) {
			var serviceUrl = 'https://zonardemo.ngrok.io/api/api.php';		

			this.getEmployees = function(pageCount) {
				return $http({
					method: 'GET',
					url: serviceUrl + '/employees',
					params: {
						order: 'last_name',
						page: pageCount + ', ' + PAGINATION_COUNT,
						transform: '1'
					}
				}).then(function (response) {
					return response.data;
				});
			};

			this.getEmployeeSalary = function(emp_no) {
				return $http({
					method: 'GET',
					url: serviceUrl + '/salaries',
					params: {
						order: 'emp_no',
						filter: 'emp_no,eq,' + emp_no,
						transform: '1'
					}
				}).then(function (response) {
					return response.data;
				});
			}

		}
	]);

})();