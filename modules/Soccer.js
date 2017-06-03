import React from 'react'

var Soccer = React.createClass({
	getInitialState: function() {
		return {
		    league: "426"
		};
	},

	componentDidMount() {
	  this.sendRequest("426");
	},

	handleChange: function(e) {
		this.setState({league:e.target.value});
		this.sendRequest(e.target.value);
	},

	sendRequest: function(id) {
		var url = 'http://api.football-data.org/v1/competitions/'+id+'/leagueTable';
		var xmlhttp = new XMLHttpRequest();
		var data;
		var to_process = this.updateTables;
		xmlhttp.onreadystatechange = function() {
		  if (xmlhttp.readyState == XMLHttpRequest.DONE) {
		      data = xmlhttp.response;
		      to_process(JSON.parse(data));
		  }
		};
		xmlhttp.open("GET", url);
		xmlhttp.setRequestHeader("X-Auth-Token", "e5137d9c30a84d3d9ad3d0745923aa52");
		xmlhttp.send();
	},

	updateTables: function(data) {
		var teams = data["standing"];
		//console.log('updating tables: ' + teams[0]);
		this.setState({teams: teams});
	},

	leagueName: function(id) {
		var id_mapping = {	426 : "Premier League",
							430 : "Bundesliga",
							436 : "La Liga",
							438 : "Serie A",
							439 : "Portugese Liga"
		};
		return id_mapping[id];
	},

	generateStanding: function() {
	  var teams = this.state.teams;
	  if(teams==null){return null;}
	  //console.log('generated these teams ' + teams[0].teamName);
	  var lines = [];
	  for(var a = 0; a < teams.length; a++) {
			lines.push(
			<tr key={'team_' + teams[a].position}><td>{teams[a].position}
			</td><td>{teams[a].teamName}
			</td><td>{teams[a].points}
			</td><td>{teams[a].playedGames}
			</td><td>{teams[a].goals}
			</td><td>{teams[a].goalDifference}</td></tr>
			);
	  }
	  return lines;
	},

	render: function() {
	return (
	  <div className="container">
	    <div className="container">
			<h1>Football Web App</h1>
			<select id="table-current"
			        value={this.state.league}
			        onChange={this.handleChange}>
				<option value="438">Serie A</option>
				<option value="426">Premier League</option>
				<option value="436">La Liga</option>
				<option value="430">Bundesliga</option>
				<option value="439">Portugese Liga</option>
			</select>
		</div>
		<div className="leaguebox">
			<h2>{this.leagueName(this.state.league)}</h2>
			<table className="center">
				<thead><tr>
					<th>Position</th>
					<th>Team</th>
					<th>Points</th>
					<th>Games</th>
					<th>Goals</th>
					<th>Difference</th>
				</tr></thead>
				<tbody id="standing">
					{this.generateStanding()}
				</tbody>
			</table>
		</div>
	  </div>
	)
  }
});

export default Soccer
