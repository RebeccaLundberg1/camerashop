"use client";

import {useState} from "react";

export default function OrderItem({ item }) {
    const [isExpanded, setIsExpanded] = useState(false)

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
                    </div>
                )}
            </div>
        </div>
    )
}

[{"orderId":9,
    "customerId":38,
    "orderDate":"2026-02-04T08:55:25.912891",
    "status":"CREATED",
    "items":[{
        "productId":100102,
        "brand":"Nikon",
        "model":"Z8",
        "category":"Camera",
        "quantity":1,
        "unitPrice":48990.00,
        "lineTotal":48990.00}],
    "totalPrice":48990.00}]