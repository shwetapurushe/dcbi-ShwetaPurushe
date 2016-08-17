(function(){
	//this service will be used to use ANY RESt API.
	"use strict";
	angular.module('dcbiApp.data').service('queryService', queryService);


	queryService.$inject = ['$http', 'dataService'];
	function queryService($http, dataService)
	{
		var that = this;//storing this because refernce to 'this' is lost during a promise
		that.dataService = dataService;

		that.makeRequest = function()
		{
			$http({
				method: 'GET',
				url: 'http://www.cbioportal.org/webservice.do?cmd=getProfileData&genetic_profile_id=gbm_tcga_mutations&id_type=gene_symbol&gene_list=TP53&case_set_id=gbm_tcga_cnaseq'
			}).then(function successCallback(response) {// this callback will be called asynchronously when the response is available

				that.dataService.parseDataToObject(response.data);//formatting the data

			}, function errorCallback(response) {// called asynchronously if an error occurs or server returns response with an error status.
				console.log("error", response);
			});
		}
	}

})();