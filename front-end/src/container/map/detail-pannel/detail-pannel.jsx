import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import './detail-pannel.scss'

export default class DetailPannel extends Component {
  state = {
    email: null
  }
  componentDidMount = () => {
    let { email } = useParams()
    this.setStat({ email })
  }
  render() {
    return (
      <div id='detail-pannel'>
        <h2>
          this.state.email
        </h2>
      </div>
    )
  }
}