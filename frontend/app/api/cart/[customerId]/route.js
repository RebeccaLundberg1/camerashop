import { NextResponse } from "next/server";

export async function GET(request, { params } = {}) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { error: "Backend URL not configured." },
      { status: 500 },
    );
  }

  const pathname = request?.nextUrl?.pathname ?? new URL(request.url).pathname;
  const segments = pathname.split("/").filter(Boolean);
  const cartIndex = segments.lastIndexOf("cart");
  const customerIdFromPath =
    cartIndex >= 0 ? segments[cartIndex + 1] : undefined;
  const resolvedParams = await params;
  const customerId = resolvedParams?.customerId ?? customerIdFromPath;
  if (!customerId) {
    return NextResponse.json({ error: "Missing customerId." }, { status: 400 });
  }

  try {
    const response = await fetch(`${backendUrl}/api/cart/${customerId}`, {
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Backend request failed.", details: data },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to reach backend." },
      { status: 502 },
    );
  }
}
