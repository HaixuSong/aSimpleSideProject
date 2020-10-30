import Axios from 'axios'
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

    logout = () => {
        Axios.get('/bknd/logout')
            .then(value => {
                console.log(value.data)
            })
            .catch(err => {
                console.log('logout server error', err)
            })
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
                                        if (item.name === 'Logout') {
                                            return <li onClick={this.logout} key={item.name}><a href="/">Logout</a></li>
                                        }
                                        if (item.link[0] === '#') {
                                            return <li key={item.name}><a href={item.link}>{item.name}</a><hr /></li>
                                        }
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
                            if (item.name === 'Logout') {
                                return <li onClick={this.logout} key={item.name}><a href="/">Logout</a></li>
                            }
                            if (item.link[0] === '#') {
                                return <li key={item.name}><a href={item.link}>{item.name}</a></li>
                            }
                            return <li key={item.name}><Link to={item.link}>{item.name}</Link></li>
                        })
                    }

                </ul>
            </div>
        )
    }
}