import React, { Component } from 'react'

export default class RoomType extends Component {
  render() {
    return (
      <div className="room-type">
        <select name={this.props.name} id={this.props.name} onChange={this.props.change}>
          <option value="" style={{ display: "none" }}>{this.props.default}</option>
          {this.props.choices.map((item) => {
            if (item.value === this.props.value) {
              return (
                <option value={item.value} key={item.value} selected>{item.choice}</option>
              )
            }
            return (
              <option value={item.value} key={item.value}>{item.choice}</option>
            )
          })}
        </select>
        <span>{(() => {
          switch (this.props.value) {
            case 1:
              return "which means having an individual bathroom"
            case 2:
            case 3:
              return "which means sharing bathroom"
            default:
              return "please choose a room type"
          }
        })()
        }</span>
      </div>
    )
  }
}