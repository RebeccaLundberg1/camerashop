import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const backendUrl = process.env.BACKEND_API_URL;
    if (!backendUrl) {
        return NextResponse.json(
            { error: "Backend URL not configured." },
            { status: 500 },
        );
    }
    const pathname = request?.nextUrl?.pathname ?? new URL(request.url).pathname;
    const segments = pathname.split("/").filter(Boolean);
    const productIndex = segments.lastIndexOf("products");
    const productIdFromPath =
        productIndex >= 0 ? segments[productIndex + 1] : undefined;
    const productId = params?.productId ?? productIdFromPath;
    if (!productId) {
        return NextResponse.json({ error: "Missing productId." }, { status: 400 });
    }

    try {
        const response = await fetch(`${backendUrl}/api/products/${productId}`, {
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