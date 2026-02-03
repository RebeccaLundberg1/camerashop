import Link from "next/link";

export default function AccountNavBar({ customerId }) {
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

