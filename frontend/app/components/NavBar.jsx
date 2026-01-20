import Link from "next/link";

export default function NavBar(){
    return(
        <div>
            <ul>
                <li><Link href="/">Hem</Link></li>
                <li><Link href="/category/camera">Kameror</Link></li>
                <li><Link href="/category/lens">Objektiv</Link></li>
                <li><Link href="/category/tripod">Stativ</Link></li>
                <li><Link href="/category/camera-bag">Kameraväskor</Link></li>
                <li><Link href="/category/memory-card">Minneskort</Link></li>
                <li><Link href="/category/accessory">Övriga tillbehör</Link></li>
            </ul>
        </div>
    )
}