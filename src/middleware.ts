/**
 * Next.js Middleware
 * Handles route protection and authentication
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { JwtService } from './infrastructure/auth/JwtService';

const jwtService = new JwtService();

// Routes that don't require authentication
const publicRoutes = ['/login'];

// Routes that should redirect to home if authenticated
const authRoutes = ['/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies
  const token = request.cookies.get('pokemon_auth_token')?.value;

  // Check if route is public
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Verify token if present
  let isValidToken = false;
  if (token) {
    const payload = await jwtService.verifyToken(token);
    isValidToken = payload !== null;
  }

  // Redirect to login if trying to access protected route without valid token
  if (!isPublicRoute && !isValidToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to home if trying to access auth route with valid token
  if (isAuthRoute && isValidToken) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|$).*)',
  ],
};
