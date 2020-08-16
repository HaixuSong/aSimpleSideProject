import React, { Component } from 'react'
import { baseURL } from '../../../../config/const'
import './logo.scss'

export default class Logo extends Component {
    render() {
        return (
            <h1 id="logo">
                <a href={baseURL}>SteHouse</a>
            </h1>
        )
    }
}
