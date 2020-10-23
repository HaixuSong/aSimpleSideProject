import React, { Component } from 'react'
import { connect } from 'react-redux'
import './img-upload.scss'
import axios from 'axios'
import { getNewHouseState } from '../../../redux/actions/getNewHouseState'
import imageCompression from 'browser-image-compression';

class ImgUpload extends Component {

  postimg = (e) => {
    console.log('posting');
    let file = e.target.files[0]
    if (!file) return
    console.log('originalFile instanceof Blob', file instanceof Blob); // true
    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
    var options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true
    }
    imageCompression(file, options)
      .then(compressedFile => {
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        var formdata1 = new FormData()
        formdata1.append('img', compressedFile, compressedFile.name);
        let config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        axios.post(this.props.addRoute, formdata1, config)
          .then((response) => {
            console.log(response.data)
            if (response.data.uploaded) {
              this.props.getNewHouseState()
            }
          })
          .catch(error => {
            console.log('Didn\'t post image.' + error);
          })
      })
      .catch(function (error) {
        console.log(error.message);
      });


  }



  deleteImg = (picURL) => {
    return ((e) => {
      e.preventDefault()
      axios.post(this.props.deleteRoute, { picURL })
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
      <div className="img-upload">
        {this.props.imgs.map((item) => {
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
          if (this.props.imgs.length === this.props.maxImg) return
          else {
            return (
              <section className="upload-new">
                <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" id={this.props.name} style={{ display: "none" }} onChange={this.postimg} />
                <label htmlFor={this.props.name}><span>+</span> <br /> Upload Image </label>
              </section>
            )
          }
        })()}

      </div>
    )
  }
}

ImgUpload = connect(
  () => ({}),
  { getNewHouseState }
)(ImgUpload)

export default ImgUpload