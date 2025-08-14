export type HeroType = {
  backgroundImage: {
    filename: string
    url: string
    width: number
    height: number
  }
  lowResBackgroundImageBase64?: string
  title: string
  subtitle?: string
  ctaButtons: {
    label: string
    target: string
    style: 'primary' | 'secondary'
  }[]
}

export type HeroBlockType = {
  blockType: 'hero'
} & HeroType
