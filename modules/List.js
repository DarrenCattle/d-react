import React from 'react'

var List = React.createClass({
	getInitialState: function() {
		return {
			server: 'http://listophrenic.herokuapp.com/',
		    cursor: 'stocks',
		    mapper: null
		};
	},
	componentDidMount() {
		this.sendRequest(this.state.server + this.state.cursor, this.setList);
	},
	setList: function(response) {
		var list = response.trim();
		console.log(list);
		this.setState({mapper: list});
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
	render: function() {
		return (
		  <div className="container">
		  {this.state.server}
		  <br></br>
		  {this.state.mapper}
		  </div>
		)
	}
});

export default List
