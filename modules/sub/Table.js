import React from 'react'

var Table = React.createClass({
  getInitialState: function () {
    return {
      league: this.props.league
    };
  },
  componentDidMount() {
    console.log('component mount');
    this.sendRequest();
  },

    sendRequest: function() {
      console.log('sending request');
      this.setState({loading: true});
      var url = 'http://api.football-data.org/v1/competitions/'+this.props.league+'/leagueTable';
      console.log(url);
      var xmlhttp = new XMLHttpRequest();
      var data;
      var process = this.updateTables;
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            data = xmlhttp.response;
            process(JSON.parse(data));
        }
      };
      xmlhttp.open("GET", url);
      xmlhttp.setRequestHeader("X-Auth-Token", "e5137d9c30a84d3d9ad3d0745923aa52");
      xmlhttp.send();
    },

  updateTables: function(data) {
    console.log('updateTables');
    var teams = data["standing"];
    this.setState({teams: teams, loading: false});
  },

  generateTables: function() {
    console.log('generating tables');
    var loading = this.state.loading;
    var teams = this.state.teams;
    if(loading || teams==null) {
        return null;
    }
        var lines = [];
        for(var a = 0; a < teams.length; a++) {
            lines.push(
            <tr key={'team_' + teams[a].position}><td>{teams[a].position}
            </td><td>{teams[a].teamName}
            </td><td>{teams[a].points}</td></tr>
            );
        }
    return lines;
  },
  render: function() {
    return (
    <div className="container" id="leagues">
        <div className="container">
            League {this.props.league}
            <table className="container">
                <thead><tr>
                    <th>Position</th>
                    <th>Team</th>
                    <th>Points</th>
                </tr></thead>
                <tbody id="standing">
                {this.generateTables()}
                </tbody>
            </table>
        </div>
        <div className="container">
            Matchday
            <table>
                <thead><tr>
                    <th>Home Team</th>
                    <th>Away Team</th>
                    <th>Time</th>
                    <th>Score</th>
                </tr></thead>
                <tbody id="matches">
                </tbody>
            </table>
        </div>
    </div>
    )
  }
});

export default Table