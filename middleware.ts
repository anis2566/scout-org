import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

const protectedRoutes = ["/dashboard", "/apply"];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!session && isProtected) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
