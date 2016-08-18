/**
 * this d3 file renders a d3 heat map
 *
 * @ author spurushe
 */

if(!this.d3_viz){
	this.d3_viz = {};
}





(function(){

	function BarChart (){



		this._container;
		this._margin;
		this._width;
		this._height;
		this._barchartSvg;

		this._yScale;
		this._xScale;
		this._xAxis;
		this._yAxis;


		this._colorRamp;
		this._colorScale;
		this._toolTip;

		this._data;
		this._labels;


	};

	var p = BarChart.prototype;

	window.d3_viz.BarChart = BarChart;


	//initializes the bar chart
	p.initialize = function(config){

		this._container = config.container;
		this._data = config.data;

		this._margin =  {top: 50, right: 50, bottom: 50, left: 50};

		this._width = this._container.offsetWidth - this._margin.left;
		this._height = this._container.offsetHeight == 0 ? 200 : this._container.offsetHeight - this._margin.top;

		// Scaling Functions
		this._xScale = d3.scale.ordinal()
			.rangeRoundBands([0, this._width], .1);

		this._yScale  = d3.scale.linear()
			.range([this._height, 0]);

		this._xAxis = d3.svg.axis()
			.scale(this._xScale)
			.orient("bottom");

		this._yAxis = d3.svg.axis()
			.scale(this._yScale)
			.orient("left")
			.ticks(10, "%");



		//original SVG
		this._barchartSvg = d3.select(this._container).append("svg")
			.attr("width", this._width + this._margin.left + this._margin.right)
			.attr("height",this._height + this._margin.top + this._margin.bottom )
		.append("g")
			.attr("transform","translate(" + this._margin.left + "," + this._margin.top + ")");


		//toolTip
		this._toolTip = d3.select(this._container)
			.append("div")
			.style("visibility", "hidden")
			.attr("class", "toolTip")
			.text("");
	};

	/**
	 * function to draw a barchart
	 *  dom_element_to_append_to: the HTML element to which the barchart D3 viz is appended
	 */
	p.render = function(){


		if(!this._barchartSvg){
			console.log("Bar chart still initializing");
			setTimeout(p.render, 100);
		}

		var data = this._data;

		this._xScale.domain(data.map(function(d) { return d.label; }));
		this._yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

		this._barchartSvg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + this._height + ")")
			.call(this._xAxis);

		this._barchartSvg.append("g")
			.attr("class", "y axis")
			.call(this._yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Frequency");

		this._barchartSvg.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return this._xScale(d.label); }.bind(this))
			.attr("width", this._xScale.rangeBand())
			.attr("y", function(d) { return this._yScale(d.value); }.bind(this))
			.attr("height", function(d) { return this._height - this._yScale(d.value); }.bind(this));




	};


})();
