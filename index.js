import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import About from './modules/About'
import List from './modules/List'
import Jobs from './modules/Jobs'
import Repos from './modules/Repos'
import Repo from './modules/Repo'
import Home from './modules/Home'
import Black from './modules/Black'
import Soccer from './modules/Soccer'
import Stock from './modules/Stock'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/jobs" component={Jobs}/>
      <Route path="/soccer" component={Soccer}/>
      <Route path="/list" component={List}/>
      <Route path="/stock" component={Stock}/>
      <Route path="/design" component={Repos}/>
      <Route path="/black" component={Black}/>
    </Route>
  </Router>
), document.getElementById('app'))
