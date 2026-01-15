import ProductCard from "./productcard"

export default async function Products(){
    
    const response = await fetch("http://localhost:8080/products", {
        cache: "no-store"
    });
    console.log(response);
    
    const data = await response.json();
    const products = data;

    console.log(products);
    
    return (
        <div className="flex">
        { 
        products.map(product =>(   
            <ProductCard key={product.id} product={product}/>
        )) }
        </div>
        )
}