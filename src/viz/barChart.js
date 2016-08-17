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
			templateUrl: 'src/viz/barChartPartial.html',
			scope:{
				inheritedgene :'='
			},
			controller : barChartController,
			controllerAs : 'bcController',
			bindToController: 'true',
			link :function ()
			{

			}
		}//the directive definiton object
	}


	barChartController.$inject = ['$scope','dataService'];
	function barChartController ($scope, dataService)
	{
		console.log("scope", d3);
		var yAxis;
		var xAxis;
		var y;
		var x;
		var svg;
		var bcController = this;

		var margin, width, height;
		margin = {top: 20, right: 20, bottom: 30, left: 40};
		width = 960 - margin.left - margin.right;
		height = 500 - margin.top - margin.bottom;

		/*x = d3.scale.ordinal()
			.rangeRoundBands([0, width], .1);

		y = d3.scale.linear()
			.range([height, 0]);

		xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(10, "%");

		svg = d3.select("#BarChart").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		x.domain(dataService.geneCollection.map(function(d) { return d.key; }));
		y.domain([0, d3.max(dataService.geneCollection, function(d) { return d.value; })]);

		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Frequency");

		svg.selectAll(".bar")
			.data(dataService.geneCollection)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.key); })
			.attr("width", x.rangeBand())
			.attr("y", function(d) { return y(d.value); })
			.attr("height", function(d) { return height - y(d.value); });

		function type(d) {
			d.value = +d.value;
			return d;
		}*/

	}
})();