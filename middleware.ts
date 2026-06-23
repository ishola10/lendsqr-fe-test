import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/users"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
    const isAuthenticated = request.cookies.get("lendsqr_auth")?.value === "1";

    if (isProtectedRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/" && isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard/:path*", "/users/:path*"],
};
