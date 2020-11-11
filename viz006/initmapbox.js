// pk.eyJ1IjoicG1pc25lciIsImEiOiJja2c3a2s1dXYwNWd1MzFvOGVmMmkzbGxmIn0.QDUppQ5yumFxlIrrAkRkIQ

var changeOrder = 1;
var styles = ['mapbox://styles/pmisner/ckg7kudfx0v8y1amh4l8bhqha', 'mapbox://styles/mapbox/streets-v11']
var len = styles.length;
mapboxgl.accessToken = 'pk.eyJ1IjoicG1pc25lciIsImEiOiJja2c3a2s1dXYwNWd1MzFvOGVmMmkzbGxmIn0.QDUppQ5yumFxlIrrAkRkIQ';
var pos = [-122, 37.4419]
var map = new mapboxgl.Map({
	container: 'map',
	style: styles[changeOrder],
	center: pos,
	zoom:9
});


function swapSheet() {
 console.log(changeOrder + ' ---  ' +changeOrder%len);
 changeOrder = (changeOrder+1);
}