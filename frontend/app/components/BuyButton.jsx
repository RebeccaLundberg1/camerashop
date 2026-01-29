"use client";

import React, { useState } from "react";

export default function BuyButton({
  productId,
  quantity = 1,
  customerId,
  label = "Köp",
  onSuccess,
  onError,
}) {
  const [adding, setAdding] = useState(false);

  async function handleClick() {
    if (!productId) return;
    setAdding(true);
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: customerId,
          productId: productId,
          quantity: quantity,
        }),
      });
      if (response.ok) {
        if (onSuccess) onSuccess();
      }
    } catch (e) {
      console.error(e);
      if (onError) onError(e);
      else alert("Kunde inte lägga till i kundvagnen");
    } finally {
      setAdding(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={adding || !productId}
      className={`ml-4 px-3 py-1 rounded text-white ${adding ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
    >
      {adding ? "Lägger till..." : label}
    </button>
  );
}
