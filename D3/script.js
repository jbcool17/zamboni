var bardata = [20, 30, 45, 15, 50];
var nhlData = [{"Rank": 1, "Team": "Rangers", "GP":28, "W": 50, "L": 6, "OT": 3},
				{"Rank": 2, "Team": "Islanders", "GP":28, "W": 6, "L": 19, "OT": 3},
				{"Rank": 3, "Team": "Flyers", "GP":26, "W": 17, "L": 19, "OT": 3},
				{"Rank": 4, "Team": "Bruins", "GP":28, "W": 35, "L": 19, "OT": 3},
				{"Rank": 5, "Team": "Ducks", "GP":28, "W": 23, "L": 19, "OT": 3}]

				
// for (var i = 0; i < 50; i++) {
// 	bardata.push(Math.round(Math.random()*100) + 2);
// }

// bardata.sort(function(a,b){return a - b})

var height = 400,
	width = 100,
	barWidth = 50,
	barOffset = 5;

var yScale = d3.scale.linear()
		.domain( [ 0, d3.max(bardata) ] )
		.range([0, height])

var chart = d3.select('#chart').append('svg')
				.attr( 'width', width + '%' )
				.attr( 'height', height )
				.style( 'background', 'tomato')
				.style('padding', '10'+'px')
				.selectAll('rect').data(nhlData)
				.enter().append('rect')
					.style('fill', 'lightblue')
					.attr('width', barWidth)
					.attr('height', function(d){
						return yScale(d.W);
					})
					.attr('x', function( d, i){
						return i * (barWidth + barOffset );
					})
					.attr('y', function(d){
						console.log(d)
						return height - yScale(d.W-5);
					})