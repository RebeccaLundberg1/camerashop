"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductCard({ product }) {
  const safeName = product.id;
  const initialSrc = safeName
    ? `/product-images/${encodeURIComponent(product.category)}/${encodeURIComponent(safeName)}.jpg`
    : "/product-images/camera.jpg";

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
      const customerId = 1; // TODO: replace with util function to get customerId cookie
      if (!customerId) throw new Error("Could not get customerId");

      // TODO: Call backend add to cart post endpoint
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
      {/* Image container */}
      <div className="relative h-48 w-full">
        <a href={`/${product.id}`}>
          <Image
            src={imgSrc}
            alt={safeName ?? "Product"}
            fill
            className="object-cover"
            unoptimized
            onError={() => {
              setImgSrc("/product-images/camera.jpg");
            }}
          />
        </a>
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.brand}</div>
        <p className="text-gray-700 font-normal">{product.model}</p>
        <p className="text-gray-700 text-base">{product.price} SEK</p>
        <div className="actions">
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          />
          <button
            onClick={handleAdd}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "8px 16px",
            }}
          >
            Köp
          </button>
          {toast && <div className="mt-2 text-sm text-green-700">{toast}</div>}
        </div>
      </div>
    </div>
  );
}
