export type MissionItem = {
  icon: {
    url: string
    width: number
    height: number
  }
  id: number
  title: string
  extendedTitle?: string
  description: string
  isDefault?: boolean
}

export type MissionType = {
  backgroundColor: string
  titleBackgroundColor?: string
  missionTitle?: string
  missionItems?: MissionItem[]
  activeMission: MissionItem | null
  onMissionClick?: (item: MissionItem) => void
  showDivider?: boolean
}

export type MissionsBlockType = {
  blockType: 'missions'
} & MissionType
