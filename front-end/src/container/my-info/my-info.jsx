import React, { Component } from 'react'
import Header from '../../components/header/header'
import { infoMenu } from '../../config/my-info-menu'
import './my-info.scss'
import ImgUpload from './img-upload/img-upload'

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
                            <div id="content">
                                <ImgUpload />
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