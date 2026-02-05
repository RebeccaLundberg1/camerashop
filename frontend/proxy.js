import { NextResponse } from "next/server";

const CUSTOMER_COOKIE = "customerId";

function isDocumentNavigation(request) {
  if (request.method !== "GET") {
    return false;
  }

  const accept = request.headers.get("accept") ?? "";
  if (!accept.includes("text/html")) {
    return false;
  }

  if (request.headers.get("purpose") === "prefetch") {
    return false;
  }

  if (request.headers.get("x-middleware-prefetch") === "1") {
    return false;
  }

  const secFetchMode = request.headers.get("sec-fetch-mode");
  if (secFetchMode && secFetchMode !== "navigate") {
    return false;
  }

  return true;
}

export default async function proxy(request) {
  const existingCookie = request.cookies.get(CUSTOMER_COOKIE);
  if (existingCookie) {
    console.log(
      `[customerId] Reusing existing cookie: ${existingCookie.value}`,
    );
    return NextResponse.next();
  }

  if (!isDocumentNavigation(request)) {
    return NextResponse.next();
  }

  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return NextResponse.next();
  }

  try {
    const response = await fetch(`${request.nextUrl.origin}/api/customers`, {
      method: "POST",
      cache: "no-store",
    });
    if (!response.ok) {
      return NextResponse.next();
    }

    const data = await response.json();
    if (data?.customerId == null) {
      return NextResponse.next();
    }

    const nextResponse = NextResponse.next();
    console.log(`[customerId] Generated new customerId: ${data.customerId}`);
    nextResponse.cookies.set(CUSTOMER_COOKIE, String(data.customerId), {
      path: "/",
      sameSite: "lax",
    });
    return nextResponse;
  } catch (error) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
