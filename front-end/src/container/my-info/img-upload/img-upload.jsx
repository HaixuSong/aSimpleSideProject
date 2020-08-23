import React, { Component } from 'react'
import './img-upload.scss'
import axios from 'axios'

export default class ImgUpload extends Component {
  postimg = (e) => {
    let file = e.target.files[0]
    var formdata1 = new FormData();
    formdata1.append('img', file, file.name);
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    axios.post('http://localhost:4000/my-info/postimage', formdata1, config).then((response) => {
      console.log(response.data);
    })
    // axios.post('http://localhost:4000/my-info/postimage')
  }


  render() {
    return (
      <div id="img-upload">
        <section id="upload-new">
          <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" id="upload" style={{ display: "none" }} onChange={this.postimg} />
          <label htmlFor="upload"><span>+</span> <br /> Upload Image</label>
        </section>
      </div>
    )
  }
}