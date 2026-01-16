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
    <div className="flex">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
