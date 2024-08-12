import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";
import { Role } from "@prisma/client";

const protectedRoutes = ["/dashboard", "/apply", "/scout"];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  const isScoutRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith("/scout")
  );

  const isScout = session?.user.role === Role.Scout || session?.user.role === Role.ScoutLeader

  if (!session && isProtected) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl));
  } else {
    if(isScoutRoute && !isScout) {
      return NextResponse.redirect(new URL("/apply", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
