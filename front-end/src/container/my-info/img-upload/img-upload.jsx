import React, { Component } from 'react'
import { connect } from 'react-redux'
import './img-upload.scss'
import axios from 'axios'
import { getNewHouseState } from '../../../redux/actions/getNewHouseState'

class ImgUpload extends Component {
  componentDidMount = () => {
    this.props.getNewHouseState()
  }

  postimg = (e) => {
    console.log('posting');
    let file = e.target.files[0]
    if (!file) return
    var formdata1 = new FormData()
    formdata1.append('img', file, file.name);
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    axios.post('/my-info/postimage', formdata1, config).then((response) => {
      console.log(response.data)
      if (response.data.uploaded) {
        this.props.getNewHouseState()
      }
    })
  }

  deleteImg = (picURL) => {
    return ((e) => {
      e.preventDefault()
      axios.post('/my-info/deleteimage', { picURL })
        .then(value => {
          console.log(value.data)
          if (value.data.deleted) {
            this.props.getNewHouseState()
          } else {
            console.log('Failed to delete. Sever Problem');
          }
        })
        .catch(err => console.log('Failed to delete picture: ' + err))
    })
  }


  render() {
    return (
      <div id="img-upload">
        {this.props.houseStatus.pictures.map((item) => {
          return (
            <div key={item} className="showImg">
              <img src={item} alt="Broken Img" />
              <div className="deleteImg">
                <button onClick={this.deleteImg(item)}>DELETE</button>
              </div>
            </div>
          )
        })}
        {(() => {
          if (this.props.houseStatus.pictures.length === this.props.maxImg) return
          else {
            return (
              <section id="upload-new">
                <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" id="upload" style={{ display: "none" }} onChange={this.postimg} />
                <label htmlFor="upload"><span>+</span> <br /> Upload Image </label>
              </section>
            )
          }
        })()}

      </div>
    )
  }
}

ImgUpload = connect(
  state => ({ houseStatus: state.houseStatus }),
  { getNewHouseState }
)(ImgUpload)

export default ImgUpload