"use client"

import {useState} from "react";

export default function OrderDeleteButton({orderId, onSuccess, onError}) {
    const [adding, setAdding] = useState(false);

    async function handleClick() {
        if (!orderId) return;
        setAdding(true);

        try {
            const response = await fetch(`/api/account/orders/${orderId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                console.log("Fel")
                throw new Error(`Products API failed: ${response.status}`);
            } else {
                console.log("ordern avbruten")
                onSuccess();
            }
        } catch (e) {
            console.error(e);
            if (onError) {
                onError(e);
            } else {
                alert("Kunde inte avbryta ordern");
            }
        } finally {
            setAdding(false);
        }
    }

    return (
        <button
            onClick={handleClick}
            disabled={adding || !orderId}
            className="m-4 px-3 py-1 w-auto rounded text-white bg-blue-500 hover:bg-red-300"
        >
            {adding ? "Avbryter order..." : "Avbryt order"}
        </button>
    )
}
