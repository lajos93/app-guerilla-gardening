'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import './style.css'
import { TreeType } from './types'

export function MapBlockClient({
  center,
  zoom,
  height,
}: {
  center: [number, number]
  zoom: number
  height?: number
}) {
  const [trees, setTrees] = useState<TreeType[]>([])

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const res = await fetch('/api/trees?limit=50')
        if (!res.ok) throw new Error('Network error while fetching trees')
        const data = await res.json()
        const validTrees = data.docs.filter((t: any) => t.lat && t.lon)
        setTrees(validTrees)
      } catch (err) {
        console.error(err)
      }
    }
    fetchTrees()
  }, [])

  const customIcon = L.icon({
    iconUrl: '/marker-icon.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={zoom}
      scrollWheelZoom={true}
      style={{ height: height + 'px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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
    </MapContainer>
  )
}
