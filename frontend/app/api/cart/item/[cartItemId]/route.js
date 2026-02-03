import {NextResponse} from "next/server";

export async function DELETE(request, { params } = {}) {
    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
        return NextResponse.json(
            { error: "Backend URL not configured." },
            { status: 500 }
        );
    }
    const resolvedParams = await params;
    const cartItemId = resolvedParams.cartItemId;

    if (!cartItemId) {
        return NextResponse.json(
            { error: "Missing cartItemId." },
            { status: 400 }
        );
    }

    try {
        const response = await fetch(
            `${backendUrl}/api/cart/${cartItemId}`,
            {
                method: "DELETE",
                cache: "no-store",
            }
        );

        let data = null;
        if (response.status !== 204) {
            const contentType = response.headers.get("content-type") || "";
            data = contentType.includes("application/json")
                ? await response.json()
                : await response.text();
        }

        if (!response.ok) {
            return NextResponse.json(
                { error: "Backend request failed.", details: data },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to reach backend." },
            { status: 502 }
        );
    }
}
