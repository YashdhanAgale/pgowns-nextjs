import { NextResponse } from "next/server";

const MERN_APP_URL =
  process.env.NEXT_PUBLIC_MERN_APP_URL || "http://localhost:5173";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (token) {
    return NextResponse.redirect(MERN_APP_URL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/explore", "/pg/:path*", "/pg-in/:path*"],
};
