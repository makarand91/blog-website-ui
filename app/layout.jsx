import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Blog Portal - Latest Articles',
    template: '%s | Blog Portal',
  },
  description: 'Discover insightful articles and stories. Your source for quality content and updates.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Blog Portal',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
