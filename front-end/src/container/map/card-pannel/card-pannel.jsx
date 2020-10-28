import React, { Component } from 'react'
import { setSortState } from '../../../redux/actions/button'
import { connect } from 'react-redux'
import Card from '../../../components/card/card'
import ContactPannel from '../../../components/contact-pannel/contact-pannel'
import './card-pannel.scss'

class CardPannel extends Component {
  changeSort = (e) => {
    this.props.setSortState(e.currentTarget.value)
  }

  render() {
    return (
      <section id="card-pannel">
        <div id="sorting">
          <span>{this.props.allData.length} {this.props.allData.length > 1 ? "Resluts" : "Result"}</span>
          <div className="sort-choice">
            <label htmlFor="sortby">Sorted by</label>
            <select name="sortby" id="sortby" defaultValue={this.props.sort} onChange={this.changeSort}>
              <option value="1">Distance</option>
              <option value="2">Price(Low to High)</option>
              <option value="3">Price(High to Low)</option>
              <option value="4">Newest</option>
            </select>
          </div>
        </div>
        <ul>
          {this.props.allData.map((item) => {
            return (
              <li key={item.email}><Card key={item.email} info={item} /></li>
            )
          })}
        </ul>
        <div className="clear"></div>
        <ContactPannel />
      </section>
    )
  }
}

export default connect(
  (state) => ({ sort: state.sort }),
  { setSortState }
)(CardPannel)