import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import Login from './container/login/login'
import Map from './container/map/map'
import MyInfo from './container/my-info/my-info'



function App() {
  return (
    <div id="app">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/map" component={Map} />
        <Route path="/my-info" component={MyInfo} />
        <Redirect to="/login" />
      </Switch>
    </div>
  );
}

export default App;
