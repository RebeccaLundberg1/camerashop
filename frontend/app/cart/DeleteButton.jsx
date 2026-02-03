"use client"

import {useState} from "react";

export default function DeleteButton({cartItemId, onSuccess, onError}) {
    const [adding, setAdding] = useState(false);

    async function handleClick() {
        if (!cartItemId) return;
        setAdding(true);

        try {
            const response = await fetch(`/api/cart/item/${cartItemId}`, {
                method: "DELETE",
                cache: "no-store",
            });
            if (!response.ok) {
                console.log("Fel")
                throw new Error(`Products API failed: ${response.status}`);
            } else {
                console.log("produkt borttagen")
                onSuccess();
            }
        } catch (e) {
            console.error(e);
            if (onError) {
                onError(e);
            } else {
                alert("Kunde inte ta bort produkt");
            }
        } finally {
            setAdding(false);
        }
    }

    return (
        <button
            onClick={handleClick}
            disabled={adding || !cartItemId}
            className={`ml-4 px-3 py-1 rounded text-3xl text-white ${adding ? "bg-gray-400" : "bg-white hover:bg-red-400"}`}
        >
            🗑️
        </button>
    )
}
