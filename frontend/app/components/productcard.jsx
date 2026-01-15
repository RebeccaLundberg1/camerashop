"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ product }) {
  const initialSrc = `/product-images/${encodeURIComponent(product.name)}.jpg`;

  const [imgSrc, setImgSrc] = useState(initialSrc);

  return (
    <div className="max-w-sm m-8 rounded overflow-hidden shadow-lg bg-white">
      {/* Image container */}
      <div className="relative h-48 w-full">
        <Image
          src={imgSrc}
          alt="alternative text"
          fill
          className="object-cover"
          onError={() => {
            setImgSrc("public/product-images/car.jpg");
          }}
        />
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {product.name}
        </div>

        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet.
        </p>
      </div>
    </div>
  );
}
