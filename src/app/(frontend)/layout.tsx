// app/layout.tsx
import React from 'react'
import './globals.css'
import './styles.css'
import { Providers } from './providers'
import { getTheme } from '@/lib/getTheme'
import { getNavigation } from '../../lib/getNavigation'
import { getLogo } from '../../lib/getLogo'
import { HeaderWrapper } from '../../components/layout/HeaderWrapper'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode
  searchParams: { lang?: string }
}) {
  const lang = (searchParams?.lang as 'hu' | 'en') || 'hu'

  const theme = await getTheme()
  const navigation = await getNavigation(lang)
  const logo = await getLogo()

  return (
    <html lang={lang}>
      <body
        style={{
          ['--primary' as any]: theme.primary,
          ['--primary-100' as any]: theme.primary100,
          ['--primary-500' as any]: theme.primary500,
          ['--primary-700' as any]: theme.primary700,
          ['--black' as any]: theme.black,
          ['--surface-500' as any]: theme.surface500,
          ['--muted-500' as any]: theme.muted500,
        }}
      >
        <Providers>
          <HeaderWrapper navigation={navigation} logo={logo} />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
