import React from 'react'
import type { Page } from '@/payload-types'
import { MapBlock } from './MapBlock/Component'  

export const RenderBlocks: React.FC<{ blocks: Page['layout'] }> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        if (block.blockType === 'map') {
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
        }

        return null
      })}
    </>
  )
}
