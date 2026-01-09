import axios from 'axios'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || ''

const strapiClient = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` })
  }
})

/**
 * Fetch all brands with their articles from Strapi
 * Used for static generation and revalidation
 */
export async function fetchBrands() {
  try {
    const response = await strapiClient.get('/brands?populate=articles')
    return response.data
  } catch (error) {
    console.error('Error fetching brands:', error.message)
    throw error
  }
}

/**
 * Fetch a single article by slug
 * Used for ISR article pages
 */
export async function fetchArticleBySlug(slug) {
  try {
    const brandsResponse = await strapiClient.get('/brands?populate=articles')
    const brands = brandsResponse.data.data

    let foundArticle = null
    let foundBrand = null

    for (const brand of brands) {
      const article = brand.articles?.find(a => a.slug === slug)
      if (article) {
        foundArticle = article
        foundBrand = {
          id: brand.id,
          documentId: brand.documentId,
          brandname: brand.brandname,
          sponsor: brand.sponsor,
          logo: brand.logo,
          sponsor_logo: brand.sponsor_logo
        }
        break
      }
    }

    if (!foundArticle) {
      return null
    }

    return { article: foundArticle, brand: foundBrand }
  } catch (error) {
    console.error('Error fetching article:', error.message)
    throw error
  }
}

/**
 * Get all article slugs for static path generation
 */
export async function getAllArticleSlugs() {
  try {
    const brandsData = await fetchBrands()
    const slugs = []

    brandsData.data.forEach(brand => {
      if (brand.articles && Array.isArray(brand.articles)) {
        brand.articles.forEach(article => {
          if (article.slug) {
            slugs.push(article.slug)
          }
        })
      }
    })

    return slugs
  } catch (error) {
    console.error('Error fetching article slugs:', error.message)
    return []
  }
}

/**
 * Get all articles with their brands for the homepage
 */
export async function getAllArticles() {
  try {
    const brandsData = await fetchBrands()
    const articles = []

    brandsData.data.forEach(brand => {
      if (brand.articles && Array.isArray(brand.articles)) {
        brand.articles.forEach(article => {
          articles.push({
            ...article,
            brandname: brand.brandname,
            sponsor: brand.sponsor,
            brandLogo: brand.logo,
            sponsorLogo: brand.sponsor_logo
          })
        })
      }
    })

    // Sort by publication date, newest first
    articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

    return articles
  } catch (error) {
    console.error('Error fetching all articles:', error.message)
    return []
  }
}
