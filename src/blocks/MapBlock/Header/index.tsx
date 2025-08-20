'use client'

import BlockDivider from '../../../components/blockDivider'
import { MapBlocKHeaderType } from '../types'

export const MapBlockHeader = ({
  titleBackgroundColor,
  titleTextColor,
  extendedTitleTextColor,
  showDivider,
  activeMission,
}: MapBlocKHeaderType) => {
  return (
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
  )
}
