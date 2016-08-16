(function(){
	//this service will be used to use ANY RESt API.
	"use strict";
	angular.module('dcbiApp.data').service('queryService', queryService);


	queryService.$inject = ['$http'];
	function queryService($http)
	{
		var that = this;//storing this because refernce to 'this' is lost during a promise

		that.makeRequest = function()
		{
			$http({
				method: 'GET',
				url: ''
			}).then(function successCallback(response) {
				// this callback will be called asynchronously when the response is available
				console.log("response", response.data);
			}, function errorCallback(response) {
				// called asynchronously if an error occurs or server returns response with an error status.
				console.log("error", response);
			});
		}
	}

})();