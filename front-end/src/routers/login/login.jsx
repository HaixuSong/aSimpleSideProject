import React, { Component } from 'react'
import './login.scss'
import Header from './header/header'
import LoginPannel from './login-pannal/login-pannel'
import AboutPannel from './about-pannel/about-pannel'
import ContactPannel from './contact-pannel/contact-pannel'
import { loginMenu } from '../../config/login-menu'


class Login extends Component {
    componentDidMount() {
        console.log('clear local storage.')
    }
    render() {
        return (
            <div>
                <Header menu={loginMenu} />
                <LoginPannel />
                <AboutPannel />
                <ContactPannel />
            </div>
        )
    }
}

export default Login