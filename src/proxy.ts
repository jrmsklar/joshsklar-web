import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/kindred-deck.html") {
    const authed = request.cookies.get("kindred-auth")?.value === "yes";
    if (!authed) {
      return NextResponse.redirect(new URL("/kindred", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/kindred-deck.html"],
};
