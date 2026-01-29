import { NextResponse } from "next/server";

export async function POST(request) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { error: "Backend URL not configured." },
      { status: 500 }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  try {
    const response = await fetch(`${backendUrl}/api/cart/add`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Backend request failed.", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to reach backend." },
      { status: 502 }
    );
  }
}
