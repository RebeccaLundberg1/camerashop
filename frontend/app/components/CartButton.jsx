"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookies";

const CUSTOMER_COOKIE = "customerId";

export default function CartButton({itemCount=0}) {
    const [href, setHref] = useState("/cart");

    useEffect(() => {
        const value = getCookie(CUSTOMER_COOKIE);
        if (value) {
            setHref(`/cart/${value}`);
        }
    }, []);

    return (
        <Link href={href}>
            <button className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg">
                🛒 Kundkorg
            </button>
        </Link>
    );
}
