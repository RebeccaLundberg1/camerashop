import { NextResponse } from "next/server";

export async function DELETE(request, { params } = {}) {
    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
        return NextResponse.json(
            { error: "Backend URL not configured." },
            { status: 500 }
        );
    }
    const resolvedParams = await params;
    const orderId = resolvedParams?.orderId;

    if (!orderId) {
        return NextResponse.json(
            { error: "Missing orderId." },
            { status: 400 }
        );
    }

    try {
        const response = await fetch(
            `${backendUrl}/api/orders/${orderId}`,
            {
                method: "DELETE",
                cache: "no-store",
            }
        );

        let details = null;
        if (!response.ok) {
            const contentType = response.headers.get("content-type") || "";
            details = contentType.includes("application/json")
                ? await response.json()
                : await response.text();
        }

        if (!response.ok) {
            return NextResponse.json(
                { error: "Backend request failed.", details },
                { status: response.status }
            );
        }

        // Backend returnerar 204 No Content
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to reach backend." },
            { status: 502 }
        );
    }
}
