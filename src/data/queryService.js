(function(){
	//this service will be used to use ANY RESt API.
	"use strict";
	angular.module('dcbiApp.data').service('queryService', queryService);


	queryService.$inject = ['$http', 'dataService'];
	function queryService($http, dataService)
	{
		var that = this;//storing this because refernce to 'this' is lost during a promise
		that.dataService = dataService;

		that.makeRequest = function(gene,type)
		{
			if(gene.indexOf(' ') > 0){
				var re = / /g;
				gene = gene.replace(re,'+');
			}
			var urlString = '';
			if(type == 'mutation'){
				urlString =  'http://www.cbioportal.org/webservice.do?cmd=getProfileData&genetic_profile_id=gbm_tcga_mutations&id_type=gene_symbol&gene_list='+gene+'&case_set_id=gbm_tcga_cnaseq'
			}else{
				urlString =  'http://www.cbioportal.org/webservice.do?cmd=getProfileData&genetic_profile_id=gbm_tcga_gistic&id_type=gene_symbol&gene_list='+gene+'&case_set_id=gbm_tcga_cnaseq'
			}
			$http({
				method: 'GET',
				url:urlString
			}).then(function successCallback(response) {// this callback will be called asynchronously when the response is available

				that.dataService.parseDataToObject(response.data,type)

			}, function errorCallback(response) {// called asynchronously if an error occurs or server returns response with an error status.
				console.log("error", response);
			});
		}


	}

})();