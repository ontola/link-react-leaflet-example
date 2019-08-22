import { TopologyProvider } from 'link-redux'
import React from 'react'
import { Map as LeafletMap } from 'react-leaflet';

import { ns } from '../../ns'

export const mapTopology = ns.app("topologies/map")

export class Map extends TopologyProvider {
  constructor(props) {
    super(props)

    this.topology = mapTopology
  }

  /**
   * Here we provide our own render implementation so mounting this topoology provider also
   * instantiates a react-leaflet Map. The `wrap` function is inherited from TopologyProvider and
   * sets handles setting the topology context to the value set in the constructor.
   */
  render() {
    const {
      children,
      innerRef,
      ...other
    } = this.props

    return this.wrap((
      <LeafletMap ref={innerRef} {...other}>
        {children}
      </LeafletMap>
    ))
  }
}
