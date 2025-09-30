import Image from 'next/image'
import BlockDivider from '../../components/blockDivider'
import { MissionType } from './types'

export const MissionsBlock = ({
  backgroundColor,
  titleBackgroundColor,
  missionTitle,
  missionItems,
  activeMission,
  onMissionClick,
  showDivider,
}: MissionType) => {
  return (
    <>
      <section
        className="
          relative w-full text-left
          px-6 sm:px-10 md:px-20 lg:px-40
          pt-8 pb-12 md:pb-16
        "
        style={{ backgroundColor }}
      >
        {missionTitle && (
          <h3 className="text-2xl md:text-[28px] text-primary mb-6 md:mb-10">{missionTitle}</h3>
        )}

        {missionItems && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {missionItems.map((item) => (
              <div
                onClick={() => onMissionClick?.(item)}
                key={'missionId=' + item.id}
                className={`
                  flex items-start gap-4 w-full
                  cursor-pointer rounded-lg p-3 md:p-0
                  ${activeMission?.title === item.title ? 'bg-primary-light' : 'bg-transparent'}
                `}
              >
                <div className="min-w-[50px] h-[50px] md:min-w-[60px] md:h-[60px] flex items-center justify-center bg-white rounded-full shadow-md">
                  {item.icon?.url && (
                    <Image
                      src={item.icon.url}
                      alt={item.title}
                      width={55}
                      height={55}
                      className="object-contain p-2"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg md:text-xl font-semibold text-primary mb-1 md:mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm md:text-base text-left">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      {showDivider === true && (
        <BlockDivider
          fill={backgroundColor}
          style={titleBackgroundColor ? { backgroundColor: titleBackgroundColor } : undefined}
        />
      )}
    </>
  )
}
