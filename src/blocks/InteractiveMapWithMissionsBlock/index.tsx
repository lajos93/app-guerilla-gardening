'use client'

import React, { useState } from 'react'
import type { FC } from 'react'
import { MissionsBlock } from '../MissionsBlock'
import { MapBlock } from '../MapBlock'
import { MissionItem, MissionType } from '../MissionsBlock/types'
import { MapType } from '../MapBlock/types'

type Props = {
  missions: MissionType
  map: MapType
}

const InteractiveMapWithMissions: FC<Props> = ({ missions, map }) => {
  const defaultActiveMission = missions.missionItems?.find((item) => item.isDefault)

  const [activeMission, setActiveMission] = useState<MissionItem | null>(
    defaultActiveMission ?? null,
  )

  const handleMissionClick = (activeMission: MissionItem) => {
    setActiveMission(
      missions.missionItems?.find((item) => item.id === activeMission.id) ??
        defaultActiveMission ??
        null,
    )
  }

  return (
    <>
      <MissionsBlock
        {...missions}
        onMissionClick={handleMissionClick}
        activeMission={activeMission}
        titleBackgroundColor={map.titleBackgroundColor}
      />
      <MapBlock {...map} activeMission={activeMission} />
    </>
  )
}

export default InteractiveMapWithMissions
