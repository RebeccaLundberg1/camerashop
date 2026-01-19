import ProductCard from "./productcard";

export default async function Products() {
  const response = await fetch(`${process.env.BACKEND_API_URL}/products`, {
    cache: "no-store",
  });
  console.log(response);

  const data = await response.json();
  const products = data;

  console.log(products);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
