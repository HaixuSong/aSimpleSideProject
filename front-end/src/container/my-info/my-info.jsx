import React, { Component } from 'react'
import Header from '../../components/header/header'
import { infoMenu } from '../../config/my-info-menu'
import './my-info.scss'
import ImgUpload from './img-upload/img-upload'
import RoomType from './room-type/room-type'

class MyInfo extends Component {
    render() {
        return (
            <div id="my-info">
                <Header menu={infoMenu} />
                <div id="core">
                    <h3>My House For Rent</h3>
                    <hr />
                    <form action="post">
                        <section>
                            <h5>Upload Images</h5>
                            <div className="content">
                                <ImgUpload maxImg={10} />
                            </div>
                        </section>
                        <section>
                            <h5>Location</h5>
                            <div className="content">
                                <label htmlFor="city">City</label>
                                <select name="city" id="city">
                                    <option value="0">Jersey City</option>
                                    <option value="1">Hoboken</option>
                                    <option value="2">Weehawken</option>
                                    <option value="3">Union City</option>
                                </select>
                                <br />
                                <label htmlFor="address">House Number and Street</label>
                                <input name="address" id="address" type="text" placeholder="E.g: 59 Ferry Street" />
                            </div>
                        </section>
                        <section>
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
                        <section>
                            <h5>Room Type</h5>
                            <div className="content">
                                <RoomType />
                            </div>
                        </section>
                        <section>
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
                                Including
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
                        <section>
                            <h5>Lease Term</h5>
                            <div className="content">
                                <label htmlFor="fromdate">From:</label>
                                <input type="date" name="fromdate" id="fromdate" />
                                <span className="holdplace">aba</span>
                                <label htmlFor="todate">To:</label>
                                <input type="date" name="todate" id="todate" />
                            </div>
                        </section>

                        <button> Upload or Update </button>
                        <button> Delete This House Info </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default MyInfo