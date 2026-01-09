import { getAllArticles } from '@/lib/strapi'
import { getRevalidateTime } from '@/lib/utils'
import { generateHomeMetadata } from '@/lib/metadata'
import ArticleCard from '@/components/ArticleCard'

// Enable ISR - revalidate every X seconds
export const revalidate = getRevalidateTime()

// Generate metadata for SEO
export async function generateMetadata() {
  return generateHomeMetadata()
}

export default async function HomePage() {
  let articles = []
  let error = null

  try {
    articles = await getAllArticles()
  } catch (err) {
    error = 'Failed to load articles. Please try again later.'
    console.error('Error loading articles:', err)
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Latest Articles
        </h1>
        <p className="text-xl text-gray-600">
          Discover insightful stories and updates
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No articles found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
