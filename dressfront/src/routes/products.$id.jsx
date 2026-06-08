import { createFileRoute } from '@tanstack/react-router'
import {getProductById} from '../services/product.services';
import { useEffect, useState } from 'react';

export function ProductDetails() {
  
const [product,setProduct] = useState(null);
const {id} =Route.useParams();
 useEffect(()=>{
    const fetchProduct = async () => {
      try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };
  
    fetchProduct();
  }, [id]);
 
 if (!product) {
  return <div>Loading...</div>;
}

return (
  <div>
    <h1>{product.name}</h1>
    <p>{product.description}</p>
    <p>₹ {product.price}</p>
  </div>
);
}

export const Route = createFileRoute('/products/$id')({
  component: ProductDetails,

  
});

