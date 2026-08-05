import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'クレファン | 南極を目指す物語',
  description:
    '地域冒険家・澤口真里佳による南極渡航プロジェクト「クレファン」。大義名分ではなく、等身大の衝動から始まる航海の記録。',
  openGraph: {
    title: 'クレファン | 南極を目指す物語',
    description:
      '地域冒険家・澤口真里佳による南極渡航プロジェクト「クレファン」。大義名分ではなく、等身大の衝動から始まる航海の記録。',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'クレファン | 南極を目指す物語',
    description:
      '地域冒険家・澤口真里佳による南極渡航プロジェクト「クレファン」。大義名分ではなく、等身大の衝動から始まる航海の記録。',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
