import { useEffect, useState } from "react";
import { getProducts } from "../services/product.services";
import ProductCard from "../components/ProductCard";
import "@/styles/home.css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
    <div className= "product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
    </div>
  );
}

export default Home;

