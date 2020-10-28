import React, { Component } from 'react'
import './header.scss'
import Logo from './logo/logo'
import NavButton from './nav-button/nav-button'


// You have to gice <Header> a menu as nav-menu when using <Header>


class Header extends Component {
    render() {
        return (
            <div id='header' className="clear" onMouseDown={this.props.setButtonState}>
                <Logo />
                <NavButton menu={this.props.menu} />
            </div>
        )
    }
}


export default Header