"use client";
import { useState } from "react";
import BuyButton from "@/app/components/BuyButton";
import {getCookie} from "@/app/utils/cookies";

const CUSTOMER_COOKIE = "customerId";

export default function ProductActions({ productId }) {
    const [qty, setQty] = useState(1);
    const [toast, setToast] = useState("");

    const customerId = getCookie(CUSTOMER_COOKIE) ?? 1;

    return (
        <div className="actions flex flex-col justify-end m-6">
            <div className="flex justify-end">
                <input
                    type="number"
                    min="1"
                    className="w-20"
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                />
                <BuyButton
                    productId={productId}
                    quantity={qty}
                    customerId={customerId}
                    onSuccess={() => setToast("Lagt i kundkorgen")}
                    onError={() => setToast("Kunde inte lägga till")}
                />
            </div>
            {toast && <p className="mt-2 text-right text-green-600">{toast}</p>}
        </div>
    );
}