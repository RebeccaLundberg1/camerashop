"use client";

import { useEffect, useState } from "react";
import { getOrCreateCartId, addToCartApi } from "@/lib/cartService";

export default function ProductCard({ product }) {
    const safeName = product.id;
    const initialSrc = safeName
        ? `/product-images/${encodeURIComponent(product.category)}/${encodeURIComponent(safeName)}.jpg`
        : '/product-images/camera.jpg';

    const [imgSrc, setImgSrc] = useState(initialSrc);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        setImgSrc(initialSrc);
    }, [initialSrc]);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 2000);
        return () => clearTimeout(t);
    }, [toast]);

    async function handleAdd() {
        if (loading) return;
        setLoading(true);

        const item = {
            productId: product.id,
            quantity: Number(qty) || 1,
        };

        try {
            const cartId = getOrCreateCartId();
            if (!cartId) throw new Error("Could not create cart id");

            setToast("Lagt i kundkorgen");

            await addToCartApi({ cartId, productId: item.productId, quantity: item.quantity });

            const prev = Number(localStorage.getItem("cart_count") || "0");
            localStorage.setItem("cart_count", String(prev + item.quantity));
        } catch (err) {
            console.error("Add to cart error", err);
            setToast("Kunde inte lägga till");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="product-card">
            <a href={`/product/${product.id}`} className="product-link">
                <img src={imgSrc} alt={product.name}/>
                <h3>{product.name}</h3>
            </a>

            <div className="actions">
                <input type="number" min="1" value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}/>
                <button onClick={handleAdd}>Köp</button>
            </div>

            {toast && <div className="mt-2 text-sm text-green-700">{toast}</div>}
        </div>
    );
};