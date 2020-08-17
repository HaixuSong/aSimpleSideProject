import React, { Component } from 'react'
import './function.scss'
import MapPannel from './map-pannel/map-pannel'
import CardPannel from './card-pannel/card-pannel'
import FilterPannel from './filter-pannel/filter-pannel'



export default class Function extends Component {
  render() {
    return (
      <section id="function">
        <FilterPannel />
        <CardPannel />
        <MapPannel />
      </section>
    )
  }
}