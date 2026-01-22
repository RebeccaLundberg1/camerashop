"use client";

import { useState, useEffect, useCallback } from "react";
import { getOrCreateCartId, addToCartApi } from "@/lib/cartService";

export default function useCart() {
    const [itemsCount, setItemsCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("cart_count");
        if (stored) setItemsCount(Number(stored));
    }, []);

    const addItem = useCallback(async (productId, quantity = 1) => {
        setLoading(true);
        try {
            const cartId = getOrCreateCartId();
            const res = await addToCartApi({ cartId, productId, quantity });
            setItemsCount((c) => {
                const next = c + Number(quantity);
                localStorage.setItem("cart_count", String(next));
                return next;
            });
            return res;
        } finally {
            setLoading(false);
        }
    }, []);

    return { itemsCount, addItem, loading };
}
