import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const NORATECH_URL = process.env.NEXT_PUBLIC_NORATECH_URL || "https://noratech.com.br";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://falahub.noratech.com.br";

export function proxy(request: NextRequest) {
  const hasSession = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token"));

  if (hasSession) return NextResponse.next();

  const back = `${APP_URL}${request.nextUrl.pathname}${request.nextUrl.search}`;
  const url = new URL(`${NORATECH_URL}/entrar`);
  url.searchParams.set("next", back);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/painel/:path*"],
};
