/**
 * this d3 file renders a d3 heat map
 *
 * @ author spurushe
 */

if(!this.d3_viz){
	this.d3_viz = {};
}

(function(){

	function HeatMap ()
	{
		this._container;
		this._margin;
		this._width;
		this._height;
		this._heatMapSvg;

		this._y;
		this._x;


		this._colorScale;
		this._toolTip;

		this._data;
	};

	var p = HeatMap.prototype;

	window.d3_viz.HeatMap = HeatMap;


	//initializes the heat map
	p.initialize = function(config){

		this._container = config.container;
		this._data = config.data;

		this._margin =  {top: 10, right: 10, bottom: 20, left: 100};

		this._width = this._container.offsetWidth - this._margin.left - this._margin.right;
		this._height = this._container.offsetHeight == 0 ? this._data.length * 10 : this._container.offsetHeight - this._margin.top - this._margin.bottom;

		//original SVG
		this._heatMapSvg = d3.select(this._container).append("svg")
			.attr("width", this._width + this._margin.left + this._margin.right)
			.attr("height",this._height  + this._margin.top + this._margin.bottom)
			.append("g")
			.attr("transform", "translate(" + this._margin.left + "," + this._margin.top + ")");


		// Scaling Functions
		this._x = d3.scale.linear().range([0, this._width]);
		this._y = d3.scale.linear().range([ this._height,0]);

		//todo add error checking to ensure, what we get here is numeric columns not string columns
		// Compute the scale domains.
		this._x.domain([d3.min(this._data, function(d) { return d.value; }) , d3.max(this._data, function(d) { return d.value; }) ]);
		this._y.domain(d3.extent(this._data, function(d) { return d.id; }));

		var    yStep = 1;
		var    xStep = 1;
		this._x.domain([this._x.domain()[0] - xStep, this._x.domain()[1] + xStep]);
		this._y.domain([this._y.domain()[0] , this._y.domain()[1] - yStep ]);

		this._xAxis = d3.svg.axis().scale(this._x).orient("bottom").ticks(5);
		this._yAxis = d3.svg.axis().scale(this._y)
			.orient("left")
			.ticks(this._data.length -1)
			.tickFormat(function (col) {
				var record = this._data[col];
				var label = record ? record.key : '';
				return label;
			}.bind(this));

		this._colorScale = d3.scale.linear()
			.domain([-2,-1,0,1, 2])//TODO parameterize this according to the matrix
			.range(["red", "orange", "yellow","lightgreen","green"]);

	};



	/**
	 * function to draw a heatmap
	 *  dom_element_to_append_to: the HTML element to which the heatmap D3 viz is appended
	 */
	p.render = function(){

		var svg = this._heatMapSvg;
		var x = this._x;
		var y = this._y;
		var color = this._colorScale;
		var data = this._data;
		var xStep = 1,
			yStep = 1;

		if(!svg){
			setTimeout(p.render, 100);
		}


		// remove all previous items before render
		if(svg)
			svg.selectAll('*').remove();
		else
			return;


		svg.selectAll(".tile")
			.data(data)
			.enter().append("rect")
			.attr("class", "tile")
			.attr("x",function(d) { return x(d.value); } )
			.attr("y", function(d) { return y(d.id + yStep); })
			.attr("width", x(xStep) - x(0))
			.attr("height",  y(0) - y(yStep))
			.style("fill", function(d) { return color(d.value);});

		// Add an x-axis with label.
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + this._height + ")")
			.call(this._xAxis)
			.append("text")
			.attr("class", "label")
			.attr("x", this._width)
			.attr("y", -6)
			.attr("text-anchor", "end")
			.text("CCN");

		// Add a y-axis with label.
		svg.append("g")
			.attr("class", "y axis")
			.call(this._yAxis)
			.append("text")
			.attr("class", "label")
			.attr("y", 6)
			.attr("dy", ".71em")
			.attr("text-anchor", "end")
			.attr("transform", "rotate(-90)")
			.text("Gene ID");




	};


})();