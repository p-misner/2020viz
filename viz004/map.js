// import {legend} from "@d3/color-legend"
// topojson = require("topojson-client@3")
// d3 = require("d3@5")

var margin = {top: 20, left: 20, right: 20, bottom:20};
var height = 600 - margin.top - margin.bottom;
var width = 1000- margin.left - margin.right;
var svg = d3.select("#map")
	.attr("viewBox", [0, 0, width + margin.right + margin.left, height+ margin.top + margin.bottom])
	.style("background-color", "none");
var div = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 1);
let rsvg = document.getElementById("map");
let rc = rough.svg(rsvg);
// let rect = rc.rectangle(220, 15, 80, 80, { bowing: 6, stroke: 'green', strokeWidth: 3 });
// rsvg.appendChild(rect)
// let node = rc.rectangle(10, 10, 200, 200,{
// 	fill:'blue',
// 	hachureAngle: 60,
// 	hachureGap: 8,
// 	fillWeight:3
// }); // x, y, width, height, decor
// rsvg.appendChild(node);



var map = d3.map();

var files = ["https://raw.githubusercontent.com/p-misner/100daysofvisualization/master/viz004/states-albers-10m.json", "./data/stateterm.json"];

var myColor = d3.scaleLinear().domain([1,2,3])
  .range(["#043691", "#707173", "#f5ca0a"]);

var promises = [
	d3.json(files[0]),
	d3.json(files[1], d=>{
	})
];

files.forEach(function(url) {
    promises.push(d3.json(url))
});

Promise.all(promises).then(function([values, statedata]){
	statedata.forEach(d =>{
		map.set(d.states,d.mort)
	})

	// var features = topojson.feature(values, values.objects.states).features;
	// features.forEach((d,j)=>{
	// 	var path = rc.path(d3.geoPath()(d),{
	// 		fill:"green"
	// 	});
	// 	rsvg.appendChild(path);
	// });

	svg.append("g")
	.selectAll("path")
	.data(topojson.feature(values, values.objects.states).features)
	.join("path")
		.attr("fill", d=> {return myColor(map.get(d.properties.name))})
		.attr("d", d3.geoPath())
		// .attr("class", "state")
		.on("mouseover", d=>{
			console.log("enter");
			div.transition()
				.duration(200)
				.style("opacity", 0.9);
			div.html(`<p> ${d.properties.name}: ${map.get(d.properties.name)}<p>`)
				.style("left", d3.event.pageX +"px")
				.style("top", (d3.event.pageY -15)+"px")
		})
		.on("mouseout", d =>{
			div.transition()
				.duration(200)
				.style("opacity", 0);
		});
	var oldpath = svg.append("path")
      .datum(topojson.mesh(values, values.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "#ffffff")
      .attr("stroke-linejoin", "round")
      .attr("d", d3.geoPath());

	// let p = (oldfill["_groups"][0][0]["outerHTML"].split(" "));
	// p = (p[4].split('"')[1]);
	// console.log(p);
	// var rpath = rc.path(p, 
	// 	{fill: 'green'});
	// rsvg.appendChild(rpath);

}).catch((err) => console.log(err));





		