import React from 'react'
import './globals.css'
import './styles.css'
import { Providers } from './providers'
import { getTheme } from '@/lib/getTheme'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const theme = await getTheme()

  return (
    <html lang="en">
      <body
        style={{
          // override css variables with values from the database
          ['--primary' as any]: theme.primary,
          ['--primary-100' as any]: theme.primary100,
          ['--primary-500' as any]: theme.primary500,
          ['--primary-700' as any]: theme.primary700,
          ['--black' as any]: theme.black,
          ['--surface-500' as any]: theme.surface500,
          ['--muted-500' as any]: theme.muted500,
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
