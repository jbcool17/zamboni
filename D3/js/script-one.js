var data = [4,8,15,16,23,42];
var nhlData = [{"Rank": 1, "Team": "Rangers", "GP":28, "W": 50, "L": 6, "OT": 3},
				{"Rank": 2, "Team": "Islanders", "GP":28, "W": 6, "L": 19, "OT": 3},
				{"Rank": 3, "Team": "Flyers", "GP":26, "W": 17, "L": 19, "OT": 3},
				{"Rank": 4, "Team": "Bruins", "GP":28, "W": 35, "L": 19, "OT": 3},
				{"Rank": 5, "Team": "Ducks", "GP":28, "W": 23, "L": 19, "OT": 3},
				{"Rank": 6, "Team": "Sabers", "GP":28, "W": 18, "L": 19, "OT": 3},
				{"Rank": 7, "Team": "Oilers", "GP":28, "W": 5, "L": 19, "OT": 3},
				{"Rank": 8, "Team": "RedWings", "GP":28, "W": 20, "L": 19, "OT": 3},
				{"Rank": 9, "Team": "Flames", "GP":28, "W": 13, "L": 19, "OT": 3},
				{"Rank": 10, "Team": "Pathers", "GP":28, "W": 12, "L": 19, "OT": 3}];

rangersData = []
for (var i = 0; i < nhlData[0].length; i++ ) {
	rangersData.push(nhlData[0][i])
}

for ( record in nhlData[0]) {
	rangersData.push(record)
}


var x = d3.scale.linear()
	.domain([0, d3.max(data)])
	.range([0, 420])

var chart = d3.select('#chart')
			.selectAll('div')
				.data(nhlData)
			.enter().append("div")
				.style('width', function(d) {return x(d.W) + "px"})
				.style('background', 'steelblue')
				.style('text-align', 'right')
				.style('color', 'white')
				.style('padding', '3' + 'px')
				.style('margin', 1 + 'px')
				.text(function(d) {return 'The ' + d.Team + ' have ' + d.W + ' WINS';})

var rangersChart = d3.select('#rangers')
			.selectAll('div')
				.data(rangersData)
			.enter().append("div")
				.style('width', function(d) {return x(d) + "px"})
				.style('background', 'steelblue')
				.style('text-align', 'right')
				.style('color', 'white')
				.style('padding', '3' + 'px')
				.style('margin', 1 + 'px')
				.text(function(d) {return 'Hello'})
				
