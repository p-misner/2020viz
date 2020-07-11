// var map = d3.map()
//     .set("foo", 1)
//     .set("bar", 2);
//  console.log(map.get("foo"));

var tomap = [{letter:"a", val:"1"}, {letter:"b", val:"2"}]
const map1 = tomap.map(d=>{
	 return {d.letter : d.val}
	
});
console.log(map1);