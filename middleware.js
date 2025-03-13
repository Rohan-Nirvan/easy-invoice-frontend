import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token"); // Get token from cookies

  // ✅ If token is missing, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ If authenticated, continue the request
  return NextResponse.next();
}

// ✅ Apply middleware only to protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/buyer-companies/:path*"], // Add protected routes
};
