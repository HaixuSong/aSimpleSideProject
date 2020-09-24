import React, { Component } from 'react'
import Header from '../../components/header/header'
import './map.scss'
import { mapMenu } from '../../config/map-menu'
import FilterPannel from './filter-pannel/filter-pannel'
import CardPannel from './card-pannel/card-pannel'
import MapPannel from './map-pannel/map-pannel'
import Axios from 'axios'

class Map extends Component {

    componentDidMount = () => {
        Axios.get('/map/getAll')
            .then(value => {
                console.log(value.data);
            })
            .catch(err => {
                console.log(`Didn't get respond from server, error: ${err}`)
            })
    }

    render() {
        return (
            <div id="map">
                <Header menu={mapMenu} />
                <FilterPannel />
                <section id="map-main">
                    <CardPannel />
                    <MapPannel />
                </section>
            </div>
        )
    }
}
export default Map