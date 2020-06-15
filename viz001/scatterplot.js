var margin = {top: 60, right:30, bottom: 20, left:20},
	width = 460 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

var svg2 = d3.select("#scatter")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.attr("fill","pink")
	.append("g")
		.attr("transform", "translate("+ margin.left + "," + margin.top + ")");

		d3.csv("./predicteddata.csv", function(data){
			categories = data.columns;
			console.log(data);

			var x = d3.scaleLinear()
				.domain([0, d3.max(data,d => { return +d.NumDeaths})])
				.range([0, width]);
			
			var barwidth = x(0.4);
			var padding = -5; 

			svg2.append("g")
				.attr("transform","translate("+barwidth+"," + height  + ")")
				.call(d3.axisBottom(x).ticks(5));

			var y = d3.scaleLinear()
				.domain([0, d3.max(data, d => {return +d.ObservedFrequency}) + 10])
				.range([height, 0]);
			
			svg2.append("g")
				.attr("transform","translate("+ padding+ ","+padding+")")
				.call(d3.axisLeft(y).ticks(3));
			
			//append bars to graph
			svg2.selectAll("rect")
				.data(data)
				.enter()
				.append("rect")
					.attr("class","bar")
					.attr("x", d => {return x(parseInt(d.NumDeaths)) })
					.attr("y", d => {return y(parseInt(d.ObservedFrequency))})
					// .attr("y", d=> {return y(parseInt(d.ObservedFrequency))})
					.attr("width",barwidth)
					.attr("height", d=> {return height - y(parseInt(d.ObservedFrequency)) + padding})
					.style("fill", "orange");
			dashWidth = 9;
			var fillPattern = svg2.append("defs")
				.append("pattern")
			    .attr('id', 'hash')
			    .attr('patternUnits', 'userSpaceOnUse')
			    .attr('width', dashWidth)
			    .attr('height', dashWidth)
			    .attr("x", 0).attr("y", 0)
			    .append("g").style("fill", "none")
			    .style("stroke", "orange")
			    .style("stroke-width", 2);
			fillPattern.append("path").attr("d", "M0,0 l"+dashWidth+","+dashWidth);
			// fillPattern.append("path").attr("d", "M"+dashWidth+",0 l-"+dashWidth+","+dashWidth);
			
			svg2.selectAll("rect2")
				.data(data)
				.enter()
				.append("rect")
					.attr("class", "bar2")
					.attr("x", d => {return x(parseInt(d.NumDeaths)) + barwidth})
					.attr("y", d => {return y(parseInt(d.PredictedFrequency))})
					.attr("width", barwidth)
					.attr("height", d => {return height - y(parseInt(d.PredictedFrequency)) + padding})
					.attr("style", "fill:url(#hash)");
			var lineFunction = d3.line()
				.x(d => {return x(parseInt(d.NumDeaths))+barwidth})
				.y(d => {return y(parseInt(d.ObservedFrequency))})
				.curve(d3.curveCatmullRom);			

			var trendline = svg2.append("path")
				.attr("d", lineFunction(data))
				.attr("stroke", "blue")
				.attr("stroke-width",2)
				.attr("fill","none");
			var points = svg2.selectAll(".dots")
				.data(data)
				.enter()
				.append("circle")
				.attr("class","dot")
				.attr("cx", d => {return x(parseInt(d.NumDeaths))+barwidth})
				.attr("cy",( d => {return y(parseInt(d.PredictedFrequency)) + padding}))
				.attr("r", 0);
			
		});
