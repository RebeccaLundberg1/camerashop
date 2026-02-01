import {getServerBaseUrl} from "@/app/utils/serverBaseUrl";
import Image from "next/image";
import BuyButton from "@/app/components/BuyButton";

export default async function ProductPage({params}) {
    const resolvedParams = await params;
    const productId = resolvedParams.productId;
    //const baseUrl = await getServerBaseUrl();
    //const url = baseUrl ? `${baseUrl}/api/product/${productId}` : null;

    let product = null;
    let errorMessage = null;

    //try {
    //    if (!url) {
    //        throw new Error("Missing server base URL");
    //    }
    //    const response = await fetch(url, {cache: "no-store" });
//
    //    if(!response.ok) {
    //        errorMessage = `Products API failed: ${response.status} ${response.statusText}`;
    //    } else {
    //        product = await response.json();
    //    }
    //} catch (err) {
    //    errorMessage = "Service is currently unreachable.";
    //}
//
    //if (errorMessage) {
    //    return (
    //        <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-zinc-50 p-6">
    //            <div className="max-w-7xl w-full mx-auto">
    //                <h1 className="text-3xl font-bold mb-6">Produktsida</h1>
    //                <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-800">
    //                    {errorMessage}
    //                </div>
    //            </div>
    //        </div>
    //    );
    //}

    return (
        <div className="flex flex-col min-h-screen bg-[#e3e9e9] font-sans dark:bg-[#e3e9e9] p-6">
            <div className="max-w-3xl w-full mx-auto">
                <div className="relative w-full aspect-5/4">
                    <Image
                        src={ "/product-images/camera.jpg"}
                        alt={"Product"}
                        fill
                        className="object-cover"
                        unoptimized
                        //src={imgSrc}
                        //alt={safeName ?? "Product"}
                        //fill
                        //className="object-cover"
                        //unoptimized
                        //onError={() => {
                        //    setImgSrc("/product-images/camera.jpg");
                        //}}
                    />
                </div>
                <h1 className="text-3xl font-bold mb-6">product.brand product.model </h1>
                <p className="text-2xl font-normal">product.description</p>
                <div className="p-4 bg-[#e3e9e9] w-full">
                    <h2 className="p-4 text-2xl font-bold">
                        Totalt pris: totalPrice SEK
                    </h2>
                    <BuyButton className="m-4"/>
                </div>
            </div>
        </div>
    );
}
