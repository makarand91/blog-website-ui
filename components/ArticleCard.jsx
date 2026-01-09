import Link from 'next/link'
import { formatDate, generateExcerpt } from '@/lib/utils'

export default function ArticleCard({ article }) {
  const excerpt = generateExcerpt(article.content, 200)

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        {article.is_sponsored && (
          <div className="flex items-center mb-3">
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Sponsored
            </span>
            {article.sponsor && (
              <span className="ml-2 text-sm text-gray-600">by {article.sponsor}</span>
            )}
          </div>
        )}

        <Link href={`/article/${article.slug}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors">
            {article.title}
          </h2>
        </Link>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <span>{article.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </div>

        {article.category && article.category.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.category.map((cat, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <p className="text-gray-700 mb-4 line-clamp-3">{excerpt}</p>

        <Link
          href={`/article/${article.slug}`}
          className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Read More
        </Link>
      </div>
    </article>
  )
}
