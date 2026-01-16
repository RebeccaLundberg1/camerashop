"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductCard({ product }) {
  const safeName = product.name;

  const initialSrc = safeName
    ? `/product-images/${encodeURIComponent(safeName)}.jpg`
    : "/product-images/camera.jpg";

  const [imgSrc, setImgSrc] = useState(initialSrc);

  useEffect(() => {
    setImgSrc(initialSrc);
  }, [initialSrc]);

  return (
    <div className="max-w-sm m-8 rounded overflow-hidden shadow-lg bg-white">
      {/* Image container */}
      <div className="relative h-48 w-full">
        <Image
          src={imgSrc}
          alt={safeName ?? 'Product'}
          fill
          className="object-cover"
          onError={() => {
            setImgSrc("/product-images/camera.jpg");
          }}
        />
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {product.name}
        </div>

        <p className="text-gray-700 text-base">
          Good day
        </p>
      </div>
    </div>
  );
}
