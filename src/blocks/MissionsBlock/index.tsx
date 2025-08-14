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
        className="relative w-full pb-16 pl-40 pr-40 pr-4 text-left"
        style={{ backgroundColor }}
      >
        {missionTitle && <h3 className="text-[28px] text-primary mb-10">{missionTitle}</h3>}

        {missionItems && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionItems.map((item) => (
              <div
                onClick={() => onMissionClick?.(item)}
                key={'missionId=' + item.id}
                className={`flex items-start gap-4 w-full max-w-[368px] cursor-pointer ${
                  activeMission?.title === item.title ? 'bg-primary-light' : 'bg-transparent'
                }`}
              >
                <div className="min-w-[60px] h-[60px] flex items-center justify-center bg-white rounded-full shadow-md">
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
                  <h4 className="text-xl font-semibold text-primary mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-left">{item.description}</p>
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
