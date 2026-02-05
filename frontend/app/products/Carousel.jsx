"use client"

import {useEffect, useState} from "react";
import Image from "next/image";

export default function Carousel({ productId, category }) {

    const [num, setNum] = useState(1);
    const initialSrc =
        productId && category
            ? `/product-images/${encodeURIComponent(category)}/${encodeURIComponent(productId)}/${num}.jpg`
            : "/product-images/camera.jpg";

    const [imgSrc, setImgSrc] = useState(initialSrc);

    useEffect(() => {
        setImgSrc(initialSrc);
    }, [initialSrc]);

    async function handleClickFwd() {
        setNum((prev) => (prev % 3) + 1);
        setImgSrc(`/product-images/${encodeURIComponent(category)}/${encodeURIComponent(productId)}/${num}.jpg`)
    }

    async function handleClickBack() {
        setNum((prev) => (prev === 1 ? 3 : prev - 1));
        setImgSrc(`/product-images/${encodeURIComponent(category)}/${encodeURIComponent(productId)}/${num}.jpg`)
    }

    if(!productId || !category) {
        return (
            <div className="relative w-full aspect-7/5">
                <Image
                    src={imgSrc}
                    alt={"Product"}
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>
        )
    }

    return (
        <div className="flex justify-between gap-2">
            <button
                onClick={handleClickBack}
                className={`px-3 py-1 rounded text-gray-800 bg-white hover:text-gray-400`}
            >
                🡸
            </button>
            <div className="relative w-full aspect-7/5">
                <Image
                    src={imgSrc}
                    alt={"Product"}
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>
            <button
                onClick={handleClickFwd}
                className={`px-3 py-1 rounded text-gray-800 bg-white hover:text-gray-400`}
            >
                🡺
            </button>
        </div>

    );
}