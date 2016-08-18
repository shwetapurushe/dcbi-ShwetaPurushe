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
				var config;
				var mydata;
				var dom_element_to_append_to = document.getElementById('HeatMap');

				/*var array1 = [1,6,9,4];
				var array2= [6.6,2,5,10];
				var array3= [2,7,8,1];
				var array4= [4,5,3,1.9];
				var array5= [1,3.4,5,10];
				var mydata = [array1, array2, array3, array4];
				var labels = ["one", "two", "three", "four"];

				config = {
				    data:mydata,
					labels: labels,
				    container : dom_element_to_append_to
				 };

				 var hm = new window.d3_viz.HeatMap();//create
				 hm.initialize(config);//initialize
				 hm.render();//render*/

				scope.$watch(function(){
					return scope.data;
				}, function(){
					if(scope.data)
					{
						var values = [];
						var genes = scope.data.allGenes;

						var labels = [];


						var totalLen = genes.length;
						for(var i = 2;i < totalLen; i++ )
						{
							var geneObj = genes[i];
							labels.push(geneObj.key);
							values.push([geneObj.value]);
							/*var cnObj = scope.data[copyNumberInfo[i]];//pick up one obj
							var counter = Object.keys(cnObj);
							for(var j = 0; j < counter; j++)//get all its values
							{

							}*/

							//massagedData.push(scope.data[labels[i].value]);
						}

						var config = {
							data:values,
							labels:labels,
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