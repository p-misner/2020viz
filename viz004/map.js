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

var map = d3.map();

var files = ["./states-albers-10m.json", "./stateterm.json"];

var myColor = d3.scaleLinear().domain([3,10])
  .range(["#ff0008", "#faf5f5"]);

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

	svg.append("g")
	.selectAll("path")
	.data(topojson.feature(values, values.objects.states).features)
	.join("path")
		.attr("fill", d=> {return myColor(map.get(d.properties.name))})
		.attr("d", d3.geoPath())
		.attr("class", "state")
		.on("mouseover", d=>{
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
	svg.append("path")
      .datum(topojson.mesh(values, values.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "#ffffff")
      .attr("stroke-linejoin", "round")
      .attr("d", d3.geoPath());

}).catch((err) => console.log(err));




		