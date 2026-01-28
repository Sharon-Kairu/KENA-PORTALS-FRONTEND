import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value
  const userRole = request.cookies.get('user_role')?.value
  const { pathname } = request.nextUrl

  // 1. Redirect to login if no token exists
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 2. Role-Based Access Control (RBAC) logic
  // Check if the user is trying to access a path they don't have the role for
  if (pathname.startsWith('/admin') && userRole !== 'admin' && userRole !== 'superadmin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  if (pathname.startsWith('/instructor') && userRole !== 'instructor') {
    // Admins can often see instructor pages, if not, keep strict: userRole !== 'instructor'
    if (userRole !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  if (pathname.startsWith('/student') && userRole !== 'student') {
    if (userRole !== 'admin' && userRole !== 'instructor') {
       return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/student/:path*',
    '/instructor/:path*',
    '/admin/:path*',
  ],
}