/**
 * Created by Shweta on 8/16/16.
 */
//angular directive for a bar chart
(function(){
	"use strict";
	angular.module('dcbiApp.viz', []);//creating the viz module

	angular.module('dcbiApp.viz').directive('barChart', barChart);

	function barChart (dataService)
	{
		return {
			restrict :'EA',
			templateUrl: 'src/viz/barChartPartial.html',
			scope:{
				inheritedgene :'=',
				data:'='
			},
			//controller : barChartController,
			link :function (scope, elem ,attrs)
			{
				var config;
				var mydata;
				var dom_element_to_append_to = document.getElementById('BarChart');

				scope.$watch(function(){
					return scope.data;
				}, function(){
					if(scope.data)
					{
						var calculatedData = [];

						for (var key in scope.data)
						{
							if(key.toString() !== 'allGenes')
							{
								calculatedData.push({
									label:key,
									value: Math.round((scope.data[key].length/scope.data.allGenes.length) * 100)//TODO this math should not be hard coded
								});
							}
						}

						var config = {
							data:calculatedData,
							container : dom_element_to_append_to
						};

						var bc = new window.d3_viz.BarChart();//create
						bc.initialize(config);//initialize
						bc.render();//render
					}
				});
			}
		}//the directive definiton object
	}

})();