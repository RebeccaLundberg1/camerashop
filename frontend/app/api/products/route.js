import { NextResponse } from "next/server";

export async function GET(request) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { error: "Backend URL not configured." },
      { status: 500 },
    );
  }

  try {
    const { search } = new URL(request.url);
    const response = await fetch(`${backendUrl}/api/products${search}`, {
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
