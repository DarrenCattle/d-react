import React from 'react'
import NavLink from './NavLink'
require("../index.css");

export default React.createClass({
  render() {
    return (
      <div>
        <ul className="nav" role="nav">
          <NavLink to="/" onlyActiveOnIndex>Darren Cattle</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/soccer">Soccer</NavLink>
          <NavLink to="/list">List</NavLink>
          <NavLink to="/stock">Stock</NavLink>
          <NavLink to="/design">Design</NavLink>
          <NavLink to="/art">Art</NavLink>
          <NavLink to="/black">Black</NavLink>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
