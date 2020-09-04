import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
//scss
import './my-info.scss'
//components
import Header from '../../components/header/header'
import ImgUpload from './img-upload/img-upload'
import RoomType from './room-type/room-type'
import Selector from './selector/selector'
import ContactPannel from '../../components/contact-pannel/contact-pannel'
//config
import { infoMenu } from '../../config/my-info-menu'
import { c2s, c2sSorted } from '../../config/c2s'
import { cityChoices, bedroomNbathroomChoices, roomTypeChoices, paybyChoices, sexPreferChoices } from '../../config/choices'
//redux dispatch
import { getNewHouseState } from '../../redux/actions/getNewHouseState'
//gmap
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const SITgeocode = {
    lat: 40.7451,
    lng: -74.0248
}

class MyInfo extends Component {
    refMap = React.createRef()

    componentDidMount = () => {
        this.props.getNewHouseState()
    }

    red = "rgba(255,0,0,0.1)"
    green = "rgba(0,255,0,0.1)"
    yellow = "rgba(255,255,0,0.1)"

    inputBlurHandler = (e) => {
        let data = {
            name: e.target.id,
            value: e.target.value
        }
        if (data.value === this.props.houseStatus[data.name]) return
        try {
            if (data.value === this.props.houseStatus[data.name].toString()) return
            if (data.value === '' && this.props.houseStatus[data.name] === null) return
        } catch (err) {
            console.log("toString validation err: " + err)
        }
        Axios.post('/my-info/input-text', data)
            .then(value => {
                if (value.data.updated) this.props.getNewHouseState()
                else console.log('Sever-side error' + value)
            })
            .catch(err => {
                console.log(`Didn't get respond from server, error: ${err}`)
            })
    }

    choiceChangeHandler = (e) => {
        this.inputBlurHandler(e)
    }

    //timer of the checkbox
    timer
    //a string to store pre-checkbox name
    preCheckboxName
    //a string to store pre-checkbox value
    preCheckboxValue
    checkboxChangeHandler = (e) => {
        if (this.preCheckboxName === e.target.name && this.preCheckboxValue === e.target.value) {
            console.log(1)
            clearTimeout(this.timer)
        } else {
            console.log(2);
            this.preCheckboxName = e.target.name
            this.preCheckboxValue = e.target.value
        }
        let data = {
            name: e.target.name,
            value: e.target.value * 1,
            checked: e.target.checked
        }
        this.timer = setTimeout(() => {
            Axios.post('/my-info/checkbox-change', data)
                .then(value => {
                    console.log(value);
                    if (value.data.updated) this.props.getNewHouseState()
                    else console.log('Sever-side error' + value)
                })
                .catch(err => {
                    console.log(`Didn't get respond from server, error: ${err}`)
                })
        }, 1000)
    }

    dateMinValid = (value, minDate) => {
        value = value.split('-')
        minDate = minDate.split('-')
        if (value[0] < minDate[0]) return false
        if (value[0] > minDate[0]) return true
        if (value[1] < minDate[1]) return false
        if (value[1] > minDate[1]) return true
        if (value[2] < minDate[2]) return false
        return true
    }

    dateMaxValid = (value, maxDate) => {
        value = value.split('-')
        maxDate = maxDate.split('-')
        if (value[0] > maxDate[0]) return false
        if (value[0] < maxDate[0]) return true
        if (value[1] > maxDate[1]) return false
        if (value[1] < maxDate[1]) return true
        if (value[2] > maxDate[2]) return false
        return true
    }

    dateFromChangeHandler = (e) => {
        let value = e.currentTarget.value
        let minDate = "2020-08-20"
        let maxDate = "2120-08-20"
        if (this.dateMinValid(value, minDate) && this.dateMaxValid(value, maxDate)) {
            let data = {
                name: e.currentTarget.name,
                value: e.currentTarget.value
            }
            Axios.post('/my-info/input-text', data)
                .then(value => {
                    if (value.data.updated) this.props.getNewHouseState()
                    else console.log('Sever-side error' + value)
                })
                .catch(err => {
                    console.log(`Didn't get respond from server, error: ${err}`)
                })
        }
    }

    dateToChangeHandler = (e) => {
        let value = e.currentTarget.value
        let minDate = this.props.houseStatus.fromdate || "2020-08-20"
        let maxDate = "2120-08-20"
        if (this.dateMinValid(value, minDate) && this.dateMaxValid(value, maxDate)) {
            let data = {
                name: e.currentTarget.name,
                value: e.currentTarget.value
            }
            Axios.post('/my-info/input-text', data)
                .then(value => {
                    if (value.data.updated) this.props.getNewHouseState()
                    else console.log('Sever-side error' + value)
                })
                .catch(err => {
                    console.log(`Didn't get respond from server, error: ${err}`)
                })
        }
    }

    render() {
        return (
            <div id="my-info">
                <Header menu={infoMenu} />
                <div className="core">
                    <h3>My House For Rent</h3>
                    <hr />
                    <form action="post" onKeyDown={(e) => { if (e.keyCode === 13) e.preventDefault() }}>
                        <section key="Upload Images">
                            <h5>Upload Images</h5>
                            <div className="content" style={{ backgroundColor: this.props.houseStatus.pictures.length >= 1 ? this.green : this.red }}>
                                <ImgUpload maxImg={10} name="house" imgs={this.props.houseStatus.pictures} addRoute="/my-info/postimage" deleteRoute="/my-info/deleteimage" />
                            </div>
                        </section>
                        <section key="Location">
                            <h5>Location</h5>
                            <div className="content" style={{ backgroundColor: this.props.houseStatus.city && this.props.houseStatus.address ? this.green : this.red }}>
                                <Selector choices={cityChoices} value={this.props.houseStatus.city} name="city" change={this.choiceChangeHandler} default="Choose City" />
                                <br />
                                <label htmlFor="address">House Number and Street</label>
                                <input name="address" id="address" type="text" placeholder="E.g: 59 Ferry Street" onBlur={this.inputBlurHandler} defaultValue={this.props.houseStatus.address || ""} maxLength="200" />
                                <LoadScript googleMapsApiKey="AIzaSyCElTKRMzXILFNLITlmINlyPS9eMHX4uFY">
                                    <GoogleMap id="simple-gmap" mapContainerStyle={{ width: "100%", height: "300px" }} zoom={14} center={(this.props.houseStatus.geocode && this.props.houseStatus.geocode.lat) ? this.props.houseStatus.geocode : SITgeocode}>
                                        {(this.props.houseStatus.geocode && this.props.houseStatus.geocode.lat) && <Marker position={this.props.houseStatus.geocode} />}
                                    </GoogleMap>
                                </LoadScript>
                            </div>
                        </section>
                        <section key="House Type">
                            <h5>House Type</h5>
                            <div className="content" style={{ backgroundColor: this.props.houseStatus.bedrooms && this.props.houseStatus.bathrooms ? this.green : this.red }}>
                                <Selector change={this.choiceChangeHandler} choices={bedroomNbathroomChoices} value={this.props.houseStatus.bedrooms} name="bedrooms" default="?" choiceFirst={true} />
                                <span className="holdplace">ababa</span>
                                <Selector change={this.choiceChangeHandler} choices={bedroomNbathroomChoices} value={this.props.houseStatus.bathrooms} name="bathrooms" default="?" choiceFirst={true} />
                            </div>
                        </section>
                        <section key="Room Type">
                            <h5>Room Type</h5>
                            <div className="content" style={{ backgroundColor: this.props.houseStatus.roomType ? this.green : this.red }}>
                                <RoomType change={this.choiceChangeHandler} choices={roomTypeChoices} value={this.props.houseStatus.roomType} name="roomType" default="Choose Room Type" />
                            </div>
                        </section>
                        <section key="Price">
                            <h5>Price</h5>
                            <div className="content" style={{ backgroundColor: this.props.houseStatus.price ? this.green : this.red }}>
                                <input type="number" name="price" id="price" min="0" max="2000" placeholder="800" defaultValue={this.props.houseStatus.price || ""} onBlur={this.inputBlurHandler} maxLength="10" />
                                <label htmlFor="price">$/Month</label>
                                <span className="holdplace">aba</span>
                                <Selector choices={paybyChoices} value={this.props.houseStatus.payby} name="payby" change={this.choiceChangeHandler} default="Paied Each ..." />
                                <br />
                                Including:
                                <input type="checkbox" name="including" id="water" value="1" onClick={this.checkboxChangeHandler} defaultChecked={this.props.houseStatus.including && this.props.houseStatus.including.indexOf(1) !== -1} />
                                <label htmlFor="water">Water</label>
                                <input type="checkbox" name="including" id="electric" value="2" onClick={this.checkboxChangeHandler} defaultChecked={this.props.houseStatus.including && this.props.houseStatus.including.indexOf(2) !== -1} />
                                <label htmlFor="electric">Electric</label>
                                <input type="checkbox" name="including" id="gas" value="3" onClick={this.checkboxChangeHandler} defaultChecked={this.props.houseStatus.including && this.props.houseStatus.including.indexOf(3) !== -1} />
                                <label htmlFor="gas">Gas</label>
                                <input type="checkbox" name="including" id="internet" value="4" onClick={this.checkboxChangeHandler} defaultChecked={this.props.houseStatus.including && this.props.houseStatus.including.indexOf(4) !== -1} />
                                <label htmlFor="internet">Internet</label>
                            </div>
                        </section>
                        <section key="Lease Term">
                            <h5>Lease Term</h5>
                            <div className="content">
                                <label htmlFor="fromdate">From:</label>
                                <input type="date" name="fromdate" id="fromdate" onChange={this.dateFromChangeHandler} min="2020-08-20" max="2120-08-20" required ref={this.refMap} defaultValue={this.props.houseStatus.todate || ""} />
                                <span className="holdplace">aba</span>
                                <label htmlFor="todate">To:</label>
                                <input type="date" name="todate" id="todate" min="2020-08-20" max="2120-08-20" defaultValue={this.props.houseStatus.todate || "2120-08-20"} onChange={this.dateToChangeHandler} />
                            </div>
                        </section>
                        <section key="Offering">
                            <h5>Offering</h5>
                            <div className="content" style={{ backgroundColor: this.props.houseStatus.offering && this.props.houseStatus.offering.length ? this.green : this.yellow }}>
                                {
                                    c2sSorted.map((item) => {
                                        return (
                                            <div className="subtitle" key={item.name}>
                                                <h6>{item.name}</h6>
                                                {item.order.map((code) => {
                                                    return (
                                                        <div className="checkboxes" key={code}>
                                                            <input type="checkbox" name="offering" id={code} value={code} onClick={this.checkboxChangeHandler} defaultChecked={this.props.houseStatus.offering && this.props.houseStatus.offering.indexOf(code) !== -1} />
                                                            <label htmlFor={code}>{c2s[code]}</label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </section>
                        <section key="Room Description">
                            <h5>Room Description</h5>
                            <div className="content" style={{ backgroundColor: this.props.houseStatus.roomDescribe ? this.green : this.yellow }}>
                                <textarea name="roomDescribe" id="roomDescribe" rows="5" placeholder="Anything else about your room?" onBlur={this.inputBlurHandler} defaultValue={this.props.houseStatus.roomDescribe || ""} maxLength="10000" />
                            </div>
                        </section>
                        <section key="Roommate Description">
                            <h5>Roommate Description</h5>
                            <div className="content" style={{ backgroundColor: this.props.houseStatus.roomateDescribe ? this.green : this.yellow }} >
                                <textarea name="roomateDescribe" id="roomateDescribe" rows="5" placeholder="Tell us about your roommate." onBlur={this.inputBlurHandler} defaultValue={this.props.houseStatus.roomateDescribe || ""} maxLength="10000" />
                            </div>
                        </section>
                        <section key="Tenant Expected">
                            <h5>Tenant Expected</h5>
                            <div className="content" style={{ backgroundColor: this.props.houseStatus.otherStatement ? this.green : this.yellow }}>
                                <span className="leftNright"><label htmlFor="sexPrefer">Sex Preference:</label></span>
                                {/* <select name="sexPrefer" id="sexPrefer" onChange={this.choiceChangeHandler}>
                                    <option value="1">No Preference</option>
                                    <option value="2">Male Only</option>
                                    <option value="3">Female Only</option>
                                </select> */}
                                <Selector choices={sexPreferChoices} value={this.props.houseStatus.sexPrefer || '1'} name="sexPrefer" change={this.choiceChangeHandler} notShowingLabel={true} />
                                <br />
                                <span className="leftNright"><label htmlFor="otherStatement">More:</label></span>
                                <textarea name="otherStatement" id="otherStatement" rows="3" placeholder="Your tenate should ..." onBlur={this.inputBlurHandler} defaultValue={this.props.houseStatus.otherStatement || ""} maxLength="10000"></textarea>
                            </div>
                        </section>
                        <section key="Contact Me">
                            <h5>Contact Me</h5>
                            <div className="content" style={{ backgroundColor: this.props.houseStatus.cellphone || this.props.houseStatus.facebook || this.props.houseStatus.wechat ? this.green : this.yellow }}>
                                <div className="contact">
                                    <label htmlFor="email">Email:</label>
                                    <input type="text" name="email" id="email" value={this.props.houseStatus.email} readOnly disabled />
                                </div>
                                <div className="contact">
                                    <label htmlFor="cellphone">Cellphone:</label>
                                    <input type="tel" name="cellphone" id="cellphone" onInput={(e) => { e.target.value = e.target.value.replace(/[^\d()+-\s]/g, '') }} pattern="\(?\d{3}\)?-? *\d{3}-? *-?\d{4}" placeholder="(123) 456-7890" onBlur={this.inputBlurHandler} defaultValue={this.props.houseStatus.cellphone || ""} maxLength="20" />
                                </div>
                                <div className="contact">
                                    <label htmlFor="facebook">Facebook:</label>
                                    <input type="text" name="facebook" id="facebook" onBlur={this.inputBlurHandler} defaultValue={this.props.houseStatus.facebook || ""} maxLength="100" />
                                </div>
                                <div className="contact">
                                    <label htmlFor="wechat">WeChat:</label>
                                    <ImgUpload maxImg={1} imgs={(() => {
                                        if (this.props.houseStatus.wechat) return [this.props.houseStatus.wechat]
                                        return []
                                    })()} name="wechat" addRoute="/my-info/postWechat" deleteRoute="/my-info/deleteWechat" />
                                </div>
                            </div>
                        </section>
                        <button></button>
                    </form>
                </div>
                <ContactPannel />
            </div >
        )
    }
}

MyInfo = connect(
    state => ({ houseStatus: state.houseStatus }),
    { getNewHouseState }
)(MyInfo)

export default MyInfo