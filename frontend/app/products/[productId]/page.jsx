import {getServerBaseUrl} from "@/app/utils/serverBaseUrl";
import Image from "next/image";
import Actions from "@/app/products/Actions"

export default async function ProductPage({params}) {
    const resolvedParams = await params;
    const productId = resolvedParams.productId;
    const baseUrl = await getServerBaseUrl();
    const url = baseUrl ? `${baseUrl}/api/products/${productId}` : null;

    let product = null;
    let errorMessage = null;

    try {
        if (!url) {
            throw new Error("Missing server base URL");
        }
        const response = await fetch(url, {cache: "no-store" });

        if(!response.ok) {
            errorMessage = `Products API failed: ${response.status} ${response.statusText}`;
        } else {
            product = await response.json();
        }
    } catch (err) {
        errorMessage = "Service is currently unreachable.";
    }

    if (errorMessage) {
        return (
            <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-zinc-50 p-6">
                <div className="max-w-7xl w-full mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Produktsida</h1>
                    <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-800">
                        {errorMessage}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#e3e9e9] font-sans dark:bg-[#e3e9e9] p-6">
            <div className="max-w-3xl w-full mx-auto">
                {/*<PictureCarousel(product.productId, product.category)/>*/}
                {/* Följande div med bilden är bara för att visa på ett ungefärligt exempel när carousel är klar */}
                <div className="relative w-full aspect-7/5">
                    <Image
                        src={
                            product.category && product.id
                                ? `/product-images/${encodeURIComponent(product.category)}/${encodeURIComponent(product.id)}/1.jpg`
                                : "/product-images/camera.jpg"
                        }
                        alt={"Product"}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
                <h1 className="text-3xl font-bold mt-6 mb-6">{product.brand} {product.model} </h1>
                <p className="font-normal">{product.description}</p>
                <h2 className="text-2xl font-bold mt-6 mb-6">Pris: {product.price} SEK</h2>
                <div className="p-2 bg-[#e3e9e9] w-full">
                    <Actions productId={productId} />
                </div>
            </div>
        </div>
    );
}
