import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { fetchArticleBySlug } from '../services/api'
import { formatDate } from '../utils/formatDate'
import Loading from '../components/Loading'

function ArticleDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [brand, setBrand] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true)
        const data = await fetchArticleBySlug(slug)
        setArticle(data.article)
        setBrand(data.brand)
      } catch (err) {
        setError('Article not found or failed to load.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [slug])

  if (loading) return <Loading />

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Article not found'}
        </div>
        <Link to="/" className="inline-block mt-4 text-primary hover:underline">
          ← Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-block mb-6 text-primary hover:underline">
          ← Back to Home
        </Link>

        <article className="max-w-4xl mx-auto">
          {article.is_sponsored && (
            <div className="flex items-center mb-4">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded">
                Sponsored Content
              </span>
              {brand && brand.sponsor && (
                <span className="ml-3 text-gray-600">by {brand.sponsor}</span>
              )}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {article.title}
          </h1>

          <div className="flex items-center text-gray-600 mb-6 pb-6 border-b">
            <span className="font-medium">{article.author}</span>
            <span className="mx-3">•</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>

          {article.category && article.category.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.category.map((cat, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          <div className="mt-12 pt-8 border-t">
            <p className="text-gray-600">
              Published on {formatDate(article.publishedAt)}
              {brand && brand.brandname && ` • ${brand.brandname}`}
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}

export default ArticleDetail
