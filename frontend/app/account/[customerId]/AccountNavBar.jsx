"use client"

import Link from "next/link";
import {getCookie} from "@/app/utils/cookies";
import {useEffect, useState} from "react";

export default function AccountNavBar() {
    const [customerId, setCustomerId] = useState(null);

    useEffect(() => {
        const getCustomerId = () => {
            const CUSTOMER_COOKIE = "customerId";
            return getCookie(CUSTOMER_COOKIE);
        };
        setCustomerId(getCustomerId());
    }, []);

    if (!customerId) return null;

    return (
        <div>
            <ul>
                <h1 className="text-2xl font-bold px-4 py-2">Mina Sidor</h1>
                <li>
                    <Link href={`/account/${customerId}/orders`} className="block px-4 py-2 rounded hover:bg-gray-600">Orderhistorik</Link>
                </li>
            </ul>
        </div>
    )
}

