import React, { Component } from 'react'
import './map-detail.scss'
import { GoogleMap, LoadScript, Marker, StreetViewPanorama } from '@react-google-maps/api'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'

const LIBRARIES = ['geometry']
class MapDetail extends Component {
  state = {
    response: null
  }

  scriptLoaded = () => {
    console.log(window.google);
  }
  directionsCallback = (response) => {
    console.log(response)
    if (response !== null) {
      if (response.status === 'OK') {
        this.setState({ response: response })
      } else {
        console.log('response: ', response)
      }
    }
  }

  render() {
    return (
      <div id='map-detail'>
        <LoadScript googleMapsApiKey="AIzaSyCElTKRMzXILFNLITlmINlyPS9eMHX4uFY" libraries={LIBRARIES}>
          <GoogleMap id="simple-gmap" mapContainerStyle={{ width: "100%", height: "100%" }} zoom={20} center={this.props.detail.geocode} onLoad={this.scriptLoaded}>
            {((params) => {
              if (Object.keys(params).length === 0) return
              return (
                <>
                  <Marker position={params.geocode} />
                  <StreetViewPanorama
                    position={params.geocode}
                    visible={true}
                  />
                </>
              )
            })(this.props.detail)}
          </GoogleMap>
        </LoadScript>
      </div >
    )
  }
}

export default withRouter(connect(
  (state) => ({ detail: state.detail, cardGeo: state.cardGeo }),
  {}
)(MapDetail))