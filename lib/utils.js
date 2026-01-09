/**
 * Format date to readable string
 */
export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`

  return formatDate(dateString)
}

/**
 * Generate article excerpt from content
 */
export function generateExcerpt(content, maxLength = 200) {
  if (!content) return ''

  // Remove markdown syntax for cleaner excerpt
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*|__/g, '') // Remove bold
    .replace(/\*|_/g, '') // Remove italic
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links
    .replace(/`{1,3}[^`]*`{1,3}/g, '') // Remove code
    .trim()

  if (plainText.length <= maxLength) return plainText

  return plainText.substring(0, maxLength).trim() + '...'
}

/**
 * Generate SEO-friendly URL slug
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

/**
 * Get base URL for the site
 */
export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

/**
 * Get revalidate time from environment or default
 */
export function getRevalidateTime() {
  return parseInt(process.env.REVALIDATE_TIME || '60', 10)
}

/**
 * Get thumbnail URL from Strapi media object
 * Supports multiple formats and fallbacks
 */
export function getThumbnailUrl(thumbnail, format = 'medium') {
  if (!thumbnail) return null

  // Check if thumbnail has formats
  if (thumbnail.formats) {
    // Try requested format first
    if (thumbnail.formats[format]) {
      return thumbnail.formats[format].url
    }

    // Fallback order: medium -> small -> thumbnail -> original
    const fallbackOrder = ['medium', 'small', 'thumbnail']
    for (const fmt of fallbackOrder) {
      if (thumbnail.formats[fmt]) {
        return thumbnail.formats[fmt].url
      }
    }
  }

  // Return original URL as last resort
  return thumbnail.url || null
}

/**
 * Get image alt text from Strapi media object
 */
export function getImageAlt(thumbnail, defaultAlt = '') {
  if (!thumbnail) return defaultAlt
  return thumbnail.alternativeText || thumbnail.caption || thumbnail.name || defaultAlt
}
