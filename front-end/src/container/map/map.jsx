import React, { Component } from 'react'
import Header from '../../components/header/header'
import './map.scss'
import { mapMenu } from '../../config/map-menu'
import FilterPannel from './filter-pannel/filter-pannel'
import CardPannel from './card-pannel/card-pannel'
import MapPannel from './map-pannel/map-pannel'
import Axios from 'axios'
import { connect } from 'react-redux'
import { setAllData } from '../../redux/actions/setAllData'

class Map extends Component {

    componentDidMount = () => {
        Axios.get('/map/getAll')
            .then(value => {
                this.props.setAllData(value.data)
                console.log(this.props.allData[0])
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

export default connect(
    (state) => ({ allData: state.allData }),
    { setAllData }
)(Map)