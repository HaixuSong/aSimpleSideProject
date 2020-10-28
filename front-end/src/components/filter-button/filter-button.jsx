import React, { Component } from 'react'
import './filter-button.scss'
import { connect } from 'react-redux'
import { setFilterState } from '../../redux/actions/button'

// Need to give a config to this component

class FilterButton extends Component {
  state = { toggle: false }

  showDetail = () => {
    this.setState({ toggle: !this.state.toggle })
  }
  clickHandler = (e) => {
    const choice = e.target.textContent
    let data = { choice }
    data.name = this.props.config.name
    console.log(data);
    this.props.setFilterState(data)
    this.setState({ toggle: false })
  }

  render() {
    return (
      <div id="filter-button" className={this.state.toggle ? "buttonFocus" : ""}>
        <button id="name" onClick={this.showDetail}>{this.props.filter[this.props.config.name]}</button>
        <div id="choices" style={{ display: this.state.toggle ? "block" : "none" }}>
          {
            this.props.config.config.map((item) => {
              return (
                <button key={item} onClick={this.clickHandler}>{item}</button>
              )
            }
            )
          }
          <button key={this.props.config.name} onClick={this.clickHandler}>Reset Default</button>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({ filter: state.filter }),
  { setFilterState }
)(FilterButton)


