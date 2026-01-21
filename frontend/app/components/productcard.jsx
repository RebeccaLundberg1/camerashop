"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useCart from "../hooks/useCart";

export default function ProductCard({ product }) {
    const safeName = product.id;
    const initialSrc = safeName
        ? `/product-images/${encodeURIComponent(product.category)}/${encodeURIComponent(safeName)}.jpg`
        : "/product-images/camera.jpg";

    const [imgSrc, setImgSrc] = useState(initialSrc);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const { addToCart } = useCart();

    useEffect(() => {
        setImgSrc(initialSrc);
    }, [initialSrc]);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 2000);
        return () => clearTimeout(t);
    }, [toast]);

    function handleAdd() {
        if (loading) return;
        setLoading(true);

        const item = {
            id: product.id,
            brand: product.brand,
            model: product.model,
            price: product.price,
            imageId: product.image_id ?? product.imageId,
        };

        try {
            addToCart(item, 1); // optimistic
            setToast("Lagt i kundkorgen");
        } catch (err) {
            console.error("Add to cart error", err);
            setToast("Kunde inte lägga till");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full rounded overflow-hidden shadow-lg bg-white">
            <div className="relative h-48 w-full">
                <a href={`/${product.id}`}>
                    <Image
                        src={imgSrc}
                        alt={safeName ?? "Product"}
                        fill
                        className="object-cover"
                        unoptimized
                        onError={() => setImgSrc("/product-images/camera.jpg")}
                    />
                </a>
            </div>

            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.brand}</div>
                <p className="text-gray-700 text-base">{product.category}</p>

                <div className="mt-4 flex items-center justify-between">
                    <div className="text-lg font-semibold">{product.price ? `${product.price} kr` : ""}</div>
                    <button
                        onClick={handleAdd}
                        disabled={loading}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Lägger till..." : "Köp"}
                    </button>
                </div>

                {toast && (
                    <div className="mt-2 text-sm text-green-700">
                        {toast}
                    </div>
                )}
            </div>
        </div>
    );
}
