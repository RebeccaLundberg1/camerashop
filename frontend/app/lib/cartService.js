export function getOrCreateCartId() {
    if (typeof window === "undefined") return null;
    let id = localStorage.getItem("cart_id");
    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("cart_id", id);
    }
    return id;
}

export async function addToCartApi({ cartId, productId, quantity = 1 }) {
    const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId, productId, quantity }),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "API error");
    }
    return res.json();
}
