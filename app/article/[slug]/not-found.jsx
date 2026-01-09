import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
      <p className="text-xl text-gray-600 mb-8">
        The article you are looking for does not exist or has been removed.
      </p>
      <Link
        href="/"
        className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  )
}
