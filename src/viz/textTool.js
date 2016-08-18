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
			restrict :'EA',
			templateUrl: 'src/viz/textToolPartial.html',
			scope:{
				inheritedgene :'=',
				mutationmetrics:'=',
				copynumberdata:'=',
				type:'='
			},
			link :function ()
			{

			}
		}//the directive definiton object
	}
})();