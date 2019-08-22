import { RenderStoreProvider } from 'link-redux'
import React from 'react'
import ReactDOM from 'react-dom'

import L from 'leaflet'

import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
})

L.Marker.prototype.options.icon = DefaultIcon

import App from './components/App'
import { lrs } from './lrs'

import './components/main.css'

ReactDOM.render((
  <RenderStoreProvider value={lrs}>
    <App />
  </RenderStoreProvider>
), document.getElementById('root'))
