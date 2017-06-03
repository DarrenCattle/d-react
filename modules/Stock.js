import React from 'react'

var Stock = React.createClass({
	getInitialState: function() {
		return {
			stocks: null,
			stockdata: null
		};
	},
	componentDidMount() {
		this.sendRequest("http://listophrenic.herokuapp.com/stocks", this.setStocks);
	},
	sendRequest: function(url, to_process) {
		var url = url.trim();
		var xmlhttp = new XMLHttpRequest();
		var data;
		xmlhttp.onreadystatechange = function() {
		  if (xmlhttp.readyState == XMLHttpRequest.DONE) {
		      data = xmlhttp.response;
		      if(data!=null) {
				to_process(data);
		      }
		  }
		};
		xmlhttp.open("GET", url);
		xmlhttp.send();
	},
	setStocks: function(response) {
		//send first request to get stock list
		var list = response.replace('[','').replace(']','').split(',');
		this.setState({stocks: list});
		
		//send second request to google finance
		var googlefin = "http://finance.google.com/finance/info?client=ig&q=" 
			+ list.toString().replace(/\s/g,'');
		this.sendRequest(googlefin, this.setData);
	},
	setData: function(response) {
		var data = JSON.parse(response.substring(4,response.length));
		this.setState({stockdata: data});
	},
	generateTicker: function() {
		var data = this.state.stockdata;
		if(data===null){
			return data;
		}
		var lines = [];
		var count = 0;
		for(var a = 0; a < data.length; a++) {
			lines.push(
				<tr key={data[a].t}>
					<td>{data[a].t}</td>
					<td>{data[a].l}</td>
					<td>{data[a].c}</td>
					<td>{data[a].cp}</td>
				</tr>
			);
		}
		return lines;
	},
	render: function() {
		return (
			<div className="container">
				<h1>Stock Web App</h1>
				<table className="center">
					<thead><tr>
						<th>Stock</th>
						<th>Price</th>
						<th>Change $</th>
						<th>Change %</th>
					</tr></thead>
					<tbody id="standing">
						{this.generateTicker()}
					</tbody>
				</table>
			</div>
		)
	}
})

export default Stock