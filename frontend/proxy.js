import { NextResponse } from "next/server";

const CUSTOMER_COOKIE = "customerId";

export default async function proxy(request) {
  if (request.cookies.get(CUSTOMER_COOKIE)) {
    return NextResponse.next();
  }

  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return NextResponse.next();
  }

  try {
    const response = await fetch(`${backendUrl}/customers`, { method: "POST" });
    if (!response.ok) {
      return NextResponse.next();
    }

    const data = await response.json();
    if (data?.customerId == null) {
      return NextResponse.next();
    }

    const nextResponse = NextResponse.next();
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
