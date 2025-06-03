import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip middleware for login page to prevent redirect loops
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check if the request is for the admin page
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Get the session token from cookies
    const sessionToken = request.cookies.get('admin_session')?.value;

    // If no session token exists, redirect to login
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // In development, allow access if session token exists
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.next();
    }

    // In production, you might want to add additional validation here
    try {
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 