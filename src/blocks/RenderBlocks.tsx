import React from 'react'

import { MapBlock } from './MapBlock'
import { HeroBlock } from './HeroBlock'
import { AboutBlock } from './AboutBlock'
import { MissionsBlock } from './MissionsBlock'
import InteractiveMapWithMissions from './InteractiveMapWithMissionsBlock'

import type { HeroBlockType } from './HeroBlock/types'
import type { MapBlockType } from './MapBlock/types'
import type { AboutBlockType } from './AboutBlock/types'
import type { MissionsBlockType } from './MissionsBlock/types'
import type { InteractiveMapWithMissionsType } from './InteractiveMapWithMissionsBlock/types'

type BlockMap = {
  map: MapBlockType
  hero: HeroBlockType
  about: AboutBlockType
  missions: MissionsBlockType
  interactiveMapWithMissions: InteractiveMapWithMissionsType
}

export type Block = BlockMap[keyof BlockMap]

interface RenderBlocksProps {
  blocks: Block[]
}

export const RenderBlocks: React.FC<RenderBlocksProps> = ({ blocks }) => {
  if (!blocks.length) return null

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'map':
            return <MapBlock key={index} {...block} />

          case 'hero':
            return <HeroBlock key={index} {...block} />

          case 'about':
            return <AboutBlock key={index} {...block} />

          case 'missions':
            return <MissionsBlock key={index} {...block} />

          case 'interactiveMapWithMissions':
            return <InteractiveMapWithMissions key={index} {...block} />

          default:
            return null
        }
      })}
    </>
  )
}
