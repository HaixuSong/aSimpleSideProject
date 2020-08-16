import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import Login from './routers/login/login'
import Admin from './routers/admin/admin'
import Map from './routers/map/map'
import MyInfo from './routers/my-info/my-info'



function App() {
  return (
    <div id="app">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/map" component={Map} />
        <Route path="/my-info" component={MyInfo} />
        <Route path="/admin" component={Admin} />
        <Redirect to="/login" />
      </Switch>
    </div>
  );
}

export default App;
