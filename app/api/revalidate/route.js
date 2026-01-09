import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

/**
 * Webhook endpoint for Strapi to trigger revalidation
 *
 * Setup in Strapi:
 * 1. Go to Settings > Webhooks
 * 2. Create a new webhook with URL: https://your-domain.com/api/revalidate
 * 3. Add secret from REVALIDATE_SECRET env variable
 * 4. Enable events: entry.create, entry.update, entry.publish
 *
 * Request body should include:
 * {
 *   "model": "article" | "brand",
 *   "slug": "article-slug" (optional, for specific article)
 * }
 */
export async function POST(request) {
  try {
    // Verify webhook secret
    const secret = request.headers.get('x-webhook-secret')
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { model, slug } = body

    console.log('Revalidation triggered:', { model, slug })

    // Revalidate homepage (always, as it shows all articles)
    revalidatePath('/')

    // If specific article slug is provided, revalidate that page
    if (slug) {
      revalidatePath(`/article/${slug}`)
      console.log(`Revalidated article: ${slug}`)
    }

    // Revalidate sitemap
    revalidatePath('/sitemap.xml')

    return NextResponse.json({
      revalidated: true,
      message: 'Revalidation triggered successfully',
      paths: slug ? ['/', `/article/${slug}`, '/sitemap.xml'] : ['/', '/sitemap.xml'],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: error.message,
      },
      { status: 500 }
    )
  }
}

// Also support GET for testing
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    )
  }

  const slug = searchParams.get('slug')

  revalidatePath('/')
  if (slug) {
    revalidatePath(`/article/${slug}`)
  }
  revalidatePath('/sitemap.xml')

  return NextResponse.json({
    revalidated: true,
    message: 'Revalidation triggered (test mode)',
    paths: slug ? ['/', `/article/${slug}`, '/sitemap.xml'] : ['/', '/sitemap.xml'],
    timestamp: new Date().toISOString(),
  })
}
