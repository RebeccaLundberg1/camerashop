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
                        {item.items.map((product) => (
                            <div key={product.productId}>
                                {product.brand} {product.model} ({product.category}) x {product.quantity} – ${product.lineTotal}
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
    "items":[{"productId":100102,"brand":"Nikon","model":"Z8","category":"Camera","quantity":1,"unitPrice":48990.00,"lineTotal":48990.00}],
    "totalPrice":48990.00}]