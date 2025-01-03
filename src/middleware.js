import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  let token = req.cookies.JWT;
  if (!token) {
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const tokenRegex = /JWT=([^;]+)/;
      const match = cookieHeader.match(tokenRegex);
      if (match) {
        token = match[1];
      }
    }
  }

  if (pathname === "/" || pathname === "/create-account") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if (pathname === "/dashboard") {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// paths to protect
export const config = {
  matcher: ["/dashboard", "/", "/create-account"],
};
