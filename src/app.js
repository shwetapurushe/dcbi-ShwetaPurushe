/**
 * Created by Shweta on 8/16/16.
 */
(function(){
	"use strict";

	//creating the main app module (parent module)
	angular.module('dcbiApp', [
								'dcbiApp.data',
								'dcbiApp.viz'
	]);

	//using the value provider recipe
	angular.module('dcbiApp').value("MUTATION", 'mutation');
	angular.module('dcbiApp').value("CCN", 'ccn');
	angular.module('dcbiApp').value("BOTH", 'both');



	//main app controller (this is the parent of all controllers)
	angular.module('dcbiApp').controller('dcbiAppController', dcbiAppController);

	dcbiAppController.$inject = ['$scope','dataService', 'queryService', 'MUTATION', 'CCN', 'BOTH'];
	function dcbiAppController($scope,dataService,queryService, MUTATION, CCN, BOTH)
	{
		var dcbiCtrl = this;
		dcbiCtrl.dataService = dataService;

		dcbiCtrl.gene = "";//empty string uninitiated

		dcbiCtrl.createRequest = createRequest;

		function createRequest ()
		{
			/*var type;
			if(dcbiCtrl.mutation && !dcbiCtrl.ccn)
				type = MUTATION;
			else if (dcbiCtrl.ccn && !dcbiCtrl.mutation)
				type=CCN;
			else
				type = BOTH;*/

			queryService.createRequest(dcbiCtrl.gene,dcbiCtrl.type);
		}

	}

})();//will be using the IIFE pattern through out project