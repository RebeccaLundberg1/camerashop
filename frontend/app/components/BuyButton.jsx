"use client";

import React, { useState } from "react";

export default function BuyButton({ productId, label = "Köp" }) {
  const [adding, setAdding] = useState(false);

  async function handleClick() {
    setAdding(true);
    try {
      // Add code for adding to cart
    } catch (e) {
      console.error(e);
      alert("Kunde inte lägga till i kundvagnen");
    } finally {
      setAdding(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={adding || loading}
      className={`ml-4 px-3 py-1 rounded text-white ${adding ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
    >
      {adding ? "Lägger till..." : label}
    </button>
  );
}
