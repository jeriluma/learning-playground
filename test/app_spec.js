describe('Unit Tests', function() {
    var $scope, ctrl,
    	message = 'Hello World';

    beforeEach(module('app'));

    var ctrlName = 'myCtrl';
    describe(ctrlName, function() {
    	beforeEach(inject(function (_$rootScope_, _$controller_) {
	        $scope = _$rootScope_.$new();

	        _$controller_(ctrlName, {
	            $scope: $scope
	        });
	    }));

	    it('should have message: ' + message, function() {
			expect($scope.message).toBe(message);
	    });
    });

    var serviceName = 'myService';
    describe(serviceName, function() {
    	var service;

    	beforeEach(inject(function (myService) {
	        service = myService;
	    }));

	    it('should have a message function', function() {
			expect(service.message()).toBe(message);
	    });
    });

    var factoryName = 'myFactory';
    describe(factoryName, function() {
    	var factory;

    	beforeEach(inject(function (myFactory) {
	        factory = myFactory;
	    }));

	    it('should have a message function', function() {
			expect(factory.message()).toBe(message);
	    });
    });

   	var directiveName = 'myDirective';
   	describe(directiveName, function() {
   		var $scope, element, controller;

   		beforeEach(inject(function(_$compile_, _$rootScope_, _$controller_){
			$scope = _$rootScope_.$new();
			element = angular.element("<div my-directive></div>");
			element = _$compile_(element)($scope);
			$scope.$digest();
		}));

		it('', function() {
			expect($scope.message).toBe(message);
		});
   	});
});