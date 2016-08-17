/**
 * Created by Shweta on 8/16/16.
 */
//angular directive for a bar chart
(function(){
	"use strict";
	angular.module('dcbiApp.viz', []);//creating the vuz module

	angular.module('dcbiApp.viz').directive('barChart', barChart);

	function barChart ()
	{
		return {
			restrict :'E',
			template: '<div>HI {{bcController.greeting}}</div>',
			controller : barChartController,
			controllerAs : 'bcController',
			bindToController: 'true',
			link :function ()
			{

			}
		}//the directive definiton object
	}


	function barChartController ()
	{
		var bcController = this;
		bcController.greeting = "BLah";
	}
})();