// src/blocks/HeroBlock/HeroBlock.tsx
import Image from 'next/image'
import type { HeroType } from './types'
import { isMedia } from '@/utils/isMedia'

export async function HeroBlock({
  anchor,
  logo,
  backgroundImage,
  lowResBackgroundImageBase64,
  mobileBackgroundImage,
  title,
  subtitle,
  ctaButtons,
}: HeroType) {
  const aspectRatio = backgroundImage.width / backgroundImage.height

  return (
    <section id={anchor} className="relative w-full">
      {/* Container to maintain image aspect ratio */}
      <div
        className="w-full"
        style={{
          position: 'relative',
          paddingBottom: `${100 / aspectRatio}%`,
        }}
      >
        <picture>
          {mobileBackgroundImage && (
            <source srcSet={mobileBackgroundImage.url} media="(max-width: 768px)" />
          )}
          <Image
            src={backgroundImage.url}
            alt="Hero background"
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={lowResBackgroundImageBase64}
            sizes="100vw"
          />
        </picture>

        {/* Logo aligned vertically with text */}
        <div className="absolute left-0 z-20 top-[calc(4%+40px)] ml-[-6px] hidden md:block">
          {isMedia(logo?.logo) && (
            <Image
              src={logo.logo.url}
              alt={logo.altText}
              width={84}
              height={84}
              className="object-contain"
              priority
            />
          )}
        </div>

        {/* Overlay Content (title, subtitle, buttons) */}
        <div
          className="
    absolute inset-0 flex flex-col items-center text-center px-4 text-white z-10
    justify-end pb-6
    md:justify-start md:pt-[4%] md:pb-0
  "
        >
          {/* Mobile version (title + subtitle + buttons egyben) */}
          <div className="flex flex-col items-center md:hidden -mb-12">
            <h1 className="text-3xl font-bold uppercase text-surface500">{title}</h1>
            {subtitle && <h2 className="text-base text-surface500 mt-1">{subtitle}</h2>}

            <div className="mt-3 flex flex-col gap-4 font-californian w-full items-center">
              {ctaButtons?.map((btn, i) => (
                <a
                  key={i}
                  href={btn.target}
                  className={`
      px-4 py-2 rounded-full transition font-bold min-w-[200px] text-center
      ${
        btn.style === 'primary'
          ? 'bg-black text-white hover:bg-[#2a2a2a] md:inline-block'
          : 'bg-white text-black border border-black hover:bg-[#e5e5e5] hidden md:inline-block'
      }
    `}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop version (title + subtitle + buttons külön marad) */}
          <div className="hidden md:flex flex-col items-center">
            <h1 className="text-4xl md:text-[102px] uppercase font-bold text-primary">{title}</h1>
            {subtitle && <h2 className="text-xl md:text-[50px] text-primary -mt-2">{subtitle}</h2>}

            <div className="mt-2 flex flex-row gap-6 font-californian">
              {ctaButtons?.map((btn, i) => (
                <a
                  key={i}
                  href={btn.target}
                  className={`px-4 py-1 rounded-full transition font-bold min-w-[200px] text-center ${
                    btn.style === 'primary'
                      ? 'bg-black text-white hover:bg-[#2a2a2a]'
                      : 'bg-white text-black border border-black hover:bg-[#e5e5e5]'
                  }`}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
