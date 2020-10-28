import React, { Component } from 'react'
import './map-pannel.scss'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'

const MAPCENTER = {
  lat: 40.7450,
  lng: -74.05
}
const STEVENS = {
  lat: 40.7451,
  lng: -74.0248
}

class MapPannel extends Component {
  state = {
    direction: null
  }

  colorMap = (price) => {
    if (price <= 500) return "rgb(255, 100, 100)"
    if (price <= 800) return "rgb(215, 75, 75)"
    if (price <= 1000) return "rgb(180, 50, 50)"
    if (price <= 1200) return "rgb(140, 25, 25)"
    return "rgb(100, 0, 0)"
  }

  markerClick = (email) => {
    return (() => {
      this.props.history.push(`/map/${email}`)
    })
  }
  directionsCallback = (res) => {
    console.log(res);
  }

  render() {
    return (
      <section id="map-pannel">
        <LoadScript googleMapsApiKey="AIzaSyCElTKRMzXILFNLITlmINlyPS9eMHX4uFY" >
          <GoogleMap id="simple-gmap" mapContainerStyle={{ width: "100%", height: "100%" }} zoom={14} center={MAPCENTER} >
            {this.props.allData.map((item) => {
              return (
                <Marker
                  key={item.email}
                  position={item.geocode}
                  onClick={this.markerClick(item.email)}
                  label={{
                    text: item.price.toString(),
                    color: "white",
                    fontSize: "11px"
                  }} icon={{
                    path:
                      "M150,0 A150,150 0 0,1 -150,0 A150,150 0 0,1 150,0",
                    fillColor: this.colorMap(item.price),
                    fillOpacity: 1.0,
                    scale: 0.1,
                    strokeColor: "grey",
                    strokeWeight: 1.5
                  }} title={item.bedrooms + " bds, " + item.bathrooms + "ba"} />
              )
            })}
            {(this.props.cardGeo) && <Marker
              key={"hoverd"}
              position={this.props.cardGeo}
              icon={{
                path:
                  "M150,0 A150,150 0 0,1 -150,0 A150,150 0 0,1 150,0",
                fillColor: "yellow",
                fillOpacity: 0.3,
                scale: 0.1,
                strokeColor: "yellow",
                strokeWeight: 3.0
              }}
              zIndex={99999} />}
            <Marker
              key='SIT'
              position={STEVENS} />
          </GoogleMap>
        </LoadScript>
      </section>
    )
  }
}

export default withRouter(connect(
  (state) => ({ cardGeo: state.cardGeo, sort: state.sort, filter: state.filter }),
  {}
)(MapPannel))