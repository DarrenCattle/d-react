// modules/NavLink.js
import React from 'react'
import { Link } from 'react-router'
require("../index.css");

export default React.createClass({
	contextTypes: {
        router: React.PropTypes.object
    },

    render: function () {
		let isActive = this.context.router.isActive(this.props.to, true),
			className = isActive ? "li-active" : "li-page";
		//console.log(isActive, className);
		return  (
				<li className={className}>
					<Link {...this.props}>
						{this.props.children}
					</Link>
				</li>
				);
	}
});
