import Link from "next/link";

export default function CartButton({itemCount=0}) {
    return (
        <Link href="/cart">
            <button className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg">
                🛒 Kundkorg
            </button>
        </Link>
    );
}