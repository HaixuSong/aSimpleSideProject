import React, { Component } from 'react'
import './filter-pannel.scss'
import FilterButton from '../../../components/filter-button/filter-button'
import { priceConfig, distanceConfig, bedroomsConfig, roomTypeConfig } from '../../../config/filter-button-config'

class FilterPannel extends Component {

  render() {
    return (
      <section id="filter-pannel">
        <FilterButton key="price" config={priceConfig} />
        <FilterButton key="distance" config={distanceConfig} />
        <FilterButton key="bderooms" config={bedroomsConfig} />
        <FilterButton key="roomtype" config={roomTypeConfig} />
      </section>
    )
  }
}


export default FilterPannel