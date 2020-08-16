import React, { Component } from 'react'
import Header from '../login/header/header'
import Function from './function/function'
import './map.scss'
import { mapMenu } from '../../config/map-menu'

class Map extends Component {
    render() {
        return (
            <div id="map">
                <Header menu={mapMenu} />
                <Function />
            </div>

        )
    }
}
export default Map