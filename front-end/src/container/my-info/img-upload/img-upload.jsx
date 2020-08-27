import React, { Component } from 'react'
import { connect } from 'react-redux'
import './img-upload.scss'
import axios from 'axios'
import { getNewHouseState } from '../../../redux/actions/getNewHouseState'

class ImgUpload extends Component {
  componentWillMount = () => {
    console.log(this.props.houseStatus);
  }

  postimg = (e) => {
    let file = e.target.files[0]
    var formdata1 = new FormData()
    formdata1.append('img', file, file.name);
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    axios.post('/my-info/postimage', formdata1, config).then((response) => {
      console.log(response.data)
    })
  }


  render() {
    return (
      <div id="img-upload">
        <section id="upload-new">
          <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" id="upload" style={{ display: "none" }} onChange={this.postimg} />
          <label htmlFor="upload"><span>+</span> <br /> Upload Image </label>
        </section>
      </div>
    )
  }
}

ImgUpload = connect(
  state => ({ houseStatus: state.houseStatus }),
  { getNewHouseState }
)(ImgUpload)

export default ImgUpload