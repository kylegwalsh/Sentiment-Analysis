import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Rankings, Companies } from './pages';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/rankings' component={Rankings}/>
        <Route exact path='/companies/:name' component={Companies}/>
        <Redirect from='/' to='/rankings'/>
      </Switch>
    );
  }
}

export default App;
