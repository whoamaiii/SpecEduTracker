import { Link } from 'wouter'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">SpecEduTracker</div>
            <div className="space-x-4">
              <Link href="/">
                <a className="hover:text-primary">Dashboard</a>
              </Link>
              <Link href="/daily-log">
                <a className="hover:text-primary">Daglig Logg</a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}