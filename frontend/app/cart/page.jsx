import CartItem from "@/app/cart/Item";

export default function CartPage() {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-zinc-50 p-6">
            <div className="max-w-7xl w-full mx-auto">
                <h1 className="text-3xl font-bold mb-6">Kundkorg</h1>
                <div className="flex-1 flex flex-col gap-6">
                    <div className="p-4 bg-white shadow rounded w-full">Item 1</div>
                    <div className="p-4 bg-white shadow rounded w-full">Item 2</div>
                    <div className="p-4 bg-white shadow rounded w-full">Item 3</div>
                    {/*items*/}
                </div>
                <p className="mt-6">
                    Här under kommer sedan totalt pris, knapp för lägg order etc.
                </p>
            </div>
        </div>
    );
}