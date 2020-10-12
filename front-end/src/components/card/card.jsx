import React, { Component } from 'react'
import { connect } from 'react-redux'
import { cardMoveIn, cardMoveOut } from '../../redux/actions/cardHovering'
import './card.scss'

class Card extends Component {
  getCity = (code) => {
    switch (code) {
      case '1':
        return 'Jersey City'
      case '2':
        return 'Hoboken'
      case '3':
        return 'Weehawken'
      case '4':
        return 'Union City'
      default:
        return 'Hoboken'
    }
  }
  mouseEnter = () => {
    this.props.cardMoveIn(this.props.info.geocode)
  }
  mouseLeave = () => {
    this.props.cardMoveOut({})
  }

  render() {
    return (
      <div className="card" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <img src={this.props.info.pictures[0]} alt="show" />
        <span className="price">
          {"$" + this.props.info.price} per month
        </span>
        <span className="bnb">
          {this.props.info.bedrooms} bds | {this.props.info.bathrooms} ba
        </span>
        <div className="address">
          {this.props.info.address + ", " + this.getCity(this.props.info.city)}
        </div>
      </div>
    )
  }
}

export default connect(
  () => ({}),
  { cardMoveIn, cardMoveOut }
)(Card)