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

import './style.css'
import { Filters, MapFilters } from '../Filter'

const GlifyLayer = dynamic(() => import('./Helpers/GlifyLayer').then((mod) => mod.GlifyLayer), {
  ssr: false,
})

export function MapBlockClient({
  anchor,
  center,
  zoom,
}: {
  anchor?: string
  center: [number, number]
  zoom: number
  height?: number
}) {
  const [currentZoom, setCurrentZoom] = useState(zoom)
  const [trees, setTrees] = useState<Tree[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    search: '',
    prioritySpecies: [],
    speciesCategories: [],
    categoryGroups: [],
    year: [2000],
    district: '',
  })
  const mapRef = useRef<LeafletMap | null>(null)

  async function fetchTrees(lat: number, lon: number, radiusKm: number) {
    try {
      setIsLoading(true)
      const pageSize = 300
      let allTrees: Tree[] = []

      const url = `/api/trees/in-radius?lat=${lat}&lon=${lon}&radius=${radiusKm}&page=1&pageSize=${pageSize}`
      const res = await fetch(url)
      const data = await res.json()
      allTrees = [...allTrees, ...(data.trees || [])]

      const total = data.total ?? 0
      const totalPages = Math.ceil(total / pageSize)

      for (let page = 2; page <= totalPages; page++) {
        const url = `/api/trees/in-radius?lat=${lat}&lon=${lon}&radius=${radiusKm}&page=${page}&pageSize=${pageSize}`
        const res = await fetch(url)
        const data = await res.json()
        allTrees = [...allTrees, ...(data.trees || [])]
      }

      setTrees(allTrees)
    } catch (err) {
      console.error('fetchTrees error', err)
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedFetchTrees = useRef(
    debounce((lat: number, lon: number, radiusKm: number) => {
      fetchTrees(lat, lon, radiusKm)
    }, 200),
  ).current

  const zoomThreshold = 16

  const filteredTrees = trees.filter((tree) => {
    return tree // ide jöhet a filter logika ha kell
  })

  return (
    <>
      {/* Overlay filters */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: 10,
          zIndex: 1000,
        }}
      >
        <MapFilters onChange={setFilters} />
        <div className="text-xs text-gray-500 mt-2">
          Zoom: {currentZoom}, Fák: {filteredTrees.length}
        </div>
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
            if (z > zoomThreshold) {
              const radiusKm = bounds.getCenter().distanceTo(bounds.getNorthEast()) / 1000
              debouncedFetchTrees(center[0], center[1], radiusKm)
            } else {
              setTrees([])
            }
          }}
        />

        {/* alap OSM réteg */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* saját tile réteg (default vagy kategóriás) */}
        {currentZoom <= zoomThreshold && (
          <TileLayer
            url={
              filters.speciesCategories.length > 0
                ? `/api/tiles/category/${encodeURIComponent(filters.speciesCategories[0])}/{z}/{x}/{y}`
                : `/api/tiles/{z}/{x}/{y}`
            }
            maxZoom={zoomThreshold}
          />
        )}

        {currentZoom > zoomThreshold && isLoading && (
          <Loader text="Loading trees..." isVisible={true} positionAbsolute />
        )}

        {currentZoom > zoomThreshold && filteredTrees.length > 0 && mapRef.current && (
          <GlifyLayer map={mapRef.current} trees={filteredTrees} />
        )}
      </MapContainer>
    </>
  )
}
