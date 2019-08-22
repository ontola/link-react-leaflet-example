import { TopologyProvider } from 'link-redux'
import React from 'react'

import { ns } from '../../ns'

export const infoPanelTopology = ns.app("topologies/infoPanel")

export class InfoPanel extends TopologyProvider {
  constructor(props) {
    super(props)

    /** Sets the topology on all children within this component until another topoogyprovider is mounted */
    this.topology = infoPanelTopology
    /** The TopologyProvider component has a default implementation of render,
     *  the element can be set in the constructor, it defaults to a div
     */
    this.elementType = "ul"
    /** As can the class of the element */
    this.className = "InfoPanel"
  }
}
