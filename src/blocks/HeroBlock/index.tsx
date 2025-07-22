// src/blocks/HeroBlock/HeroBlock.tsx
import Image from 'next/image'

type HeroBlockProps = {
  backgroundImage: {
    url: string
    width: number
    height: number
  }
  title: string
  subtitle?: string
  ctaButtons: {
    label: string
    target: string
    style: 'primary' | 'secondary'
  }[]
}

export const HeroBlock = ({ backgroundImage, title, subtitle, ctaButtons }: HeroBlockProps) => {
  const aspectRatio = backgroundImage.width / backgroundImage.height

  return (
    <section className="relative w-full">
      {/* Container to maintain image aspect ratio */}
      <div
        className="w-full"
        style={{
          position: 'relative',
          paddingBottom: `${100 / aspectRatio}%`,
        }}
      >
        {/* Background Image */}
        <Image
          src={backgroundImage.url}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-start text-center px-4 text-white z-10 pt-[4%]">
          <h1 className="text-4xl text-primary md:text-[120px]">{title}</h1>
          {subtitle && <h2 className={`text-xl -mt-2 md:text-[50px] text-primary`}>{subtitle}</h2>}
          <div className="mt-2 flex flex-col md:flex-row gap-6 font-californian">
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
    </section>
  )
}
