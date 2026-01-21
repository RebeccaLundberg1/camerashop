"use client";

import Image from "next/image";
import {useEffect, useState} from "react";

export default function CartItem({ item }) {
    const safeName = item.id;

    const initialSrc = safeName
        ? `/product-images/${encodeURIComponent(item.category)}/${encodeURIComponent(safeName)}.jpg`
        : "/product-images/camera.jpg";

    const [imgSrc, setImgSrc] = useState(initialSrc);

    useEffect(() => {
        setImgSrc(initialSrc);
    }, [initialSrc]);

    return (
        <div className="p-2 flex bg-white shadow rounded w-full gap-4">
            <div className="relative h-30 w-30">
                <Image
                    src={imgSrc}
                    alt={safeName ?? 'Product'}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={() => {
                        setImgSrc("/product-images/camera.jpg");
                    }}
                />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-1">
                <h2 className="text-xl font-bold ">
                    {item.brand} {item.model}
                </h2>
                <p className="text-xl font-normal">
                    {item.price} SEK
                </p>
            </div>
        </div>
    )
}