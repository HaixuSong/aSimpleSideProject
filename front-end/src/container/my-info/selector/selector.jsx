import React, { Component } from 'react'

export default class Selector extends Component {
  choiceFirstHandler = (signal) => {
    if (this.props.notShowingLabel) return
    if ((this.props.choiceFirst && signal === "before") || (!this.props.choiceFirst && signal === "after")) return
    return (<label htmlFor={this.props.name} style={{ textTransform: "capitalize" }}>
      {this.props.name}
    </label>)
  }

  render() {
    return (
      <div className="selector" style={{ display: "inline-block" }}>
        {this.choiceFirstHandler("before")}
        <select name={this.props.name} id={this.props.name} defaultValue={this.props.value || ""} onChange={this.props.change} >
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
        {this.choiceFirstHandler("after")}
      </div>
    )
  }
}
