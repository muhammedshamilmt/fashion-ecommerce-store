import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip middleware for login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check for admin session in cookies
    const adminSession = request.cookies.get('adminSession')
    
    if (!adminSession || adminSession.value !== 'true') {
      // Redirect to login if no valid session
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // If user is on login page and has valid session, redirect to admin
  if (request.nextUrl.pathname === '/login') {
    const adminSession = request.cookies.get('adminSession')
    if (adminSession && adminSession.value === 'true') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login']
} 