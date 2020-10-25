import React, { Component } from 'react'
import './sliding-pics.scss'

export default class SlidingPics extends Component {
  state = { curPic: 0 }

  lastPicHandler = () => {
    if (this.state.curPic - 1 < 0) {
      this.setState({ curPic: this.props.pics.length - 1 })
    }
    else this.setState({ curPic: this.state.curPic - 1 })
  }
  nextPicHandler = () => {
    if (this.state.curPic + 1 >= this.props.pics.length) {
      this.setState({ curPic: 0 })
    }
    else {
      this.setState({ curPic: this.state.curPic + 1 })
    }
  }

  render() {
    return (
      <div className='sliding-pics'>
        {(() => {
          if (this.props.pics.length === 1) return <></>
          else return (
            <>
              <div className='lastPic' onClick={this.lastPicHandler}> {'<'} </div>
              <div className='nextPic' onClick={this.nextPicHandler}>{'>'}</div>
            </>
          )
        })()}
        <div className='slider' style={{ left: -100 * this.state.curPic + '%' }} >
          {this.props.pics.map(item => {
            return (
              <div key={item} style={{ backgroundImage: `url("${item}")` }}>
                {/* <img src={item} alt="detail-pic" /> */}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}