"use client";

import {useEffect, useState} from "react";
import OrderDeleteButton from "@/app/account/[customerId]/DeleteButton";
import {useRouter} from "next/navigation";

export default function OrderItem({ item }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [toast, setToast] = useState(false)
    const router = useRouter();

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 2000);
        return () => clearTimeout(t);
    }, [toast]);

    return (
        <div
            className={`p-2 flex bg-white shadow rounded w-full gap-4 cursor-pointer transition-all duration-300 ${
                isExpanded ? "shadow-lg" : "hover:shadow-md"
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex flex-col p-6 w-full">
                <div className="flex justify-between mb-4">
                    <h1 className="font-bold">Ordernummer: {item.orderId}</h1>
                    <p className="font-bold"> Totalt pris: {Number(item.totalPrice).toLocaleString('sv-SE')} SEK</p>
                </div>
                <div className="flex justify-between">
                    <p>{new Date(item.orderDate).toLocaleDateString('sv-SE')}</p>
                    <p>{item.status}</p>
                </div>

                {isExpanded && (
                    <div className="mt-2 pl-4 text-gray-700">
                        <hr className="border-t-3 border-gray-500 my-4" />
                        <div className="grid grid-cols-[60px_2fr_1fr_120px_120px] mb-4 text-gray-700">
                            <p className="text-center font-bold">Antal</p>
                            <p className="font-bold">Produkt</p>
                            <p className="font-bold">Kategori</p>
                            <p className="text-right font-bold">Styckpris</p>
                            <p className="text-right font-bold">Totalpris</p>
                        </div>
                        {item.items.map((product) => (
                            <div key={product.productId}>
                                <div className="grid grid-cols-[60px_2fr_1fr_120px_120px] text-gray-700 items-center">
                                    <p className="text-center">{product.quantity}</p>
                                    <p>{product.brand} {product.model}</p>
                                    <p className="italic">({product.category})</p>
                                    <p className="text-right">{Number(product.unitPrice).toLocaleString('sv-SE')} SEK</p>
                                    <p className="text-right font-bold">{Number(product.lineTotal).toLocaleString('sv-SE')} SEK</p>
                                </div>
                                <hr className="border-t border-gray-300 my-1" />
                            </div>
                        ))}
                        {item.status === "CREATED" && (
                            <div className="flex flex-col items-end"
                                 onClick={(e) => e.stopPropagation()}>
                                <OrderDeleteButton
                                    orderId = {item.orderId}
                                    onSuccess={() => {
                                        setToast("Ordern är avbruten");
                                        setTimeout(() => {
                                            router.refresh();
                                        }, 1200);
                                    }}
                                    onError={() => setToast("Kunde inte avbryta ordern")}/>
                                {toast && <div className="mr-4 text-sm text-green-700 text-center">{toast}</div>}
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    )
}
