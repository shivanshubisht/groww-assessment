import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const url = new URL(request.url);
  // const referer = request.headers.get("referer");
  // console.log(referer);
  // if (
  //   (url.pathname === "/payment" || url.pathname === "/success") &&
  //   (!referer || !referer.includes("groww.shivanshu.in"))
  // ) {
  //   return NextResponse.redirect("/checkout");
  // }
  return NextResponse.redirect(new URL("/checkout", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|checkout|failed|payment|success|test).*)",
  ],
};
