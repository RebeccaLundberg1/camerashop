import { getServerBaseUrl } from "@/app/utils/serverBaseUrl";
import OrderItem from "@/app/account/[customerId]/item";

export default async function OrderPage({params}) {
    const resolvedParams = await params;
    const customerId = resolvedParams.customerId;
    const baseUrl = await getServerBaseUrl();
    const url = baseUrl ? `${baseUrl}/api/account/${customerId}/orders` : null;

    let orders = [];
    let errorMessage = null;

    try {
        if (!url) {
            throw new Error("Missing server base URL");
        }
        const response = await fetch(url, {cache: "no-store" });

        if(!response.ok) {
            errorMessage = `Products API failed: ${response.status} ${response.statusText}`;
        } else {
            const data = await response.json();
            orders = Array.isArray(data) ? data : [];
        }
    } catch (err) {
        errorMessage = "Service is currently unreachable.";
    }

    if (errorMessage) {
        return (
            <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-zinc-50 p-6">
                <div className="max-w-7xl w-full mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Orderhistorik</h1>
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
                <h1 className="text-3xl font-bold mb-6">Orderhistorik</h1>
                <div className="flex-1 flex flex-col gap-6">
                    {orders.length === 0 ? (
                        <div className="p-4 bg-white shadow rounded w-full text-gray-600">Du har inga lagda ordrar</div>
                    ) : (
                        orders.map((order) => (
                            <OrderItem key={order.orderId} item={order} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
