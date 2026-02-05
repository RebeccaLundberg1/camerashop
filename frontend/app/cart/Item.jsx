"use client";

import Image from "next/image";
import {useEffect, useState} from "react";

export default function CartItem({ item }) {
    const safeName = item.productId;

    const initialSrc = safeName
        ? `/product-images/${encodeURIComponent(item.category)}/${encodeURIComponent(safeName)}/1.jpg`
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
                    {Number(item.totalPrice).toLocaleString('sv-SE')} SEK
                </p>
            </div>
            <div className="flex flex-col justify-center gap-1 w-50">
                <p className="text-xl font-normal">
                    {item.quantity} ST
                </p>
            </div>
        </div>
    )
}