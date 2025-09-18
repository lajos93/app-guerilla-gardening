'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet.vectorgrid'
import { Feature } from 'geojson'
import './style.css'

function VectorGridLayer({ setCurrentZoom }: { setCurrentZoom: (z: number) => void }) {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    const vectorLayer = L.vectorGrid.protobuf(
      'https://app-guerilla-gardening-tile-server.onrender.com/maps/trees/{z}/{x}/{y}.pbf',
      {
        vectorTileLayerStyles: {
          trees: {
            weight: 1,
            color: 'green',
            fill: true,
            fillColor: 'green',
            fillOpacity: 0.5,
          },
        },
        interactive: true,
        maxZoom: 18,
        getFeatureId: (feature: any) => feature.properties?.id,
      },
    )

    vectorLayer.addTo(map)

    const onZoom = () => setCurrentZoom(map.getZoom())
    map.on('zoomend', onZoom)

    return () => {
      map.removeLayer(vectorLayer)
      map.off('zoomend', onZoom)
    }
  }, [map, setCurrentZoom])

  return null
}

export function MapBlockClient({
  center,
  zoom,
  height,
}: {
  center: [number, number]
  zoom: number
  height?: number
}) {
  const [currentZoom, setCurrentZoom] = useState(zoom)

  return (
    <div style={{ position: 'relative', height: (height ?? 600) + 'px' }}>
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: 10,
          zIndex: 1000,
          backgroundColor: 'white',
          padding: '0.5rem 1rem',
          borderRadius: 8,
        }}
      >
        Current zoom: {currentZoom}
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        {/* OSM háttér */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* VectorGrid Layer */}
        <VectorGridLayer setCurrentZoom={setCurrentZoom} />
      </MapContainer>
    </div>
  )
}
