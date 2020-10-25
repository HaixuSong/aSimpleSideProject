import React, { Component } from 'react'
import Header from '../../components/header/header'
import './map.scss'
import { mapMenu } from '../../config/map-menu'
import FilterPannel from './filter-pannel/filter-pannel'
import CardPannel from './card-pannel/card-pannel'
import MapPannel from './map-pannel/map-pannel'
import DetailPannel from './detail-pannel/detail-pannel'
import Axios from 'axios'
import { connect } from 'react-redux'
import { setAllData } from '../../redux/actions/setAllData'
import { Switch, Route } from "react-router-dom";

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
        switch (this.props.filter.bedrooms) {
            case '1':
                res = res.filter(item => {
                    return item.bedrooms === 1;
                })
                break;
            case '≤2':
                res = res.filter(item => {
                    return item.bedrooms <= 2;
                })
                break;
            case '≤3':
                res = res.filter(item => {
                    return item.bedrooms <= 3;
                })
                break;
            case '≤4':
                res = res.filter(item => {
                    return item.bedrooms <= 4;
                })
                break;
            default:
                break;
        }
        switch (this.props.filter['distance to Stevens']) {
            case '<10 min walk':
                res = res.filter(item => {
                    return item.time2Stevens < 11;
                });
                break;
            case '<20 min walk':
                res = res.filter(item => {
                    return item.time2Stevens < 22;
                });
                break;
            case '<30 min walk':
                res = res.filter(item => {
                    return item.time2Stevens < 33;
                });
                break;
            case '<40 min walk':
                res = res.filter(item => {
                    return item.time2Stevens < 44;
                });
                break;
            default:
                break;
        }
        switch (this.props.filter.price) {
            case "$0~500":
                res = res.filter(item => {
                    return item.price < 550;
                });
                break;
            case "$500~800":
                res = res.filter(item => {
                    return item.price < 850 && item.price > 500;
                });
                break;
            case "$800~1000":
                res = res.filter(item => {
                    return item.price < 1050 && item.price > 800;
                });
                break;
            case "$1000~1200":
                res = res.filter(item => {
                    return item.price < 1250 && item.price > 1000;
                });
                break;
            case "$ 1200+":
                res = res.filter(item => {
                    return item.price > 1200;
                });
                break;
            default:
                break;
        }
        switch (this.props.filter['room type']) {
            case "Master Bedroom":
                res = res.filter(item => {
                    return item.roomType === 1;
                });
                break;
            case "Second Bedroom":
                res = res.filter(item => {
                    return item.roomType === 2;
                });
                break;
            case "Livingroom":
                res = res.filter(item => {
                    return item.roomType === 3;
                });
                break;
            default:
                break;
        }

        console.log(res)
        console.log(this.props.filter);
        return res
    }

    render() {
        return (
            <div id="map">
                <Header menu={mapMenu} />
                <FilterPannel />
                <section id="map-main">
                    <Switch>
                        <Route exact path="/map">
                            <CardPannel allData={this.fns(this.props.allData)} />
                        </Route>
                        <Route path="/map/:email" component={DetailPannel}>
                        </Route>
                    </Switch>
                    <MapPannel allData={this.fns(this.props.allData)} />
                </section>
            </div>
        )
    }
}

export default connect(
    (state) => ({ allData: state.allData, sort: state.sort, filter: state.filter }),
    { setAllData }
)(Map)