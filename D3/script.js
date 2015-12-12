var bardata = [20, 30, 45, 15, 50];
var nhlData = [{"Rank": 1, "Team": "Rangers", "GP":28, "W": 50, "L": 6, "OT": 3},
				{"Rank": 2, "Team": "Islanders", "GP":28, "W": 6, "L": 19, "OT": 3},
				{"Rank": 3, "Team": "Flyers", "GP":26, "W": 17, "L": 19, "OT": 3},
				{"Rank": 4, "Team": "Bruins", "GP":28, "W": 35, "L": 19, "OT": 3},
				{"Rank": 5, "Team": "Ducks", "GP":28, "W": 23, "L": 19, "OT": 3},
				{"Rank": 6, "Team": "Sabers", "GP":28, "W": 18, "L": 19, "OT": 3},
				{"Rank": 7, "Team": "Oilers", "GP":28, "W": 5, "L": 19, "OT": 3},
				{"Rank": 8, "Team": "RedWings", "GP":28, "W": 20, "L": 19, "OT": 3},
				{"Rank": 9, "Team": "Flames", "GP":28, "W": 13, "L": 19, "OT": 3},
				{"Rank": 10, "Team": "Pathers", "GP":28, "W": 12, "L": 19, "OT": 3}]

				
// for (var i = 0; i < 50; i++) {
// 	bardata.push(Math.round(Math.random()*100) + 2);
// }

// bardata.sort(function(a,b){return a - b})

var height = 400,
	width = 100,
	barWidth = 80,
	barOffset = 5;



var yScale = d3.scale.linear()
		.domain( [ 0, d3.max(bardata) ] )
		.range([0, height])

//+++++++++++++++++++++++++++++++++++++++++++++++++
//CHART ONE
//+++++++++++++++++++++++++++++++++++++++++++++++++
var chart = d3.select('#chart-one').append('svg')
				.attr( 'width', width + '%' )
				.attr( 'height', height )
				.style( 'background', 'tomato')
				.style('padding', '20'+'px')
				.selectAll('g').data(nhlData)
				.enter().append('g')
					
chart.append("rect")
	.style('fill', 'lightblue')
    .attr('width', barWidth)
    .attr('height', function(d){
		return yScale(d.W);
	})
	.attr('x', function( d, i){
		return i * (barWidth + barOffset);
	})
	.attr('y', function(d){
		console.log(d)
		return height - yScale(d.W);
	})
	.on('mouseover', function(d){
		d3.select(this)
			.style('opacity', .5)
			.style('fill', 'yellow')


	})
	.on('mouseout', function(d){
		d3.select(this)
			.style('opacity', 1)
			.style('fill', 'lightblue')
	})
    

chart.append("text")
	.attr('x', function( d, i ){ return i * (barWidth + barOffset) + 7})
	.attr('y', function(d){
		return height - yScale(d.W) + 15
	})
	.attr('font-weight', 'bold')
    .text(function(d) { 
    	var output;
    	if ( d.W >= 10 ) {
    		output = d.W
    	} else {
    		output = '0' + d.W
    	}
    	return output + ' WINS'; 
    })


//+++++++++++++++++++++++++++++++++++++++++++++++++
//CHART TWO
//+++++++++++++++++++++++++++++++++++++++++++++++++
var parseTime = d3.time.format.utc("%H:%M").parse,
    midnight = parseTime("00:00");

var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.time.scale.utc()
    .domain([midnight, d3.time.day.utc.offset(midnight, 1)])
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var svg = d3.select("#chart-two").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("tweets.csv", type, function(error, data) {
  if (error) throw error;

  y.domain([0, d3.max(data, function(d) { return d.rate; })]);

  svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickFormat(d3.time.format.utc("%I %p")));

  svg.append("g")
      .attr("class", "dots")
    .selectAll("path")
      .data(data)
    .enter().append("path")
      .attr("transform", function(d) { return "translate(" + x(d.time) + "," + y(d.rate) + ")"; })
      .attr("d", d3.svg.symbol()
          .size(40));

  var tick = svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3.svg.axis()
          .scale(y)
          .tickSize(-width)
          .orient("left"))
    .select(".tick:last-of-type");

  var title = tick.append("text")
      .attr("dy", ".32em")
      .text("tweets per hour");

  tick.select("line")
      .attr("x1", title.node().getBBox().width + 6);
});

function type(d) {
  d.rate = +d.count / 327 * 60; // January 8 to November 30
  d.time = parseTime(d.time);
  d.time.setUTCHours((d.time.getUTCHours() + 24 - 7) % 24);
  return d;
}