"use client";

import { useState } from "react";

export default function OrderButton({ customerId, className }) {
  const [adding, setAdding] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [showModal, setShowModal] = useState(false);

  async function handleClick() {
    if (!customerId) return;
    setAdding(true);

    try {
      const response = await fetch(`/api/customers/${customerId}/orders`, {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId }),
      });
      if (!response.ok) {
        throw new Error(`Products API failed: ${response.status}`);
      }
      const data = await response.json();
      setOrderNumber(data.orderId);
      setShowModal(true);
    } catch (e) {
      console.error(e);
      alert("Kunde inte skapa order");
    } finally {
      setAdding(false);
    }
  }
  return (
    <>
      <button
        onClick={handleClick}
        className={`py-2 px-8 bg-blue-500 text-white rounded shadow-lg ${className}`}
        disabled={adding}
      >
        {adding ? "Skapar order..." : "Lägg order"}
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Order skapad!</h2>
            <p className="mb-4">
              Vi tackar för din order. Vi packar och skickar den så snabbt vi
              kan!
            </p>
            <p className="mb-4">
              Ordernummer: <strong>{orderNumber}</strong>
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Stäng
            </button>
          </div>
        </div>
      )}
    </>
  );
}
