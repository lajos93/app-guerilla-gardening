'use client'

import dynamic from 'next/dynamic'
import BlockDivider from '../../components/blockDivider'
import type { MapType } from './types'
import { mapHeight } from './constants'
import Loader from '../../components/loader'

// Dynamically import the MapBlockClient component to avoid SSR issues with Leaflet
const MapBlockClient = dynamic(() => import('./MapBlockClient').then((mod) => mod.MapBlockClient), {
  ssr: false,
  loading: () => <Loader />,
})

export const MapBlock = ({
  titleBackgroundColor,
  titleTextColor,
  extendedTitleTextColor,
  showDivider,
  latitude,
  longitude,
  zoomLevel,
  activeMission,
}: MapType) => {
  return (
    <>
      <section style={{ backgroundColor: titleBackgroundColor }} className="relative">
        {activeMission?.title && (
          <div>
            <h3
              style={{ color: titleTextColor }}
              className="font-californian text-2xl text-white pl-40 pr-40 pt-12 pb-4"
            >
              {activeMission.title}
            </h3>

            {activeMission.extendedTitle && (
              <h2
                style={{ color: extendedTitleTextColor }}
                className="font-californian text-5xl text-white pl-40 pr-40 pb-8"
              >
                {activeMission.extendedTitle}
              </h2>
            )}
          </div>
        )}
        {showDivider && (
          <BlockDivider
            fill={titleBackgroundColor}
            style={{
              marginBottom: '-60px',
              zIndex: 999,
              position: 'absolute',
            }}
          />
        )}
      </section>
      <MapBlockClient center={[latitude, longitude]} zoom={zoomLevel} height={mapHeight} />
    </>
  )
}
