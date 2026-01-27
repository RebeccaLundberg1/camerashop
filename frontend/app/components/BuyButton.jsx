"use client";

import React, { useState } from "react";
import useCart from "@/hooks/useCart";

export default function BuyButton({ productId, label = "Köp" }) {
    const { addItem, loading } = useCart();
    const [adding, setAdding] = useState(false);

    async function handleClick() {
        setAdding(true);
        try {
            await addItem(productId, 1);
            // visa toast/snackbar här om du vill
        } catch (e) {
            console.error(e);
            alert("Kunde inte lägga till i kundvagnen");
        } finally {
            setAdding(false);
        }
    }


    return (
        <button onClick={handleClick} disabled={adding || loading} className={`ml-4 px-3 py-1 rounded text-white ${adding ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}>
            {adding ? "Lägger till..." : label}
        </button>
    );
}
