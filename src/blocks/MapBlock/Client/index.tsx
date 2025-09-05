'use client'

import { useRef, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Map as LeafletMap, LatLngBounds } from 'leaflet'
import dynamic from 'next/dynamic'
import debounce from 'lodash/debounce'

import { MapEvents } from './Helpers/MapEvents'
import { Tree } from './types'
import Loader from '../../../components/loader'

// dynamic import, ssr false
const GlifyLayer = dynamic(() => import('./Helpers/GlifyLayer').then((mod) => mod.GlifyLayer), {
  ssr: false,
})

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
  const [trees, setTrees] = useState<Tree[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const mapRef = useRef<LeafletMap | null>(null)

  // fetch trees
  async function fetchTrees(lat: number, lon: number, radiusKm: number) {
    setIsLoading(true)
    try {
      const pageSize = 300
      let page = 1
      let allTrees: Tree[] = []
      let total = 0

      async function fetchPage(p: number) {
        const url = `/api/trees/in-radius?lat=${lat}&lon=${lon}&radius=${radiusKm}&page=${p}&pageSize=${pageSize}`
        const res = await fetch(url)
        const data = await res.json()

        if (p === 1) total = data.total ?? 0

        allTrees = [...allTrees, ...(data.trees || [])]
        setTrees([...allTrees])
      }

      await fetchPage(page)
      const totalPages = Math.ceil(total / pageSize)
      for (page = 2; page <= totalPages; page++) fetchPage(page) // async, don't await
    } catch (err) {
      console.error('fetchTrees error', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Debounce for fetchTrees
  const debouncedFetchTrees = useRef(
    debounce((lat: number, lon: number, radiusKm: number) => {
      fetchTrees(lat, lon, radiusKm)
    }, 200),
  ).current

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
        ref={mapRef}
      >
        <MapEvents
          onCenterChange={(center, z, bounds: LatLngBounds) => {
            setCurrentZoom(z)

            if (z > 14) {
              const radiusKm = bounds.getCenter().distanceTo(bounds.getNorthEast()) / 1000
              debouncedFetchTrees(center[0], center[1], radiusKm)
            } else {
              setTrees([])
            }
          }}
        />

        {/* OSM tile layer */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* custom tiles until zoom level 14 */}
        {currentZoom <= 14 && <TileLayer url="/api/tiles/{z}/{x}/{y}" maxZoom={14} />}

        {/* Loader overlay while fetching trees */}
        {currentZoom > 14 && isLoading && (
          <Loader text="Loading trees..." isVisible={true} positionAbsolute />
        )}

        {/* GlifyLayer 15+ zoom */}
        {currentZoom > 14 && trees.length > 0 && mapRef.current && (
          <GlifyLayer map={mapRef.current} trees={trees} />
        )}
      </MapContainer>
    </div>
  )
}
