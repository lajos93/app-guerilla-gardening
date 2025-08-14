'use client'

import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './style.css'

interface MapBlockClientProps {
  center: [number, number]
  zoom: number
  height?: number
}

export function MapBlockClient({ center, zoom, height }: MapBlockClientProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={zoom}
      scrollWheelZoom={true}
      style={{ height: height + 'px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  )
}
