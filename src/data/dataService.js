/**
 * Created by Shweta on 8/16/16.
 */
(function(){
	"use strict";
	angular.module('dcbiApp.data', []);//registering the data module
	angular.module('dcbiApp.data').service('dataService',dataService);


	dataService.$inject = ['$q', '$rootScope', 'MUTATION', 'CCN'];
	function dataService ($q, $rootScope, MUTATION, CCN){
		var that = this;
		that.mutationMetrics;
		that.copyNumberData;

		/*this function processes the tabbed data format to give us a reusable json structure
		* */
		that.parseDataToObject = function(tabbedFormat,type)
		{

			var geneCollection = [];//flushing out for new loops

			//new lines//TODO figure out a way not to hard code this
			var lines = tabbedFormat.split('\n');
			var dataType = lines[0];
			var metadata = lines[1];
			var geneIds = lines[2].split('\t');
			var values = lines[3].split('\t');

			var geneCounter = geneIds.length;
			for(var i = 0; i < geneCounter ; i++)
			{
				var obj = {};
				obj.key = geneIds[i];
				obj.value = values[i];
				geneCollection[i] = obj;
			}

			if(type == MUTATION)
			{
				that.mutationMetrics  = {
					validMutations : _.filter(geneCollection, function(o){return !o.value.toString().match("NaN"); }),
					allGenes: geneCollection
				};
			}else if(type == CCN)
			{
				// todo: rather than multiple filter use single forloop to collect these information
				that.copyNumberData  = {
					deletedSingleCopy : _.filter(geneCollection, function(o){return o.value.toString().match("-1"); }),
					deletedBothCopies : _.filter(geneCollection, function(o){return o.value.toString().match("-2"); }),
					gainedSingleCopy : _.filter(geneCollection, function(o){return o.value.toString().match("1"); }),
					gainedBothCopies : _.filter(geneCollection, function(o){return o.value.toString().match("2"); }),
					noChange : _.filter(geneCollection, function(o){return o.value.toString().match("NA"); }),
					allGenes: geneCollection
				};
			}
		}
	}
})();