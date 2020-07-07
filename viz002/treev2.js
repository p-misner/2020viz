console.log("woo");

//goals: visualize the green eggs data
// resize it
var margin = {top: 200, right: 20, bottom:20, left:200};
var width = 960 - margin.right - margin.left;
var height = 500 - margin.top-margin.bottom;
var radius = width/4;

var i = 0;
var root;
var duration = d3.event && d3.event.altKey ? 2500 : 250;
var logScale = d3.scaleLog()
	.domain([1, 70])
	.range([2, 19]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")")
	.style("background-color","floralwhite");

var data = d3.json("./greeneggs.json").then(function(data){
	console.log(data);
	var tree = d3.tree()
		.size([2*Math.PI, radius])
		.separation((a,b) => (logScale(a.value) > logScale(b.value) ? 1.2*logScale(a.value) : 1.2*logScale(b.value) )/a.depth);
	root = d3.hierarchy(data, function(d) { return d.children; });
	root.x0 = height / 2;
	root.y0 = 0;

	// data = d3.hierarchy(data)
		// 	.sort((a,b) => d3.ascending(a.data.name, b.data.name));
		
		
		

		// svg.append("g")
		// 	.attr("transform", "translate(" + (width / 2 + 0) + "," + (height / 2 + 0) + ")")
		// 	.attr("fill","none")
		// 	.attr("stroke", "#555")
		// 	.selectAll("path")
		// 		.data(root.links())
		// 		.join("path")
		// 			.attr("d", d3.linkRadial()
		//           	.angle(d => d.x)
		//           	.radius(d => d.y));

	root.children.forEach(collapse);
	update(root);
	// function update(source) {
		// 	var nodes = root.descendants();
		// 	var links = root.links();

		// 	nodes.forEach(d=> { d.y = d.depth*80;});

		// 	var node = svg.selectAll("g.node")
		// 		.data(nodes, d => { return d.id || (d.id = ++i);});
			
		// 	//enter new nodes at pos. of parent
		// 	var nodeEnter = node.enter().append("g")
		// 		.attr("class", "node")
		// 		.on("click", click);
		// 	nodeEnter.append("circle")
		// 		.attr("r", 1e-6)
		// 		.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff";})
		// 		.append("text")
		// 			.attr("x", 6)
		// 			.attr("dy",".35em")
		// 			.attr("text-anchor", "start")
		// 			.text(d => {return d.name})
		// 			.style("fill-opacity", 1e-6);
		
		// 	//new node pos.
		// 	var nodeUpdate = node.transition()
		// 		.duration(duration)
		// 		.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
		// 		.select("circle")
		// 			.attr("r", 4.5)
		// 			.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
		// 			.select("text")
		// 				.style("fill-opacity", 1)
		// 				.attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length + 50)  + ")"; });

		// 	var nodeExit = node.exit()
		// 		.transition()
		// 		.duration(duration)
		// 		.remove();
		// 		nodeExit.select("circle")
		// 			.attr("r", 1e-6)
		// 			.select("text")
		// 				.style("fill-opacity", 1e-6)
		// 	// Update the links…
		// 	var link = svg.selectAll("path.link")
		// 	  .data(links, function(d) { return d.target.id; });

		// 	// Enter any new links at the parent's previous position.
		// 	link.enter().insert("path", "g")
		// 	  .attr("class", "link")
		// 	  .attr("d", function(d) {
		// 	    var o = {x: source.x0, y: source.y0};
		// 	    return diagonal({source: o, target: o});
		// 	  });

		// 	// Transition links to their new position.
		// 	link.transition()
		// 	  .duration(duration)
		// 	  .attr("d", diagonal);

		// 	// Transition exiting nodes to the parent's new position.
		// 	link.exit().transition()
		// 	  .duration(duration)
		// 	  .attr("d", function(d) {
		// 	    var o = {x: source.x, y: source.y};
		// 	    return diagonal({source: o, target: o});
		// 	  })
		// 	  .remove();

		// 	// Stash the old positions for transition.
		// 	nodes.forEach(function(d) {
		// 		d.x0 = d.x;
		// 		d.y0 = d.y;
		// 	});
		


		// }
	
	function update(source) {
		var tData = tree(root);

		var nodes = tData.descendants();
		var links = tData.descendants().slice(1); //root.links()

		/* 		Nodes Section 		*/
		//step 1: update nodes
		var node = svg.selectAll("g.node")
			.data(nodes, d=> {return d.id || (d.id = ++i); });

		//step 2: enter new nodes at prior position
		var nodeEnter = node.enter().append("g")
			.attr("class","node")
			.on("click", click);

		nodeEnter = node.append("circle")
			.attr("class","node")
			// .attr("transform", "translate(" + (width / 2 + 0) + "," + (height / 2 + 0) + ")")
			.attr("r",1e-6)
			.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
		// Add labels for the nodes
		  nodeEnter.append('text')
		      .attr("dy", ".35em")
		      .attr("x", function(d) {
		          return d.children || d._children ? -13 : 13;
		      })
		      .attr("text-anchor", function(d) {
		          return d.children || d._children ? "end" : "start";
		      })
		      .text(function(d) { return d.data.name; });
		var nodeUpdate = nodeEnter.merge(node);
		nodeUpdate.transition()
			.duration(duration)
			.attr("transform", d => `
		        rotate(${d.x * 180 / Math.PI - 90})
		        translate(${d.y },0)
		     `);
		nodeUpdate.select("circle.node")
	      .attr("r", 10)
	      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
	      .attr("cursor", "pointer");






	}

});



function click(d) {
	if (d.children) {
		d._children = d.children;
		d.children = null;
	} else {
		d.children = d._children;
		d._children = null;
	}
  	update(d);
}

// Collapse nodes
function collapse(d) {
 	if (d.children) {
		d._children = d.children;
		d._children.forEach(collapse);
		d.children = null;
    }
}