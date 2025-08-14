import type { MissionItem } from '../MissionsBlock/types'

export type MapType = {
  titleBackgroundColor: string
  titleTextColor?: string
  extendedTitleTextColor?: string
  showDivider?: boolean
  activeMission?: MissionItem | null
  latitude: number
  longitude: number
  zoomLevel: number
  markerLabel?: string
}

export type MapBlockType = {
  blockType: 'map'
} & MapType
