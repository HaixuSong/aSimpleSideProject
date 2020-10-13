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
            })
            .catch(err => {
                console.log(`Didn't get respond from server, error: ${err}`)
            })
    }

    // filter and sort all the data
    fns = (lstData) => {
        let res = [...lstData]

        // sort part
        if (this.props.sort * 1 === 1) {
            res.sort((a, b) => {
                return a.time2Stevens - b.time2Stevens
            })
        }
        else if (this.props.sort * 1 === 4) {
            res.sort((a, b) => {
                return b.activeDate - a.activeData
            })
        }
        else if (this.props.sort * 1 === 2) {
            res.sort((a, b) => {
                return a.price - b.price
            })
        }
        else if (this.props.sort * 1 === 3) {
            res.sort((a, b) => {
                return b.price - a.price
            })
        }

        // filter part


        console.log(res)
        return res
    }

    render() {
        return (
            <div id="map">
                <Header menu={mapMenu} />
                <FilterPannel />
                <section id="map-main">
                    <CardPannel allData={this.fns(this.props.allData)} />
                    <MapPannel />
                </section>
            </div>
        )
    }
}

export default connect(
    (state) => ({ allData: state.allData, sort: state.sort, filter: state.filter }),
    { setAllData }
)(Map)