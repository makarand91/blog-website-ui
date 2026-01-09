import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { fetchArticleBySlug, getAllArticleSlugs } from '@/lib/strapi'
import { formatDate, getRevalidateTime } from '@/lib/utils'
import { generateArticleMetadata, generateArticleJsonLd } from '@/lib/metadata'

// Enable ISR - revalidate every X seconds
export const revalidate = getRevalidateTime()

// Generate static paths for all articles
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const data = await fetchArticleBySlug(params.slug)

  if (!data) {
    return {
      title: 'Article Not Found',
    }
  }

  return generateArticleMetadata(data.article, data.brand)
}

export default async function ArticlePage({ params }) {
  const data = await fetchArticleBySlug(params.slug)

  if (!data) {
    notFound()
  }

  const { article, brand } = data
  const jsonLd = generateArticleJsonLd(article, brand)

  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-block mb-6 text-primary hover:underline">
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
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
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
    </>
  )
}
