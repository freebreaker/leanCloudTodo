import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Home from './Home';
import Completed from './Completed'
import { render } from 'react-dom'

import { Router, Route, hashHistory ,IndexRoute,IndexRedirect} from 'react-router'

render((
<Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="completed" component={Completed}/>
    
  </Route>
</Router>
), document.getElementById('root'))