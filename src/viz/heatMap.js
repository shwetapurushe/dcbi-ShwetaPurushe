/**
 * Created by Shweta on 8/18/16.
 */
//angular directive for a heat map
(function(){
	"use strict";

	angular.module('dcbiApp.viz').directive('heatMap', heatMap);

	function heatMap ()
	{
		return {
			restrict :'EA',
			templateUrl: 'src/viz/heatMapPartial.html',
			scope:{
				inheritedgene :'=',
				data:'='
			},
			//controller : heatMapController,
			//controllerAs : 'hmController',
			bindToController: 'true',
			link :function (scope, elem, attrs)
			{

				var dom_element_to_append_to = document.getElementById('HeatMap');


				scope.$watch(function(){
					return scope.data;
				}, function(){
					if(scope.data)
					{
						var genesCopy = scope.data.allGenes.concat();
						genesCopy.shift();
						genesCopy.shift();
						var config = {
							data:genesCopy,
							container : dom_element_to_append_to
						};

						var hm = new window.d3_viz.HeatMap();//create
						hm.initialize(config);//initialize
						hm.render();//render
					}
				});
			}
		}//the directive definiton object
	}

})();