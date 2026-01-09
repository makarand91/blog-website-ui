import { getBaseUrl, generateExcerpt } from './utils'

/**
 * Generate metadata for article pages
 */
export function generateArticleMetadata(article, brand) {
  const baseUrl = getBaseUrl()
  const articleUrl = `${baseUrl}/article/${article.slug}`
  const excerpt = generateExcerpt(article.content, 160)

  return {
    title: article.title,
    description: excerpt,
    authors: [{ name: article.author }],
    openGraph: {
      type: 'article',
      url: articleUrl,
      title: article.title,
      description: excerpt,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      tags: article.category || [],
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Blog Portal',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: excerpt,
      creator: article.author,
    },
    alternates: {
      canonical: articleUrl,
    },
    keywords: article.category ? article.category.join(', ') : undefined,
  }
}

/**
 * Generate metadata for homepage
 */
export function generateHomeMetadata() {
  const baseUrl = getBaseUrl()
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Blog Portal'
  const description = 'Discover insightful articles and stories. Your source for quality content and updates.'

  return {
    title: `${siteName} - Latest Articles`,
    description,
    openGraph: {
      type: 'website',
      url: baseUrl,
      title: siteName,
      description,
      siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description,
    },
    alternates: {
      canonical: baseUrl,
    },
  }
}

/**
 * Generate JSON-LD structured data for articles
 */
export function generateArticleJsonLd(article, brand) {
  const baseUrl = getBaseUrl()
  const articleUrl = `${baseUrl}/article/${article.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: generateExcerpt(article.content, 160),
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    url: articleUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: brand?.brandname || process.env.NEXT_PUBLIC_SITE_NAME || 'Blog Portal',
    },
    ...(article.category && {
      keywords: article.category.join(', '),
    }),
  }
}
