"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookies";

const CUSTOMER_COOKIE = "customerId";

export default function AccountButton({itemCount=0}) {
    const [href, setHref] = useState("/account");

    useEffect(() => {
        const customerId = getCookie(CUSTOMER_COOKIE);
        if (customerId) {
            setHref(`/account/${customerId}`);
        }
    }, []);

    return (
        <Link href={href}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg">
                Mina sidor
            </button>
        </Link>
    );
}
