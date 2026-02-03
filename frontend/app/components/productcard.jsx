"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BuyButton from "./BuyButton";

import { getCookie } from "../utils/cookies";
import Link from "next/link";

const CUSTOMER_COOKIE = "customerId";

export default function ProductCard({ product }) {
  const safeName = product.id;
  const initialSrc = safeName
    ? `/product-images/${encodeURIComponent(product.category)}/${encodeURIComponent(safeName)}/1.jpg`
    : "/product-images/camera.jpg";

  const [imgSrc, setImgSrc] = useState(initialSrc);
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

  const customerId = getCookie(CUSTOMER_COOKIE) ?? 1;

  return (
    <div
      className="w-full rounded overflow-hidden shadow-lg bg-white"
      suppressHydrationWarning
    >
      {/* Image container */}
      <div className="relative h-48 w-full">
        <Link href={`/products/${product.id}`}>
          <div className="relative h-full w-full">
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
          </div>
        </Link>
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.brand}</div>
        <p className="text-gray-700 font-normal">{product.model}</p>
        <p className="text-gray-700 text-base">{product.price} SEK</p>
        <div className="actions">
          <input
            type="number"
            min="1"
            className="w-20"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            suppressHydrationWarning
          />
          <BuyButton
            productId={product.id}
            quantity={Number(qty) || 1}
            customerId={customerId}
            onSuccess={() => setToast("Lagt i kundkorgen")}
            onError={() => setToast("Kunde inte lägga till")}
          />
          {toast && <div className="mt-2 text-sm text-green-700">{toast}</div>}
        </div>
      </div>
    </div>
  );
}
