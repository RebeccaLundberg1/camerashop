import ProductCard from "./productcard";

export default async function Products() {
  const url = `${process.env.BACKEND_API_URL}/products`;

  let products = [];
  let errorMessage = null;

  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      errorMessage = `Products API failed: ${response.status} ${response.statusText}`;
    } else {
      const data = await response.json();
      products = Array.isArray(data) ? data : [];
    }
  } catch (err) {
    errorMessage = "Products service is currently unreachable.";
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
    <div className="p-6 max-w-7xl mx-auto">
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
  );
}
