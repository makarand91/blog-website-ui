# Strapi CMS Blog UI - Next.js with ISR & SEO

A high-performance blog/newsletter website built with Next.js 14 (App Router), Tailwind CSS, and Strapi CMS integration. Features ISR (Incremental Static Regeneration), comprehensive SEO, and automatic revalidation via webhooks.

## Why Next.js for Newsletter/Blog Sites?

### SEO Advantages
- **Server-Side Rendering (SSR)** - Pages are fully rendered and indexable by search engines
- **Static Generation (SSG)** - Ultra-fast loading with pre-rendered HTML
- **Metadata API** - Built-in support for title, description, Open Graph, and Twitter cards
- **Structured Data** - JSON-LD for rich search results
- **Sitemap & Robots.txt** - Automatic generation for better crawlability

### ISR = Perfect for Strapi Publishing Workflow
- **Incremental Static Regeneration** - Pages are cached but automatically update
- **Webhook Integration** - Strapi triggers revalidation on publish/update
- **CDN-Level Speed** - Serve static pages from edge locations
- **No Full Rebuilds** - Only changed pages are regenerated
- **Background Updates** - Users always see fast, cached content

## Features

- ✅ **ISR with Configurable Revalidation** - Auto-refresh on publish or time-based
- ✅ **Comprehensive SEO** - Meta tags, Open Graph, Twitter Cards, JSON-LD
- ✅ **Webhook Revalidation** - Instant updates from Strapi
- ✅ **Sitemap Generation** - Dynamic sitemap.xml for all articles
- ✅ **Article Archives** - Clean URLs for newsletter/blog posts
- ✅ **Sponsored Content Support** - Badge and sponsor information
- ✅ **Category/Tag Support** - Organize and filter content
- ✅ **Markdown Rendering** - Full article content with styling
- ✅ **Responsive Design** - Mobile-first with Tailwind CSS
- ✅ **Fast Loading** - Static generation with edge caching

## Tech Stack

- **Next.js 14** - App Router, Server Components, ISR
- **React 18** - Server and Client Components
- **Tailwind CSS** - Utility-first styling
- **Axios** - API client for Strapi
- **React Markdown** - Content rendering

## Project Structure

```
.
├── app/
│   ├── api/
│   │   └── revalidate/         # Webhook endpoint for Strapi
│   ├── article/
│   │   └── [slug]/             # Dynamic article pages (ISR)
│   ├── layout.jsx              # Root layout with Header/Footer
│   ├── page.jsx                # Homepage with article listing (ISR)
│   ├── sitemap.js              # Dynamic sitemap generation
│   └── robots.js               # Robots.txt configuration
├── components/                  # React components
├── lib/
│   ├── strapi.js               # Strapi API client
│   ├── metadata.js             # SEO metadata generators
│   └── utils.js                # Utility functions
├── public/                      # Static assets
└── next.config.js              # Next.js configuration
```

## Installation

### Prerequisites
- Node.js 18+ (for Next.js 14)
- Running Strapi CMS instance
- npm or yarn

### Setup Steps

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd blog-website-ui
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**

Create a `.env.local` file:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Strapi CMS Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Blog Portal

# ISR Configuration
REVALIDATE_TIME=60

# Webhook Secret (generate a secure random string)
REVALIDATE_SECRET=your_webhook_secret_here
```

4. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Strapi Configuration

### Required Collections

#### Brands Collection
- `brandname` (String)
- `sponsor` (String)
- `logo` (Media - optional)
- `sponsor_logo` (Media - optional)
- `articles` (Relation - has many)

#### Articles Collection (related to Brands)
- `title` (String) - Article headline
- `slug` (String - unique) - URL-friendly identifier
- `content` (Rich Text/Markdown) - Full article content
- `author` (String) - Author name
- `category` (JSON - array of strings) - Tags/categories
- `tags` (String - optional) - Additional tags
- `is_sponsored` (Boolean) - Sponsored content flag
- `publishedAt` (DateTime) - Publication date
- `updatedAt` (DateTime) - Last modified date

### API Permissions

In Strapi, enable public access to:
- `brands` - find, findOne
- `articles` - find, findOne

Or configure API token with appropriate permissions.

## ISR & Revalidation

### How ISR Works

1. **First Request** - Page is statically generated at build time or first visit
2. **Cached Serving** - Subsequent requests serve the cached static page
3. **Background Revalidation** - After `REVALIDATE_TIME` seconds, page regenerates in background
4. **Webhook Updates** - Strapi can trigger immediate revalidation

### Setting Up Strapi Webhooks

For instant updates when content is published:

1. **In Strapi Admin:**
   - Go to **Settings → Webhooks**
   - Click **Create new webhook**

2. **Configure Webhook:**
   ```
   Name: Revalidate Next.js
   URL: https://your-domain.com/api/revalidate
   Headers:
     x-webhook-secret: your_webhook_secret_here
   Events:
     - entry.publish
     - entry.update
     - entry.delete
   ```

3. **Webhook Body (optional custom script):**
```json
{
  "model": "article",
  "slug": "{slug}"
}
```

### Testing Revalidation

Test the webhook endpoint:
```bash
curl -X GET "http://localhost:3000/api/revalidate?secret=your_webhook_secret_here&slug=article-slug"
```

## SEO Features

### Metadata & Open Graph

Every article page includes:
- Page title and description
- Open Graph tags (for social media)
- Twitter Card tags
- Canonical URLs
- Author information
- Publication dates

### Structured Data (JSON-LD)

Articles include Schema.org `Article` structured data:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "author": { "@type": "Person", "name": "Author Name" },
  "datePublished": "2024-01-01T00:00:00.000Z",
  "dateModified": "2024-01-02T00:00:00.000Z"
}
```

### Sitemap

Automatically generated at `/sitemap.xml`:
- Homepage (priority: 1.0, daily updates)
- All article pages (priority: 0.8, weekly updates)
- Includes last modified dates

### Robots.txt

Generated at `/robots.txt`:
- Allows all crawlers
- Points to sitemap.xml
- Blocks API routes

## Production Deployment

### Build for Production

```bash
npm run build
```

This generates:
- Optimized static pages
- Server components
- Client-side JavaScript bundles

### Start Production Server

```bash
npm start
```

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

Vercel automatically:
- Builds on push
- Handles ISR caching
- Provides edge CDN
- Supports webhooks

### Deploy to Other Platforms

Next.js can be deployed to:
- AWS (with `@opennextjs/aws`)
- Docker containers
- Node.js servers
- Cloudflare Pages
- Netlify

## Configuration

### Revalidation Time

Adjust `REVALIDATE_TIME` in `.env.local`:
```env
REVALIDATE_TIME=60  # Revalidate every 60 seconds
```

Or set per-page in code:
```javascript
export const revalidate = 300 // 5 minutes
```

### Tailwind Theme

Customize colors in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
    },
  },
}
```

### Strapi Images

Configure allowed domains in `next.config.js`:
```javascript
images: {
  domains: ['localhost', 'your-strapi-domain.com'],
}
```

## Performance

### Core Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s with ISR
- **FID** (First Input Delay): < 100ms with React 18
- **CLS** (Cumulative Layout Shift): 0 with optimized layout

### Optimization Features

- Server Components for zero JavaScript
- Automatic code splitting
- Image optimization with next/image
- Font optimization
- CSS optimization

## Troubleshooting

### Common Issues

**Articles not displaying:**
- Verify Strapi is running
- Check `NEXT_PUBLIC_STRAPI_URL` in `.env.local`
- Verify API token permissions in Strapi
- Check browser console and server logs

**Webhook not working:**
- Verify `REVALIDATE_SECRET` matches in both Strapi and `.env.local`
- Check webhook URL is publicly accessible
- Review webhook logs in Strapi admin

**Build errors:**
- Ensure Strapi is accessible during build
- Check for syntax errors in components
- Verify all environment variables are set

**ISR not updating:**
- Check `REVALIDATE_TIME` is set correctly
- Verify webhook secret is correct
- Check Next.js server logs for revalidation events

**SEO issues:**
- Use Google Search Console to test
- Check meta tags with browser DevTools
- Validate structured data at schema.org validator
- Test Open Graph with Facebook Debugger

## Development

### Run Development Server

```bash
npm run dev
```

### Lint Code

```bash
npm run lint
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run build && npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js ISR Guide](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating)
- [Strapi Documentation](https://docs.strapi.io/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
