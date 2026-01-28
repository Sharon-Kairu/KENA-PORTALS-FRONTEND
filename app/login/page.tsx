'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import apiService from '../services/apiService'

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submitLogin = async () => {
    try {
      setLoading(true)

      const response = await apiService.postWithoutToken(
        '/auth/login/',
        { email, password }
      )

      const role = response.user.role
      console.log('Login successful, user role:', role)

      if (role === 'student') router.push('/student/dashboard')
      else if (role === 'instructor') router.push('/instructor/dashboard')
      else router.push('/admin/dashboard')

    } catch (error) {
      console.error('Login failed:', error)
      
      alert('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border">
        <h1 className="text-3xl font-bold text-center mb-2">Login</h1>

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg"
          />
          <button
            onClick={submitLogin}
            disabled={loading}
            className="w-full py-3 bg-gray-900 text-white rounded-lg"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  )
}