import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ententes de visibilité',
  description: 'Gestion des ententes de visibilité avec les partenaires',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <header className="border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto max-w-4xl px-4 py-4">
            <h1 className="text-lg font-bold text-indigo-700">
              Ententes de visibilité
            </h1>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
