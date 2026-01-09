import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-primary">Blog Portal</h1>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#about" className="text-gray-700 hover:text-primary transition-colors">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
