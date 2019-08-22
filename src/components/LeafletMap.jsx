import { LinkedResourceContainer, Property, withLRS } from 'link-redux'
import React, { Component } from 'react'

import { TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import { ns } from '../ns'
import { Map } from '../topologies/Map'

const mapUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const mapCenter = [52.370216, 4.895168]
const zoomLevel = 12

class Leaflet extends Component {
  state = { currentZoomLevel: zoomLevel }

  componentDidMount () {
    const leafletMap = this.leafletMap.leafletElement
    leafletMap.on('zoomend', () => {
      const updatedZoomLevel = leafletMap.getZoom()
      this.handleZoomLevelChange(updatedZoomLevel)
    })
  }

  handleZoomLevelChange (newZoomLevel) {
    this.setState({ currentZoomLevel: newZoomLevel })
  }

  render () {
    window.console.log('this.state.currentZoomLevel ->',
      this.state.currentZoomLevel)

    return (
      <div>
        <Map
          innerRef={m => { this.leafletMap = m }}
          center={mapCenter}
          onClick={(e) => this.props.lrs.actions.maps.addMarker(e.latlng)}
          zoom={zoomLevel}
        >
          <TileLayer
            attribution={stamenTonerAttr}
            url={mapUrl}
          />
          <LinkedResourceContainer subject={ns.app('stories/1')}>
            <Property label={ns.rdfs('member')}>
              {(pois) => {
                return (
                  <React.Fragment>
                    {pois.map((poi) => (
                      <LinkedResourceContainer key={poi.value} subject={poi}/>
                    ))}
                  </React.Fragment>
                )
              }}
            </Property>
          </LinkedResourceContainer>
        </Map>
      </div>
    )
  }
}

export default withLRS(Leaflet)
