'use client'

import dynamic from 'next/dynamic'

// Dynamically import the MapBlockClient component to avoid SSR issues with Leaflet
const MapBlockClient = dynamic(() => import('./MapBlockClient').then((mod) => mod.MapBlockClient), {
  ssr: false,
})

interface Props {
  latitude: number
  longitude: number
  zoomLevel: number
  markerLabel?: string
}

export const MapBlock = ({ latitude, longitude, zoomLevel }: Props) => {
  return <MapBlockClient center={[latitude, longitude]} zoom={zoomLevel} />
}
