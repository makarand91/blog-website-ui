import { useState, useEffect } from 'react'
import { fetchBrands } from '../services/api'
import ArticleCard from '../components/ArticleCard'
import Loading from '../components/Loading'

function Home() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadBrands = async () => {
      try {
        setLoading(true)
        const data = await fetchBrands()
        setBrands(data.data || [])
      } catch (err) {
        setError('Failed to load articles. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadBrands()
  }, [])

  if (loading) return <Loading />

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    )
  }

  const allArticles = brands.flatMap((brand) =>
    brand.articles.map((article) => ({
      ...article,
      brandname: brand.brandname,
      sponsor: brand.sponsor,
    }))
  )

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

      {allArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No articles found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              brandname={article.brandname}
              sponsor={article.sponsor}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
