import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || ''

app.use(cors())
app.use(express.json())

const strapiClient = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` })
  }
})

app.get('/api/brands', async (req, res) => {
  try {
    const response = await strapiClient.get('/api/brands?populate=articles')
    res.json(response.data)
  } catch (error) {
    console.error('Error fetching brands:', error.message)
    res.status(500).json({
      error: 'Failed to fetch brands from Strapi',
      message: error.message
    })
  }
})

app.get('/api/articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params

    const brandsResponse = await strapiClient.get('/api/brands?populate=articles')
    const brands = brandsResponse.data.data

    let foundArticle = null
    let foundBrand = null

    for (const brand of brands) {
      const article = brand.articles?.find(a => a.slug === slug)
      if (article) {
        foundArticle = article
        foundBrand = {
          brandname: brand.brandname,
          sponsor: brand.sponsor,
          logo: brand.logo,
          sponsor_logo: brand.sponsor_logo
        }
        break
      }
    }

    if (!foundArticle) {
      return res.status(404).json({ error: 'Article not found' })
    }

    res.json({ article: foundArticle, brand: foundBrand })
  } catch (error) {
    console.error('Error fetching article:', error.message)
    res.status(500).json({
      error: 'Failed to fetch article from Strapi',
      message: error.message
    })
  }
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Strapi URL: ${STRAPI_URL}`)
})
