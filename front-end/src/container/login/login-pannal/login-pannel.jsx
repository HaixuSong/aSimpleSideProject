import React, { Component } from 'react'
import './login-pannel.scss'
import LoginWindow from './login-window/login-window'

export default class LoginPannel extends Component {
    render() {
        return (
            <div id="login-pannel">
                <LoginWindow />
            </div>
        )
    }
}