import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Switch,Route } from 'react-router-dom';
import "./App.css";

import Create from './components/create';
import Edit from './components/edit';
import Index from './components/index'; 
import User from './components/user';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="container">
        <nav className="navbar navbar-expand navbar-light bg-light">
        <Link to={'/'} className="navbar-brand">React CRUD Example</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">Index</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/user'} className="nav-link">User</Link>
                </li>
              </ul>
            </div>
         </nav> <br/>
         <h2>Welcome to MERN Sample  CRUD Application</h2>
         <Switch>
           <Route exact path='/create' component= { Create } />
           <Route path='/edit/:id' component= { Edit } />
           <Route path='/index' component= { Index } /> 
           <Route path='/user' component= { User} /> 
         </Switch>
      </div>
      </Router>
    )
  }
}
export default App;
