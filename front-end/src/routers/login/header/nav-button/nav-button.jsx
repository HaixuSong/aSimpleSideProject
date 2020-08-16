import React, { Component } from 'react'
import './nav-button.scss'
import { loginMenu } from '../../../../config/login-menu'

export default class NavButton extends Component {
    state = {
        showList: false
    }

    showNavList = () => {
        let newState = !this.state.showList
        this.setState({ showList: newState })
    }

    render() {
        return (
            <div id="nav">
                <button id="nav-button" onClick={this.showNavList}>
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
                {((showList) => {
                    if (showList) {
                        return (
                            <ul id="hidden-nav-list">
                                {
                                    loginMenu.map((item) => {
                                        return <li key={item.name}><a href={item.link}>{item.name}</a><hr /></li>
                                    })
                                }
                            </ul>
                        )
                    } else {
                        return
                    }
                })(this.state.showList)}
                <ul id="nav-list">
                    {
                        loginMenu.map((item) => {
                            return <li key={item.name}><a href={item.link}>{item.name}</a></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}