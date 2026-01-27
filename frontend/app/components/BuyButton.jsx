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
      // TODO: Call backend POST /cart with { productId, quantity, customerId }
      // Example payload: { productId, quantity, customerId }
      if (onSuccess) onSuccess();
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
