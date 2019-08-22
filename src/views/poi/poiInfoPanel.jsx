import React from 'react'

import { ns } from '../../ns'
import { infoPanelTopology } from '../../topologies/InfoPanel'

/**
 * We use a naming convention where we start with the class and append the topology name to it.
 * This component is used when a POI resource is rendered within the info panel, which is a list,
 * so our component renders list items
 */
export const PoiInfoPanel = ({ lat, lon }) => (
  <li>Selected point at ({lat.value}, {lon.value})</li>
)

PoiInfoPanel.type = ns.app("Poi")

PoiInfoPanel.topology = infoPanelTopology

PoiInfoPanel.mapDataToProps = {
  lat: ns.schema("latitude"),
  lon: ns.schema("longitude")
}
