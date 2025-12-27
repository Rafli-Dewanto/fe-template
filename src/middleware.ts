import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected, /api/admin)
  const path = request.nextUrl.pathname;
  // Define paths that are considered public
  const isPublicPath = path === "/login" || path === "/register";
  // Get the token from the cookies
  const token = request.cookies.get("auth-token")?.value;
  // Redirect unauthenticated users to login page if trying to access protected routes
  if (!token && !isPublicPath) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  }
  // Redirect authenticated users away from auth pages
  if (token && isPublicPath) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  }
  // Add security headers
  const response = NextResponse.next();
  response.headers.set("x-frame-options", "DENY");
  response.headers.set("x-content-type-options", "nosniff");
  response.headers.set("x-xss-protection", "1; mode=block");
  response.headers.set("strict-transport-security", "max-age=31536000; includeSubDomains");
  response.headers.set(
    "content-security-policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );
  response.headers.set("referrer-policy", "strict-origin-when-cross-origin");
  response.headers.set("permissions-policy", "camera=(), microphone=(), geolocation=()");
  return response;
}

// Configure the paths that should be handled by this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
