'use client'

import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useQuery } from '@tanstack/react-query'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import './style.css'
import { TreeType } from './types'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Loading } from './Loading'

// fetcher function
const fetchTrees = async (speciesFilter?: string): Promise<TreeType[]> => {
  let url = `/api/trees?limit=3`
  if (speciesFilter) {
    url += `&where[species.name][contains]=${encodeURIComponent(speciesFilter)}`
  }

  const res = await fetch(url)
  if (!res.ok) throw new Error('Network error while fetching trees')
  const data = await res.json()
  return data.docs.filter((t: any) => t.lat && t.lon)
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
  const [speciesFilter, setSpeciesFilter] = useState('')

  const {
    data: trees = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['trees', speciesFilter],
    queryFn: () => fetchTrees(speciesFilter),
  })

  const customIcon = L.icon({
    iconUrl: '/marker-icon.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  const createClusterCustomIcon = (cluster: any) => {
    return L.divIcon({
      html: `<div class="cluster-icon"><span>${cluster.getChildCount()}</span></div>`,
      className: '',
      iconSize: [40, 40],
    })
  }

  return (
    <div className="map-block-container" style={{ position: 'relative', height: height + 'px' }}>
      {/* Species filter input */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          backgroundColor: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        <input
          type="text"
          placeholder="Filter species..."
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
          style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0.25rem 0.5rem',
            width: '200px',
          }}
        />
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        minZoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
          showCoverageOnHover={false}
        >
          {trees.map((tree) => (
            <Marker key={tree.id} position={[tree.lat, tree.lon]} icon={customIcon}>
              <Popup>
                <strong>{tree.species.name}</strong>
                <br />
                Supply ID: {tree.supplyId}
                <br />
                Store Number: {tree.storeNumber}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      <Loading isLoading={isLoading} isError={isError} />
    </div>
  )
}
