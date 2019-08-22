import { LinkedResourceContainer, Property } from 'link-redux'
import React, { Component } from 'react'

import { ns } from '../ns'
import { InfoPanel } from '../topologies/InfoPanel'

import Leaflet from './LeafletMap'

class App extends Component {
  render () {
    return (
      <React.Fragment>
        <div> React Leaflet</div>
        <Leaflet/>
        <InfoPanel>
          <LinkedResourceContainer subject={ns.app('selectedResources')}>
            <Property label={ns.rdfs('member')} limit={100} />
          </LinkedResourceContainer>
        </InfoPanel>
      </React.Fragment>
    )
  }
}

export default App
