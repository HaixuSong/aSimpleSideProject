import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './nav-button.scss'

export default class NavButton extends Component {
    state = {
        showList: false
    }

    toggleNavList = () => {
        let newState = !this.state.showList
        this.setState({ showList: newState })
    }
    render() {
        return (
            <div id="nav">
                <button id="nav-button" onClick={this.toggleNavList}>
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
                {((showList) => {
                    if (showList) {
                        return (
                            <ul id="hidden-nav-list">
                                {
                                    this.props.menu.map((item) => {
                                        return <li key={item.name}><Link to={item.link}>{item.name}</Link><hr /></li>
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
                        this.props.menu.map((item) => {
                            return <li key={item.name}><a href={item.link}>{item.name}</a></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}