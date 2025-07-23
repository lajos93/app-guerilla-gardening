import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

type AboutBlockProps = {
  backgroundColor: string
  title: string
  titleHighlight?: string
  richDescription?: any
  missionTitle?: string
  missionItems?: {
    icon: {
      url: string
      width: number
      height: number
    }
    title: string
    description: string
  }[]
}

export const AboutBlock = ({
  backgroundColor,
  title,
  titleHighlight,
  richDescription,
  missionTitle,
  missionItems,
}: AboutBlockProps) => {
  return (
    <section className="relative w-full pb-16 pt-8 bg-gray-100" style={{ backgroundColor }}>
      <div className="pl-[160px] pr-4 text-left">
        {/* Title */}
        <h2 className="text-[24px]  text-[#646463] mb-4">{title}</h2>
        {titleHighlight && (
          <h1 className="text-[54px]  text-[#4f5f21] leading-none">{titleHighlight}</h1>
        )}

        {richDescription && (
          <div className="whitespace-pre-line text-[18px] text-black mb-6 mt-6 max-w-4xl">
            <RichText data={richDescription} />
          </div>
        )}

        {/* Horizontal rule */}
        <hr className="w-[150px] border-t-2 border-gray-400 mb-12 mt-12" />

        {/* Mission title */}
        {missionTitle && <h3 className="text-[28px] text-primary mb-10">{missionTitle}</h3>}

        {/* Mission items in horizontal layout */}
        {missionItems && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 w-full max-w-[368px]" // 👈 limiting item width
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
      </div>
    </section>
  )
}
