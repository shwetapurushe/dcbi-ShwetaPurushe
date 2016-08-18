(function(){
	//this service will be used to use ANY RESt API.
	"use strict";
	angular.module('dcbiApp.data').service('queryService', queryService);


	queryService.$inject = ['$http', 'dataService', 'MUTATION', 'CCN', 'BOTH'];
	function queryService($http, dataService, MUTATION, CCN, BOTH)
	{
		var that = this;//storing this because refernce to 'this' is lost during a promise
		that.dataService = dataService;

		//creates the config required for making a web service request
		that.createRequest = function(gene,type)
		{
			if(gene.indexOf(' ') > 0){
				var re = / /g;
				gene = gene.replace(re,'+');
			}
			var ccnUrl = 'http://www.cbioportal.org/webservice.do?cmd=getProfileData&genetic_profile_id=gbm_tcga_gistic&id_type=gene_symbol&gene_list='+gene+'&case_set_id=gbm_tcga_cnaseq';
			var mutationUrl = 'http://www.cbioportal.org/webservice.do?cmd=getProfileData&genetic_profile_id=gbm_tcga_mutations&id_type=gene_symbol&gene_list='+gene+'&case_set_id=gbm_tcga_cnaseq';
			switch(type)
			{
				case MUTATION:
					that.makeRequest([mutationUrl], type);
					break;
				case CCN:
					that.makeRequest([ccnUrl], type);
					break;
				case BOTH:
					that.makeRequest([mutationUrl, ccnUrl], type);
					break;
			}

		};

		//the actual request(s)
		that.makeRequest = function (urls, type)
		{
			//make the appropriate number of web service calls
			var urlCounter = urls.length;
			for(var i=0; i< urlCounter; i++)
			{
				$http({
					method: 'GET',
					url:urls[i]
				}).then(function successCallback(response) {// this callback will be called asynchronously when the response is available

					that.dataService.parseDataToObject(response.data,type);

				}, function errorCallback(response) {// called asynchronously if an error occurs or server returns response with an error status.
					console.log("error", response);
				});
			}
		}



	}

})();