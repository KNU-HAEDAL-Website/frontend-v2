import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui'
import { ReactQueryClientProvider } from '@/lib/query-client'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KNU HAEDAL',
  description: '경북대학교 프로그래밍 동아리 해달',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="ko">
        <body className={inter.className}>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ReactQueryClientProvider>
  )
}
