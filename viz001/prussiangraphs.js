var margin = {top: 60, right:30, bottom: 20, left:110},
	width = 660 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

// var svg = d3.select("#density")
// 	.append("svg")
// 	.attr("width", width + margin.left + margin.right)
// 	.attr("height", height + margin.top + margin.bottom)
// 	.append("g")
// 	.attr("transform", "translate("+margin.left+","+margin.top+")");

// //import data
// d3.csv("./kickdata.csv", function(data){
// 	// var cat = data.columns;
// 	var cat = data.columns;
// 	var n = cat.length;
	
	
// 	//add X axis
// 	var x = d3.scaleLinear()
// 		.domain([-10, 10])
// 		.range([0, width]);
// 	svg.append("g")
// 		.attr("transform","translate(0,"+height+")")
// 		.call(d3.axisBottom(x));

// 	//create y scale for densities
// 	var y = d3.scaleLinear()
// 		.domain([0, 4])
// 		.range([height, 0]);

// 	//create the y axis for names
// 	var yName = d3.scaleBand()
// 		.domain(cat)
// 		.range([0, height])
// 		.paddingInner(1);
// 	svg.append("g")
// 		.call(d3.axisLeft(yName));

// 	//kernel density per column
// 	var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)); 
// 	var allDensity = [];
// 	for (i=1; i < n; i++){

// 		key = cat[i];
// 		density = kde(data.map(function (d){return d[key];}));
// 		allDensity.push({key: key, density: density});
// 	}
// 	//Add areas
// svg.selectAll("areas")
// 	.data(allDensity)
// 	.enter()
// 	.append("path")
// 		.attr("transform", function(d){return("translate(0"+ (yName(d.key)-height) +")" )})
// 		.datum(function(d){return(d.density)})
// 		.attr("fill","#69b3a2")
// 		.attr("stroke","#000")
// 		.attr("stroke-width", 1)
// 		.attr("d", d3.line()
// 			.curve(d3.curveBasis)
// 			.x(function(d){ return x(d[0]);})
// 			.y(function(d){ return y(d[1]);})
// 		)
// });

var svg3 = d3.select("#densityv2")
	.append("svg")
	.attr("width", 1.3*width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate("+margin.left+","+margin.top+")");

d3.csv("./kickdata.csv", function(data){
	// console.log(data[1]);
	// for(let i=0; i<20; i++){
	// 	console.log(data[1][75+i]);
	// }
	//X scale
	let years = [];
	for(let i=1874; i<1894; i++){
		years.push((i+1).toString())
	}

	// var x = d3.scaleBand()
	// 	.domain(years)
	// 	.range([0, 1.3*width]);
	var x = d3.scaleLinear()
		.domain([75,94])
		.range([0, 1.3*width]);

	//X Axis
	svg3.append("g")
		.attr("transform","translate(0,"+ height+")")
		.call(d3.axisBottom(x).ticks(years.length));
	//Y Scale
	var y = d3.scaleLinear()
		.domain([0,5])
		.range([height,0]);
	//Y Axis 
	svg3.append("g")
		.call(d3.axisLeft(y).ticks(5));

	// Creating Densities
	var keys = d3.keys(data[0]).filter(word => word != "Corps");
	console.log(data.length);
	var lineFunction = d3.line()
				.x(d => {console.log(x(d[0]));return x(d[0])})
				.y(d => {return y(d[1])})
				.curve(d3.curveCardinal.tension(0.4));

	let matrix = [];
	for(let j = 0; j < data.length; j++){
		matrix = [];
		for(let i = 0; i < keys.length; i++){
			matrix.push([parseInt(keys[i]), parseInt(data[j][parseInt(keys[i])])])
		}
		console.log(matrix);
	svg3.append("path")
		.attr("d", lineFunction(matrix))
		.attr("fill", "none")
		.attr("stroke", "red")
		.attr("stroke-width", 1.5);
	}


	

	// svg3.append("path")
	// 	.attr("d", lineFunction(matrix))
	// 	.attr("fill", "none")
	// 	.attr("stroke", "red")
	// 	.attr("stroke-width", 1.5);





});




// Compute Kernel Density Estimation
function kernelDensityEstimator(kernel, X) {
  return function(V) {
    return X.map(function(x) {
      return [x, d3.mean(V, function(v) { return kernel(x - v); })];
    });
  };
}
function kernelEpanechnikov(k) {
  return function(v) {
    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
  };
}
