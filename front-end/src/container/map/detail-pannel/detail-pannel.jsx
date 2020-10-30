import Axios from 'axios';
import { withRouter, Link } from 'react-router-dom'
import React, { Component } from 'react'
import SlidingPics from '../../../components/sliding-pics/sliding-pics'
import ContactPannel from '../../../components/contact-pannel/contact-pannel'
import { connect } from 'react-redux'
import { setDetail } from '../../../redux/actions/setDetail'
import { c2s } from '../../../config/c2s'
import './detail-pannel.scss'

function getCity (code) {
  switch (code) {
    case 1:
      return 'Jersey City'
    case 2:
      return 'Hoboken'
    case 3:
      return 'Weehawken'
    case 4:
      return 'Union City'
    default:
      return 'Hoboken'
  }
}
function getPayby(code) {
  switch (code) {
    case 1:
      return 'year'
    case 2:
      return 'month'
    case 3:
      return 'day'
    default:
      return 'Hoboken'
  }
}
function getRoomType(code){
  switch (code) {
    case 1:
      return 'This is a Master Bedroom, which means you have a private bathroom.'
    case 2:
      return 'This is a Second Bedroom, which means you share bathroom with your other roommates. '
    case 3:
      return 'This is a Livingroom, which means you share bathroom with your other roommates.'
    default:
      return 'This is a Master Bedroom, which means you have a private bathroom.'
  }
}
function getRoomType2(code){
  switch (code) {
    case 1:
      return 'Master Bedroom'
    case 2:
      return 'Second Bedroom'
    case 3:
      return 'Livingroom'
    default:
      return 'This is a Master Bedroom, which means you have a private bathroom.'
  }
}
function getIncluding(code) {
  let res = []
  //1:water, 2:electric, 3: gas, 4: internet
  for (let i = 0; i < code.length; i++) {
    let item = code[i]
    switch (item) {
      case 1:
        res.push("water")
        break
      case 2:
        res.push("electric")
        break
      case 3:
        res.push("gas")
        break
      case 4:
        res.push("internet")
        break
      default:
        break
    }
  }
  if (!res.length) return ""
  return "Including " + res.join(", ") + '.'
}
function getSexPrefer(code) {
  //1:MOnly, 2:FOnly, 0:default
  switch (code) {
    case 1:
      return 'Expecting a male tenant.'
    case 2:
      return 'Expecting a female tenant.'
    default:
      return 'Expecting a tenant, male or female.'
  }
}

function Detail({params}) {
  if (Object.keys(params).length === 0) return (<h3> Can't find this piece of info in our database.</h3>)
  return (
    <div className='detail-pannel-content'>
      <SlidingPics pics={params.pictures} />
      <div className="main-info">
        <span className="price">
            {"$" + params.price} per month
        </span>
          <span className="bnb">
          {params.bedrooms} bds | {params.bathrooms} ba | {getRoomType2(params.roomType)}
        </span>
        <div className="address">
          {params.address + ", " + getCity(params.city)}
         </div>
      </div>
      <div className='detail-list'>
        <h4> Address </h4>
        <ul>
          <li>{params.address + ', ' + getCity(params.city)}</li>
          <li>About {Math.round(params.time2Stevens)} minutes walk to Stevens</li>
        </ul>
        <h4> Rent </h4>
        <ul>
          <li>{params.price} $/Month. {getIncluding(params.including)}</li>
          <li>Rent is paid each {getPayby(params.payby)}</li>
          <li>Begin from {params.fromdate} {(params.todata !== undefined || params.todate !== "2120-08-12") && `to ${params.todate}`}</li>
        </ul>
        <h4>Room</h4>
        <ul>
          <li>{params.bedrooms} bedrooms, {params.bathrooms} bathrooms</li>
          <li>{getRoomType(params.roomType)}</li>
          <li> This room is offering {params.offering.map((item)=>{return c2s[item]}).join(', ') }. </li>
          {/* <li> You can use apartment's ...</li> */}
          <li> {params.roomDescribe} </li>
        </ul>
        <h4>Roommates</h4>
        <ul>
          <li>{params.roomateDescribe}</li>
        </ul>
        <h4>Others</h4>
        <ul>
          <li>{getSexPrefer(params.sexPrefer)}</li>
          {params.otherStatement?<li>{params.otherStatement}</li>:''}
        </ul>
        <h4>Contact</h4>
        <ul>
          <li>Email: {params.email}</li>
          {params.cellphone ? <li>Cellphone: {params.cellphone}</li> : ''}
          {params.facebook ? <li>Facebook: {params.facebook}</li> : ''}
          {params.wechat ? <li>WeChat: <div style={{ display: 'inline-block', verticalAlign:'top', width:'200px', height:'200px', backgroundImage:`url("${params.wechat}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain'}}></div></li>:''}
        </ul>

      </div>
      <ContactPannel />
    </div>
  )
}

class DetailPannel extends Component {
  componentDidMount() {
    let data = { email: this.props.location.pathname.slice(5) }
    Axios.get('/bknd/map/getDetail', {params: data})
      .then(value => {
        this.props.setDetail(value.data[0])
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <section id='detail-pannel'>
        
        <div className='detail-header'>
          <span>
            <Link to="/map">{'< Back'}</Link>
          </span>
          <span>{'Copy Link'}</span>
        </div>
        <div className='detail-header-place'></div>
        <Detail params={this.props.detail}/>
      </section>
    )
  }
}

export default withRouter(connect(
  (state) => ({detail: state.detail}),
  {setDetail}
)(DetailPannel))