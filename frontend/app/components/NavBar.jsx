import Link from "next/link";

export default function NavBar() {
    return (
        <div>
            <ul>
                <li>
                    <Link href="/" className="block px-4 py-2 rounded hover:bg-gray-600">Hem</Link>
                </li>
                <li>
                    <Link href="/category/camera" className="block px-4 py-2 rounded hover:bg-gray-600">Kameror</Link>
                </li>
                <li>
                    <Link href="/category/lens" className="block px-4 py-2 rounded hover:bg-gray-600">Objektiv</Link>
                </li>
                <li>
                    <Link href="/category/tripod" className="block px-4 py-2 rounded hover:bg-gray-600">Stativ</Link>
                </li>
                <li>
                    <Link href="/category/camera-bag" className="block px-4 py-2 rounded hover:bg-gray-600">Kameraväskor</Link>
                </li>
                <li>
                    <Link href="/category/memory-card" className="block px-4 py-2 rounded hover:bg-gray-600">Minneskort</Link>
                </li>
                <li>
                    <Link href="/category/accessory" className="block px-4 py-2 rounded hover:bg-gray-600">Övriga tillbehör</Link>
                </li>
            </ul>
        </div>
    )
}

