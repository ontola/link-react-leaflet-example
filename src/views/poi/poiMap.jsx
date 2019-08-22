import { useLRS } from 'link-redux'
import { Marker } from 'react-leaflet'
import React from 'react'

import { ns } from '../../ns'
import { mapTopology } from '../../topologies/Map'

/**
 * When a POI is rendered within the `Map` topology, use this component
 */
export const PoiMap = ({ lat, lon, subject }) => {
  const lrs = useLRS()

  return (
    <Marker
      position={[Number(lat.value), Number(lon.value)]}
      onClick={() => lrs.actions.maps.toggleMarker(subject)}
    />
  );
}

PoiMap.type = ns.app("Poi")

PoiMap.topology = mapTopology

PoiMap.mapDataToProps = {
  lat: ns.schema("latitude"),
  lon: ns.schema("longitude")
}
