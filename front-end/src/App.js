import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import Login from './container/login/login'
import Map from './container/map/map'
import MyInfo from './container/my-info/my-info'
import { connect } from 'react-redux'
// import Axios from 'axios'
import { setLoginStatus } from './redux/actions/button'



class App extends Component {
  componentWillMount = async () => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', '/auto-login', false)
    xhr.send(null)
    if (xhr.readyState === 4 && xhr.status === 200) {
      let value = JSON.parse(xhr.response)
      this.props.setLoginStatus(value.autoLogin)
    }
  }

  render() {
    if (this.props.isLogin) {
      return (
        <div id="app">
          <Switch>
            <Route path="/map" component={Map} />
            <Route path="/my-info" component={MyInfo} />
            <Redirect to="/map" />
          </Switch>
        </div>
      )
    } else {
      return (
        <div id="app" >
          <Switch>
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
        </div>
      )
    }
  }
}
App = connect(
  state => ({ isLogin: state.login }),
  { setLoginStatus }
)(App)


export default App;
