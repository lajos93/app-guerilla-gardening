import React from 'react'
import { MapBlock } from './MapBlock'
import { HeroBlock } from './HeroBlock'

type MapBlockType = {
  blockType: 'map'
  latitude: number
  longitude: number
  zoomLevel: number
  markerLabel?: string
}

type HeroBlockType = {
  blockType: 'hero'
  backgroundImage: {
    url: string
    width: number
    height: number
  }
  title: string
  subtitle?: string
  subtitleSize?: 'xs' | 's' | 'm' | 'l' | 'xl'
  ctaButtons: {
    label: string
    target: string
    style: 'primary' | 'secondary'
  }[]
}

type Block = MapBlockType | HeroBlockType

export const RenderBlocks: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'map':
            return (
              <div key={index} className="my-16">
                <MapBlock
                  latitude={block.latitude}
                  longitude={block.longitude}
                  zoomLevel={block.zoomLevel}
                  markerLabel={block.markerLabel ?? undefined}
                />
              </div>
            )

          case 'hero':
            return (
              <div key={index}>
                <HeroBlock
                  backgroundImage={block.backgroundImage}
                  title={block.title}
                  subtitle={block.subtitle}
                  ctaButtons={block.ctaButtons}
                />
              </div>
            )

          default:
            return null
        }
      })}
    </>
  )
}
