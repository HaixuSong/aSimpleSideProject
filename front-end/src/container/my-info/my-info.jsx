import React, { Component } from 'react'
import Header from '../../components/header/header'
import { infoMenu } from '../../config/my-info-menu'
import './my-info.scss'
import ImgUpload from './img-upload/img-upload'
import RoomType from './room-type/room-type'
import { c2s, c2sSorted } from '../../config/c2s'
import { connect } from 'react-redux'
import { getNewHouseState } from '../../redux/actions/getNewHouseState'
import Axios from 'axios'

class MyInfo extends Component {
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

    render() {
        return (
            <div id="my-info">
                <Header menu={infoMenu} />
                <div className="core">
                    <h3>My House For Rent</h3>
                    <hr />
                    <form action="post">
                        <section key="Upload Images">
                            <h5>Upload Images</h5>
                            <div className="content" style={{ backgroundColor: this.props.houseStatus.pictures.length >= 1 ? this.green : this.red }}>
                                <ImgUpload maxImg={10} name="house" imgs={this.props.houseStatus.pictures} addRoute="/my-info/postimage" deleteRoute="/my-info/deleteimage" />
                            </div>
                        </section>
                        <section key="Location">
                            <h5>Location</h5>
                            <div className="content" style={{ backgroundColor: this.props.houseStatus.city && this.props.houseStatus.address ? this.green : this.red }}>
                                <label htmlFor="city">City</label>
                                <select name="city" id="city" defaultValue={this.props.houseStatus.city || "0"} onChange={this.choiceChangeHandler} >
                                    <option value="0" style={{ display: "none" }}>Choose City</option>
                                    <option value="1">Jersey City</option>
                                    <option value="2">Hoboken</option>
                                    <option value="3">Weehawken</option>
                                    <option value="4">Union City</option>
                                </select>
                                <br />
                                <label htmlFor="address">House Number and Street</label>
                                <input name="address" id="address" type="text" placeholder="E.g: 59 Ferry Street" onBlur={this.inputBlurHandler} defaultValue={this.props.houseStatus.address || ""} />
                            </div>
                        </section>
                        <section key="House Type">
                            <h5>House Type</h5>
                            <div className="content">
                                <select name="bedrooms" id="bedrooms">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                <label htmlFor="bedrooms">Bedrooms</label>
                                <span className="holdplace">ababa</span>
                                <select name="bathrooms" id="bathrooms">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                <label htmlFor="bathrooms">Bathrooms</label>
                            </div>
                        </section>
                        <section key="Room Type">
                            <h5>Room Type</h5>
                            <div className="content">
                                <RoomType />
                            </div>
                        </section>
                        <section key="Price">
                            <h5>Price</h5>
                            <div className="content">
                                <input type="number" name="price" id="price" step="100" min="0" max="2000" />
                                <label htmlFor="price">$/Month</label>
                                <span className="holdplace">aba</span>
                                <label htmlFor="payby">Payed Each</label>
                                <select name="payby" id="payby">
                                    <option value="0">Year</option>
                                    <option value="1">Month</option>
                                    <option value="2">Day</option>
                                </select>
                                <br />
                                Including:
                                <input type="checkbox" name="water" id="water" />
                                <label htmlFor="water">Water</label>
                                <input type="checkbox" name="electric" id="electric" />
                                <label htmlFor="electric">Electric</label>
                                <input type="checkbox" name="gas" id="gas" />
                                <label htmlFor="gas">Gas</label>
                                <input type="checkbox" name="internet" id="internet" />
                                <label htmlFor="internet">Internet</label>

                            </div>
                        </section>
                        <section key="Lease Term">
                            <h5>Lease Term</h5>
                            <div className="content">
                                <label htmlFor="fromdate">From:</label>
                                <input type="date" name="fromdate" id="fromdate" />
                                <span className="holdplace">aba</span>
                                <label htmlFor="todate">To:</label>
                                <input type="date" name="todate" id="todate" />
                            </div>
                        </section>
                        <section key="Offering">
                            <h5>Offering</h5>
                            <div className="content">
                                {
                                    c2sSorted.map((item) => {
                                        return (
                                            <div className="subtitle" key={item.name}>
                                                <h6>{item.name}</h6>
                                                {item.order.map((code) => {
                                                    return (
                                                        <div className="checkboxes" key={code}>
                                                            <input type="checkbox" name="offering" id={code} />
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
                                <textarea name="roomDescribe" id="roomDescribe" rows="5" placeholder="Anything else about your room?" onBlur={this.inputBlurHandler} defaultValue={this.props.houseStatus.roomDescribe || ""} />
                            </div>
                        </section>
                        <section key="Roommate Description">
                            <h5>Roommate Description</h5>
                            <div className="content" style={{ backgroundColor: this.props.houseStatus.roomateDescribe ? this.green : this.yellow }} >
                                <textarea name="roomateDescribe" id="roomateDescribe" rows="5" placeholder="Tell us about your roommate." onBlur={this.inputBlurHandler} defaultValue={this.props.houseStatus.roomateDescribe || ""} />
                            </div>
                        </section>
                        <section key="Tenant Expected">
                            <h5>Tenant Expected</h5>
                            <div className="content" style={{ backgroundColor: this.props.houseStatus.otherStatement ? this.green : this.yellow }}>
                                <span className="leftNright"><label htmlFor="sexPrefer">Sex Preference:</label></span>
                                <select name="sexPrefer" id="sexPrefer">
                                    <option value="0">No Preference</option>
                                    <option value="1">Male Only</option>
                                    <option value="2">Female Only</option>
                                </select>
                                <br />
                                <span className="leftNright"><label htmlFor="otherStatement">More:</label></span>
                                <textarea name="otherStatement" id="otherStatement" rows="3" placeholder="Your tenate should ..." onBlur={this.inputBlurHandler} defaultValue={this.props.houseStatus.otherStatement || ""}></textarea>
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
                                    <input type="tel" name="cellphone" id="cellphone" onInput={(e) => { e.target.value = e.target.value.replace(/[^\d()+-\s]/g, '') }} pattern="\(?\d{3}\)?-? *\d{3}-? *-?\d{4}" placeholder="(123) 456-7890" onBlur={this.inputBlurHandler} defaultValue={this.props.houseStatus.cellphone || ""} />
                                </div>
                                <div className="contact">
                                    <label htmlFor="facebook">Facebook:</label>
                                    <input type="text" name="facebook" id="facebook" onBlur={this.inputBlurHandler} defaultValue={this.props.houseStatus.facebook || ""} />
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
                        <button> Upload or Update </button>
                        <button> Delete This House Info </button>
                    </form>
                </div>
            </div >
        )
    }
}

MyInfo = connect(
    state => ({ houseStatus: state.houseStatus }),
    { getNewHouseState }
)(MyInfo)

export default MyInfo