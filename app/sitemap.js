import { getAllArticles } from '@/lib/strapi'
import { getBaseUrl } from '@/lib/utils'

export default async function sitemap() {
  const baseUrl = getBaseUrl()

  try {
    const articles = await getAllArticles()

    const articleUrls = articles.map((article) => ({
      url: `${baseUrl}/article/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      ...articleUrls,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return at least the homepage if there's an error
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ]
  }
}
