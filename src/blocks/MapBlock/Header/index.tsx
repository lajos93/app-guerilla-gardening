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
            className="
              font-californian 
              text-lg sm:text-xl md:text-2xl
              px-6 sm:px-10 md:px-20 lg:px-40
              pt-8 md:pt-12 pb-3 md:pb-4
            "
          >
            {activeMission.title}
          </h3>

          {activeMission.extendedTitle && (
            <h2
              style={{ color: extendedTitleTextColor }}
              className="
                font-californian 
                text-2xl sm:text-3xl md:text-5xl 
                px-6 sm:px-10 md:px-20 lg:px-40
                pb-6 md:pb-8
              "
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
            zIndex: 9998,
            position: 'absolute',
          }}
        />
      )}
    </section>
  )
}
