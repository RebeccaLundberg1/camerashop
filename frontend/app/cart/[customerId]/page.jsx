import CartItem from "@/app/cart/Item";

export default async function CartPage({params}) {
    const resolvedParams = await params;
    const customerId = resolvedParams.customerId;
    const url = `${process.env.BACKEND_API_URL}/cart/${customerId}`;

    let items = [];
    let totalPrice = 0;
    let errorMessage = null;

    try {
        const response = await fetch(url, {cache: "no-store" });

        if(!response.ok) {
            errorMessage = `Products API failed: ${response.status} ${response.statusText}`;
        } else {
            const data = await response.json();
            items = Array.isArray(data.items) ? data.items : [];
            totalPrice = data.totalPrice ?? 0;
        }
    } catch (err) {
        errorMessage = "Service is currently unreachable.";
    }

    if (errorMessage) {
        return (
            <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-zinc-50 p-6">
                <div className="max-w-7xl w-full mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Kundkorg</h1>
                    <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-800">
                        {errorMessage}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#e3e9e9] font-sans dark:bg-[#e3e9e9] p-6">
            <div className="max-w-7xl w-full mx-auto">
                <h1 className="text-3xl font-bold mb-6">Kundkorg</h1>
                <div className="flex-1 flex flex-col gap-6">
                    {items.length === 0 ? (
                        <div className="p-4 bg-white shadow rounded w-full text-gray-600">Din varukorg är tom.</div>
                    ) : (
                        items.map((item) => (
                            <CartItem key={item.productId} item={item} />
                        ))
                    )}
                    <h2 className="text-2xl font-bold">
                        Totalt pris: {totalPrice} SEK
                    </h2>
                </div>
            </div>
        </div>
    );
}