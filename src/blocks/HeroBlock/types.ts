import type { Logo } from '@/payload-types'

export type HeroType = {
  anchor?: string
  backgroundImage: {
    filename: string
    url: string
    width: number
    height: number
  }
  logo?: Logo
  lowResBackgroundImageBase64?: string
  mobileBackgroundImage?: {
    filename: string
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

export type HeroBlockType = {
  blockType: 'hero'
} & HeroType
