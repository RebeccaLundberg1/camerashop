import ProductCard from "../components/productcard";
import { getServerBaseUrl } from "@/app/utils/serverBaseUrl";

export default async function ProductsPage({searchParams}) {
  const sp = await searchParams;
  const category = sp?.category ?? "";
  const baseUrl = await getServerBaseUrl();
  const url = baseUrl ? `${baseUrl}/api/products${category ? `?category=${encodeURIComponent(category)}` : ""}` : null;

  let products = [];
  let errorMessage = null;

  try {
    if (!url) {
      throw new Error("Missing server base URL");
    }
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      errorMessage = `Products API failed: ${response.status} ${response.statusText}`;
    } else {
      const data = await response.json();
      products = Array.isArray(data) ? data : [];
    }
  } catch (err) {
    errorMessage = "Page service is currently unreachable.";
  }

  if (errorMessage) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-800">
          {errorMessage}
        </div>
      </div>
    );
  }

  return (
      <div className="flex min-h-screen justify-center bg-[#e3e9e9] font-sans dark:bg-[#e3e9e9]">
        <div className="p-6 max-w-7xl w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length === 0 ? (
                <div className="text-sm text-gray-600">No products available.</div>
            ) : (
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            )}
          </div>
        </div>
      </div>
  );
}