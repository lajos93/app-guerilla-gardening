import { MapType } from '../MapBlock/types'
import { MissionType } from '../MissionsBlock/types'

export type InteractiveMapWithMissionsType = {
  blockType: 'interactiveMapWithMissions'
  missions: MissionType
  map: MapType
}
