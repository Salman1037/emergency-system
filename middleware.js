import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_PATHS = ["/admin"];
const USER_PATHS = ["/complaints", "/sos"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  if (!token && (ADMIN_PATHS.includes(pathname) || USER_PATHS.includes(pathname))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      // Restrict admin pages
      if (ADMIN_PATHS.includes(pathname) && payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      // Restrict user pages to normal users only
      if (USER_PATHS.includes(pathname) && payload.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/complaints", "/sos"]
};
