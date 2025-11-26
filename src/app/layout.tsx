import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hup Holland - Funding for Your Startup',
  description: 'Find funding opportunities for your startup and scaleup',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white" suppressHydrationWarning>{children}</body>
    </html>
  )
}
