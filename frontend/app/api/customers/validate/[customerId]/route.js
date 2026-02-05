import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { error: "Backend URL not configured." },
      { status: 500 },
    );
  }

  const { customerId } = await params;
  if (!customerId) {
    return NextResponse.json({ error: "Missing customerId." }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${backendUrl}/api/customers/validate/${customerId}`,
      {
        method: "POST",
        cache: "no-store",
      },
    );

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
