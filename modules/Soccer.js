import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div className="container">
        <h1>Soccer Leagues App</h1>
        <h2>Serie A is the best!</h2>
        <div className="container">
			<h1>Football API</h1>
			<h2>favorite league, favorite stats</h2>
			<select id="table-current">
				<option value="1">Serie A</option>
				<option value="2">Premier League</option>
				<option value="3">La Liga</option>
				<option value="4">Bundesliga</option>
				<option value="5">Portugese Liga</option>
			</select>
		</div>

		<div className="leagues" id="leagues">
			<div className="leaguebox">
			<h3 id="league_name">Serie A</h3>
				<table>
					<thead><tr>
					    <th>Position</th>
					    <th>Team</th>
					    <th>Points</th>
					</tr></thead>
					<tbody id="standing"/>
				</table>
			</div>
			<div>
			<h3 id="current-day">Matchday</h3>
				<table>
					<thead><tr>
					    <th>Home Team</th>
					    <th>Away Team</th>
					    <th>Time</th>
					    <th>Score</th>
					</tr></thead>
					<tbody id="matches"/>
				</table>
			</div>
		</div>
		<div id="insert">
			<a href="http://api.football-data.org/">http://api.football-data.org/</a>
		</div>
      </div>
    )
  }
})
