import { NextRequest, NextResponse } from "next/server";

/**
 * Gates /keystatic and its API routes behind HTTP Basic Auth. Without this,
 * the admin UI and the underlying content API have no auth of their own —
 * anyone with the URL could load the CMS and read draft posts (drafts are
 * only filtered out of the *public* site's data layer, not the CMS itself).
 *
 * Only enforced when KEYSTATIC_ADMIN_PASSWORD is set, so local dev (no env
 * file) stays password-free, matching how storage mode itself is gated in
 * keystatic.config.ts.
 */
export function middleware(request: NextRequest) {
  const password = process.env.KEYSTATIC_ADMIN_PASSWORD;
  if (!password) return NextResponse.next();

  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      const [, suppliedPassword] = atob(auth.slice(6)).split(":");
      if (suppliedPassword === password) return NextResponse.next();
    } catch {
      // fall through to 401
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Keystatic"' },
  });
}

export const config = {
  matcher: ["/keystatic/:path*", "/api/keystatic/:path*"],
};
