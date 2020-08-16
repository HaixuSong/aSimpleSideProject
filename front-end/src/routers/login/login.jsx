import React, { Component } from 'react'
import './login.scss'
import Header from './header/header'
import LoginPannel from './login-pannal/login-pannel'
import AboutPannel from './about-pannel/about-pannel'
import ContactPannel from './contact-pannel/contact-pannel'


class Login extends Component {
    render() {
        return (
            <div>
                <Header />
                <LoginPannel />
                <AboutPannel />
                <ContactPannel />
            </div>
        )
    }
}

export default Login