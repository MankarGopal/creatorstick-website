import { NextResponse } from 'next/server';

/**
 * Proxy (middleware) — redirects every route except the homepage to '/'
 * during the development/coming-soon phase.
 *
 * Remove or disable this file when the full site is ready to go live.
 */
export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Allow the root and Next.js internals / static assets to pass through
  const isAllowed =
    pathname === '/' ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.match(/\.(ico|svg|png|jpg|jpeg|webp|gif|woff2?|ttf|otf|css|js|map)$/);

  if (!isAllowed) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except Next.js internals (already handled above, but belt-and-suspenders)
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
