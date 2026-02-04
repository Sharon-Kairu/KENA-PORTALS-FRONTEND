'use client'

import { useState,useMemo } from 'react'
import { useRouter } from 'next/navigation'
import apiService from '../services/apiService'
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react'

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.trim().length > 0 && !loading
  }, [email, password, loading])


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
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-xs">
              Secure Portal Access
            </div>

            <h1 className="text-3xl font-bold text-white mt-3">
              KENA DRIVING SCHOOL <br/> AND <br/> COMPUTER COLLEGE
            </h1>
            <p className="text-white/60 mt-1">
              Sign in to continue to your dashboard.
            </p>
          </div>

          {/* Error message */}
          {errorMsg && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {errorMsg}
            </div>
          )}

          <div className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm text-white/70">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@gmail.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/30 transition"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm text-white/70">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/30 transition"
                  autoComplete="current-password"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') submitLogin()
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-white/60" />
                  ) : (
                    <Eye className="h-5 w-5 text-white/60" />
                  )}
                </button>
              </div>
            </div>

            {/* Links row */}
            <div className="flex items-center justify-between pt-1">
            

              <button
                type="button"
                className="text-sm text-blue-300 hover:text-blue-200 transition"
                onClick={() => alert('Add your forgot password flow here')}
              >
                Forgot password?
              </button>
            </div>

            {/* Button */}
            <button
              onClick={submitLogin}
              disabled={!canSubmit}
              className="w-full mt-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Logging in…
                </>
              ) : (
                'Login'
              )}
            </button>

            {/* Footer note */}
            <p className="text-xs text-white/40 text-center pt-3">
              This system is protected. Unauthorized access is not permitted.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}