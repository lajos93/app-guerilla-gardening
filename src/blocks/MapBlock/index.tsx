'use client'

import dynamic from 'next/dynamic'
import type { MapType } from './types'
import { mapHeight } from './constants'
import Loader from '../../components/loader'
import { MapBlockHeader } from './Header'

// Dynamically import the MapBlockClient component to avoid SSR issues with Leaflet
const MapBlockClient = dynamic(() => import('./Client').then((mod) => mod.MapBlockClient), {
  ssr: false,
  loading: () => <Loader isVisible={true} />,
})

export const MapBlock = ({
  anchor,
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
      <MapBlockHeader
        titleBackgroundColor={titleBackgroundColor}
        titleTextColor={titleTextColor}
        extendedTitleTextColor={extendedTitleTextColor}
        showDivider={showDivider}
        activeMission={activeMission}
      />
      <MapBlockClient
        anchor={anchor}
        center={[latitude, longitude]}
        zoom={zoomLevel}
        height={mapHeight}
      />
    </>
  )
}
