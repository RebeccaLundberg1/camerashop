"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import DeleteButton from "@/app/cart/DeleteButton";
import { useRouter } from "next/navigation";
import { getCookie } from "../utils/cookies";

export default function CartItem({ item }) {
    const safeName = item.productId;
    const CUSTOMER_COOKIE = "customerId";
    const customerId = getCookie(CUSTOMER_COOKIE);

    const initialSrc = safeName
        ? `/product-images/${encodeURIComponent(item.category)}/${encodeURIComponent(safeName)}/1.jpg`
        : "/product-images/camera.jpg";

    const router = useRouter();
    const [imgSrc, setImgSrc] = useState(initialSrc);
    const [toast, setToast] = useState(false)

    useEffect(() => {
        setImgSrc(initialSrc);
    }, [initialSrc]);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 2000);
        return () => clearTimeout(t);
    }, [toast]);

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
                    {item.totalPrice} SEK
                </p>
            </div>
            <div className="flex justify-center items-center gap-2 w-70">
                <p className="text-xl font-normal">
                    {item.quantity} ST
                </p>
                <div className="flex flex-col w-40">
                    <DeleteButton
                        cartItemId = {item.cartItemId}
                        onSuccess={() => { router.push(`/cart/${customerId}`);}}
                        onError={() => setToast("Kunde inte ta bort produkt")}
                    />
                    {toast && <div className="mt-2 text-sm text-green-700 text-center">{toast}</div>}
                </div>
            </div>
        </div>
    )
}