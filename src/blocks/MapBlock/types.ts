import type { MissionItem } from '../MissionsBlock/types'

export type MapBlocKHeaderType = {
  titleBackgroundColor: string
  titleTextColor?: string
  extendedTitleTextColor?: string
  showDivider?: boolean
  activeMission?: MissionItem | null
  markerLabel?: string
}

export type MapBlockClientType = {
  latitude: number
  longitude: number
  zoomLevel: number
}

export type MapType = {} & MapBlocKHeaderType & MapBlockClientType

export type MapBlockType = {
  blockType: 'map'
} & MapType
