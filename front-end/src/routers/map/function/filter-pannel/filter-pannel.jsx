import React, { Component } from 'react'
import './filter-pannel.scss'


class FilterPannel extends Component {
  state = {
    Price: false,
    Distance2Stevens: false,
    BedsNBaths: false,
    HomeType: false,
    RoomType: false,
    Toilet: false,
    Parking: false,
  }

  buttonClick = (e) => {
    console.log('click');
    e.stopPropagation()
    var obj = {}
    var name = document.activeElement.id
    obj[name] = !this.state[name];
    this.setState(obj)
  }
  buttonBlur = (e) => {
    e.stopPropagation()
    var obj = {}
    obj[e.target.id] = false;
    this.setState(obj)
  }

  render() {
    return (
      <section id="filter-pannel" >
        <button id="Price" className={this.state.Price ? "buttonFocus" : "buttonNotFocus"} onMouseUp={this.buttonClick} onBlur={this.buttonBlur}>
          Price
          <div style={{ display: this.state.Price ? "block" : "none" }}>
          </div>
        </button>

        <button id="Distance2Stevens" onFocus={this.buttonClick}>Distance to Stevens</button>
        <button id="BedsNBaths" onClick={this.buttonClick}>Beds & Baths</button>
        <button id="HomeType" onClick={this.buttonClick}>Home Type</button>
        <button id="RoomType" onClick={this.buttonClick}>Room Type</button>
        <button id="Toilet" onClick={this.buttonClick}>Private Toilet</button>
        <button id="Parking" onClick={this.buttonClick}>Parking</button>
      </section>
    )
  }
}


export default FilterPannel