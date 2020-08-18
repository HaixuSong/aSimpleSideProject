import React, { Component } from 'react'
import Header from '../../components/header/header'
import './map.scss'
import { mapMenu } from '../../config/map-menu'
import FilterPannel from './filter-pannel/filter-pannel'
import CardPannel from './card-pannel/card-pannel'
import MapPannel from './map-pannel/map-pannel'

class Map extends Component {
    render() {
        return (
            <div id="map">
                <Header menu={mapMenu} />
                <FilterPannel />
                <CardPannel />
                <MapPannel />
            </div>

        )
    }
}
export default Map