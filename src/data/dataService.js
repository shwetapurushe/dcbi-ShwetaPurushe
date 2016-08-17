/**
 * Created by Shweta on 8/16/16.
 */
(function(){
	"use strict";
	angular.module('dcbiApp.data', []);
	angular.module('dcbiApp.data').service('dataService',dataService);

	function dataService (){
		var that = this;
		that.geneCollection;

		/*this function processes the tabbed data format to give us a reusable json structure
		* */
		that.parseDataToObject = function(tabbedFormat)
		{
			that.geneCollection = [];//flushing out for new loops

			//new lines//TODO figure out a way not to hard code this
			var lines = tabbedFormat.split('\n');
			var dataType = lines[0];
			var metadata = lines[1];
			var geneIds = lines[2].split('\t');
			var mutations = lines[3].split('\t');

			var geneCounter = geneIds.length;
			for(var i = 0; i < geneCounter ; i++)
			{
				var obj = {};
				obj.key = geneIds[i];
				obj.value = mutations[i];
				that.geneCollection[i] = obj;
			}

			window.blah = _.filter(that.geneCollection, function(o){return !o.value.toString().match("NaN"); });

		}
	}
})();