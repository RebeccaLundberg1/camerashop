"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductCard({ product }) {
  const safeName = product.id;

  const initialSrc = safeName
    ? `/product-images/${encodeURIComponent(product.category)}/${encodeURIComponent(safeName)}.jpg`
    : "/product-images/camera.jpg";

  const [imgSrc, setImgSrc] = useState(initialSrc);

  useEffect(() => {
    setImgSrc(initialSrc);
  }, [initialSrc]);

  return (
    <div className="w-full rounded overflow-hidden shadow-lg bg-white">
      {/* Image container */}
      <div className="relative h-48 w-full">
        <a href={`/${product.id}`}>
        <Image
          src={imgSrc}
          alt={safeName ?? 'Product'}
          fill
          className="object-cover"
          unoptimized
          onError={() => {
            setImgSrc("/product-images/camera.jpg");
          }}
        /></a>
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {product.brand}
        </div>

        <p className="text-gray-700 text-base">
           {product.category}
        </p>
      </div>
    </div>
  );
}
