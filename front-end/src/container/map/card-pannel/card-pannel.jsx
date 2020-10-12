import React, { Component } from 'react'
import { setSortState } from '../../../redux/actions/button'
import { connect } from 'react-redux'
import Card from '../../../components/card/card'
import './card-pannel.scss'

class CardPannel extends Component {

  componentDidMount = () => {
    console.log(this.props.sort);
    console.log('card-pannel');
    console.log(this.props.allData);
  }

  changeSort = (e) => {
    console.log(e.currentTarget.value);
    setSortState(e.currentTarget.value)
  }

  test = () => {
    console.log(this.props.cardGeo);
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
              <li onMouseDown={this.test} key={item.email}><Card key={item.email} info={item} /></li>
            )
          })}
        </ul>

      </section>
    )
  }
}

export default connect(
  (state) => ({ sort: state.sort, allData: state.allData, cardGeo: state.cardGeo }),
  { setSortState }
)(CardPannel)