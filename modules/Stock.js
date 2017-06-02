import React from 'react'
import NavLink from './NavLink'

var Stock = React.createClass({
	getInitialState: function() {
		return {
			stocks: null
		};
	},
	componentDidMount() {
		//this.sendRequest("stocks");
		//this.sendRequest('http://api.football-data.org/v1/competitions/426/leagueTable');
		//this.sendRequest("http://localhost:9000/stocks");
		this.sendRequest("http://listophrenic.herokuapp.com/stocks");
	},
	sendRequest: function(url) {
		var url = url.trim();
		var to_process = this.setItems;
		var xmlhttp = new XMLHttpRequest();
		var data;
		xmlhttp.onreadystatechange = function() {
		  if (xmlhttp.readyState == XMLHttpRequest.DONE) {
		      data = xmlhttp.response;
		      if(data!=null) {
				to_process(data.trim());
		      }
		  }
		};
		xmlhttp.open("GET", url);
		xmlhttp.send();
	},
	/*getStock: function(stock) {
	    var url = "https://api.football-data.org/v1/competitions/426/leagueTable";
	    //console.log(url, this.headers);
	    return fetch(url, this.headers)
	    .then(function(response) {
	    	return response.json();
	    })
	    .then(function(json) {
	    	console.log(json);
	    	return json;
	    })
	    .catch(function(error) {
	      console.log('error', error);
	    });
	},*/
	setItems: function(items) {
		var list = items.replace('[','').replace(']','').split(',');
		this.setState({stocks: list});
	},
	generator: function() {
		var stocks = this.state.stocks;
		if(stocks===null){
			return stocks;
		}
		var lines = [];
		var count = 0;
		stocks.forEach(function(name) {
			lines.push(
				<div key={'stock_'+count}>
					{name}
				</div>
				);
			count++;
		});
		return lines;
	},
	render: function() {
		return (
			<div className="container">
				<h1>Stock Web App</h1>
					{this.generator()}
			</div>
		)
	}
})

export default Stock