import { api } from './api'

interface AuthResponse {
  success: boolean
  message: string
  data: {
    token: string
    user: {
      id: string
      name: string
      email: string
      avatar?: string
      role: 'buyer' | 'seller'
    }
  }
}

export const auth = {
  setToken(token: string) {
    localStorage.setItem('token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  },

  getToken() {
    return localStorage.getItem('token')
  },

  clearToken() {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  },

  async getProfile() {
    try {
      const response = await api.get('/user/profile')
      return response.data
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      throw error
    }
  }
}