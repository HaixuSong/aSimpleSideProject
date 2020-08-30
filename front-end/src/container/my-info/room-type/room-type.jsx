import React, { Component } from 'react'

export default class RoomType extends Component {
  state = {
    roomType: "0"
  }

  changeHandler = (e) => {
    this.setState({
      roomType: e.target.value
    })
  }

  render() {
    return (
      <div id="room-type">
        <select name="roomType" id="roomType" onChange={this.changeHandler}>
          <option value="0">Master Bedroom</option>
          <option value="1">Guest Bedroom</option>
          <option value="2">Living Room</option>
        </select>
        <span>{(() => {
          switch (this.state.roomType) {
            case "0":
              return "which means having an individual bathroom"
            case "1":
            case "2":
            default:
              return "which means sharing bathroom"
          }
        })()
        }</span>
      </div>
    )
  }
}