import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchBrands = async () => {
  try {
    const response = await api.get('/brands')
    return response.data
  } catch (error) {
    console.error('Error fetching brands:', error)
    throw error
  }
}

export const fetchArticleBySlug = async (slug) => {
  try {
    const response = await api.get(`/articles/${slug}`)
    return response.data
  } catch (error) {
    console.error('Error fetching article:', error)
    throw error
  }
}

export default api
