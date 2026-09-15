import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Must match the cookie name your NestJS API sets on login/signup.
// This is a cheap presence check for redirect UX only — it does not verify
// the token. Real enforcement happens when NestJS validates the cookie on
// each API request, so a forged cookie gets past this gate but not the data.
const SESSION_COOKIE = "recallai_session"

const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/reset-password"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasSession = request.cookies.has(SESSION_COOKIE)
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))

  if (!hasSession && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (hasSession && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}