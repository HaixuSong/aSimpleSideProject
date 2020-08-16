import React, { Component } from 'react'
import './about-pannel.scss'

export default class AboutPannel extends Component {
    render() {
        return (
            <div id="about-pannel">
                <h3>TRUST YOUR ALUMNUS</h3>
                <div id="about-show">
                    <div id="senior"></div>
                    <div id="house"></div>
                    <div id="fresh"></div>
                </div>
                <p>Transaction between schoolmates from Stevens. </p>
                <span>NO RENTAL AGENCY EXISTS</span>
            </div>
        )
    }
}