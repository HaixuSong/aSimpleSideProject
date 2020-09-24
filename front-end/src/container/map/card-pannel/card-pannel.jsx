import React, { Component } from 'react'
import { setSortState } from '../../../redux/actions/button'
import { connect } from 'react-redux'
import './card-pannel.scss'

class CardPannel extends Component {

  componentDidMount = () => {
    console.log(this.props.sort);
  }

  changeSort = (e) => {
    console.log(e.currentTarget.value);
    setSortState(e.currentTarget.value)
  }

  render() {
    return (
      <section id="card-pannel">
        <div id="sorting">
          <span>10 Results</span>
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
          <li><div className="card"></div></li>
          <li><div className="card"></div></li>
          <li><div className="card"></div></li>
          <li><div className="card"></div></li>
          <li><div className="card"></div></li>
          <li><div className="card"></div></li>
          <li><div className="card"></div></li>
          <li><div className="card"></div></li>
          <li><div className="card"></div></li>
          <li><div className="card"></div></li>
        </ul>
      </section>
    )
  }
}

export default connect(
  (state) => ({ sort: state.sort }),
  { setSortState }
)(CardPannel)