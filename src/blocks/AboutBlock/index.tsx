import { RichText } from '@payloadcms/richtext-lexical/react'
import type { AboutType } from './types'

export const AboutBlock = ({
  backgroundColor,
  title,
  titleHighlight,
  richDescription,
}: AboutType) => {
  return (
    <section
      className="relative w-full pb-2 pt-8 bg-gray-100 pl-40 pr-40 pr-4 text-left"
      style={{ backgroundColor }}
    >
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
      <hr className="w-[150px] border-t-2 border-gray-400 mb-12 mt-14" />
    </section>
  )
}
