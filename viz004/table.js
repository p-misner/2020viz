var margin = {top: 20, left: 20, right: 20, bottom:20};
var height = 600 - margin.top - margin.bottom;
var width = 1200- margin.left - margin.right;

var tsvg= d3.select("#table")
	.attr("viewBox", [0, 0, width + margin.right + margin.left, height+ margin.top + margin.bottom])
	.style("background-color", "none");

	d3.csv("https://raw.githubusercontent.com/p-misner/100daysofvisualization/master/viz004/data/table.csv")
	.then(function(data){
		var sortAscending = true;
		var table = d3.select("#table").append("table");
		var titles = d3.keys(data[0]);
		var headers = table.append("thead").append("tr")
			.selectAll("th")
			.data(titles)
			.enter()
			.append("th")
			.text(d => {
				return d;
			})
			.on("click", d=>{
				headers.attr("class","header");
				if (sortAscending) {
					rows.sort(function(a,b){return b[d] <a[d]});
					sortAscending = false;
					this.className ='aes';
				} else {
					rows.sort(function(a,b){return b[d] > a[d]});
					sortAscending = true;
					this.className = 'des';
				}
			});
		var rows = table.append("tbody")
			.selectAll("tr")
			.data(data)
			.enter()
			.append("tr");
		rows.selectAll("td")
			.data(d=>{
				return titles.map(k =>{
					return{value: d[k], name: k}
				});
			})
			.enter()
			.append("td")
			.attr("data-th", d =>{return d.name})
			.text(d => d.value);

	}); 

function clickChange(d){
	headers.attr("class","header");
	if (sortAscending) {
		rows.sort(function(a,b){return b[d] <a[d]});
		sortAscending = false;
		this.className ='aes';
	} else {
		rows.sort(function(a,b){return b[d] > a[d]});
		sortAscending = true;
		this.className = 'des';
	}
}