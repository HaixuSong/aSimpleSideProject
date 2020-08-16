import React, { Component } from 'react'
import './header.scss'
import Logo from './logo/logo'
import NavButton from './nav-button/nav-button'



export default class Header extends Component {
    render() {
        return (
            <div id='header'>
                <Logo />
                <NavButton menu={this.props.menu} />
            </div>
        )
    }
}
