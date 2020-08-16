import React, { Component } from 'react'
import './contact-pannel.scss'
import contactConfig from '../../../config/contact-config'
import { joinUsTitle, joinUsContent } from '../../../config/string-en'

export default class AboutPannel extends Component {
    render() {
        return (
            <div id="contact-pannel">
                <h3>{joinUsTitle}</h3>
                {
                    joinUsContent.map((item) => {
                        return (
                            <p>{item}</p>
                        )
                    })
                }
                <div>
                    {
                        contactConfig.map((item) => {
                            return (
                                <dl key={item.title}>
                                    <dt>{item.title}</dt>
                                    <hr />
                                    {
                                        item.content.map((cItem) => {
                                            return (
                                                <dd key={cItem.name}><a href={"mailto:" + cItem.email}>{cItem.name}</a></dd>
                                            )
                                        })
                                    }
                                </dl>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}