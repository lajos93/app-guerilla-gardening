import { RichText } from '@payloadcms/richtext-lexical/react'
import type { AboutType } from './types'

export const AboutBlock = ({
  anchor,
  backgroundColor,
  title,
  titleHighlight,
  richDescription,
}: AboutType) => {
  return (
    <section id={anchor} style={{ backgroundColor }}>
      {/* Mobile version */}
      <div className="block md:hidden relative w-full pb-6 pt-8 px-6 text-left">
        <h2 className="text-lg text-[#646463] mb-4">{title}</h2>
        {titleHighlight && (
          <h1 className="text-3xl text-[#4f5f21] leading-snug">{titleHighlight}</h1>
        )}

        {richDescription && (
          <div className="whitespace-pre-line text-base text-black mb-6 mt-6">
            <RichText data={richDescription} />
          </div>
        )}

        <hr className="w-24 border-t-2 border-gray-400 mt-14 mb-0 md:mb-12" />
      </div>

      {/* Desktop version */}
      <div className="hidden md:block relative w-full pb-2 pt-8 pl-40 pr-40 text-left">
        <h2 className="text-[24px] text-[#646463] mb-4">{title}</h2>
        {titleHighlight && (
          <h1 className="text-[54px] text-[#4f5f21] leading-none">{titleHighlight}</h1>
        )}

        {richDescription && (
          <div className="whitespace-pre-line text-[18px] text-black mb-6 mt-6 max-w-4xl">
            <RichText data={richDescription} />
          </div>
        )}

        <hr className="w-[150px] border-t-2 border-gray-400 mb-4 mt-14" />
      </div>
    </section>
  )
}
