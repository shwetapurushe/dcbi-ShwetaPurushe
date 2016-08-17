/**
 * Created by Shweta on 8/16/16.
 */
//angular directive for a text tool
(function(){
	"use strict";

	angular.module('dcbiApp.viz').directive('textTool', textTool);

	function textTool ()
	{
		return {
			restrict :'E',
			templateUrl: 'src/viz/textToolPartial.html',
			scope:{
				inheritedgene :'='
			},
			controller : textToolController,
			controllerAs : 'ttController',
			bindToController: 'true',
			link :function ()
			{

			}
		}//the directive definiton object
	}


	textToolController.$inject = ['$scope','dataService'];
	function textToolController ($scope, dataService)
	{
		var ttController = this;
		ttController.dataService = dataService;
	}
})();