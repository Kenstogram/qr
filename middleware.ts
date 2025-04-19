import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  // rewrites for app pages
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    const session = await getToken({ req });
    if (!session && path !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (session && path == "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (path.startsWith("/create/")) {
      const dynamicPart = path.substring("/create/".length);
      return NextResponse.rewrite(new URL(`/app/create/${dynamicPart}`, req.url));
    } else if (path === "/create") {
      return NextResponse.rewrite(new URL(`/app/create`, req.url));
    }
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url)
    );
  }

  // special case for `vercel.pub` domain
  if (hostname === "vercel.pub") {
    return NextResponse.redirect(
      "https://vercel.com/blog/platforms-starter-kit"
    );
  }
  
  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    if (path.startsWith("/start/")) {
      const dynamicPart = path.substring("/start/".length);
      return NextResponse.rewrite(new URL(`/start/${dynamicPart}`, req.url));
    } else if (path === "/start") {
      return NextResponse.rewrite(new URL(`/start`, req.url));
    } else if (path === "/superapp") {
      return NextResponse.rewrite(new URL(`/superapp`, req.url));
    } else if (path === "/admin") {
      return NextResponse.rewrite(new URL(`/admin`, req.url));
    } else if (path.startsWith("/blog/")) {
      const dynamicPart = path.substring("/blog/".length); // Get the dynamic part after `/blog/`
      return NextResponse.rewrite(new URL(`/blog/${dynamicPart}`, req.url)); // Rewrite to the dynamic blog path
    } else if (path === "/blog") {
      return NextResponse.rewrite(new URL(`/blog`, req.url));
    } else if (path === "/company") {
      return NextResponse.rewrite(new URL(`/company`, req.url));
    } else if (path === "/documentation") {
      return NextResponse.rewrite(new URL(`/documentation`, req.url));
    } else if (path === "/events") {
      return NextResponse.rewrite(new URL(`/events`, req.url));
    } else if (path === "/faq") {
      return NextResponse.rewrite(new URL(`/faq`, req.url));
    } else if (path === "/creators") {
      return NextResponse.rewrite(new URL(`/creators`, req.url));
    } else if (path === "/checkout") {
      return NextResponse.rewrite(new URL(`/checkout`, req.url));
    } else if (path === "/enterprise") {
      return NextResponse.rewrite(new URL(`/enterprise`, req.url));
    } else if (path === "/experiences") {
      return NextResponse.rewrite(new URL(`/experiences`, req.url));
    } else if (path === "/healthcare") {
      return NextResponse.rewrite(new URL(`/healthcare`, req.url));
    } else if (path === "/industrial") {
      return NextResponse.rewrite(new URL(`/industrial`, req.url));
    } else if (path === "/influencers") {
      return NextResponse.rewrite(new URL(`/influencers`, req.url));
    } else if (path === "/landing") {
      return NextResponse.rewrite(new URL(`/landing`, req.url));
    } else if (path === "/livestream") {
      return NextResponse.rewrite(new URL(`/livestream`, req.url));
    } else if (path === "/liveshop") {
      return NextResponse.rewrite(new URL(`/liveshop`, req.url));
    } else if (path === "/mosaic") {
      return NextResponse.rewrite(new URL(`/mosaic`, req.url));
    } else if (path === "/nonprofits") {
      return NextResponse.rewrite(new URL(`/nonprofits`, req.url));
    } else if (path === "/policy") {
      return NextResponse.rewrite(new URL(`/policy`, req.url));
    } else if (path === "/platforms") {
      return NextResponse.rewrite(new URL(`/platforms`, req.url));      
    } else if (path === "/pricing") {
      return NextResponse.rewrite(new URL(`/pricing`, req.url));
    } else if (path === "/scan") {
      return NextResponse.rewrite(new URL(`/scan`, req.url));
    } else if (path === "/subscriber") {
      return NextResponse.rewrite(new URL(`/subscriber`, req.url));
    } else if (path === "/support") {
      return NextResponse.rewrite(new URL(`/support`, req.url));
    } else if (path === "/sweatpants") {
      return NextResponse.rewrite(new URL(`/sweatpants`, req.url));
    } else if (path === "/tokens") {
      return NextResponse.rewrite(new URL(`/tokens`, req.url));
    } else if (path === "/training") {
      return NextResponse.rewrite(new URL(`/training`, req.url));
    } else if (path === "/travel") {
      return NextResponse.rewrite(new URL(`/travel`, req.url));
    } else if (path === "/transportation") {
      return NextResponse.rewrite(new URL(`/transportation`, req.url));
    } else if (path === "/restaurants") {
      return NextResponse.rewrite(new URL(`/restaurants`, req.url));
    } else if (path === "/realestate") {
      return NextResponse.rewrite(new URL(`/realestate`, req.url));
    } else if (path === "/smb") {
      return NextResponse.rewrite(new URL(`/smb`, req.url));      
    } else if (path === "/waitlist") {
      return NextResponse.rewrite(new URL(`/waitlist`, req.url));
    } else {
      return NextResponse.rewrite(new URL(`/home${path}`, req.url));
    }
  }
  // rewrite everything else to `/[domain]/[path] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
