import { Link } from "@tanstack/react-router";
import "@/styles/product-card.css";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { useNavigate } from "@tanstack/react-router";


function ProductCard({ product }) {
  const navigate = useNavigate();
  const {setCart} = useContext(CartContext);
  const { addToCart } = useContext(CartContext);
  return (
    <div className="product-card">
      <Link 
      to="/products/$id" params={{ id: product.id }}
      >
      <img
        src={product.image}
        alt={product.name}
        width="200"
      />

      <h3>{product.name}</h3>
 </Link>
      <p>{product.description}</p>

      <p className="product-price">₹ {product.price}</p>

    <div className="productbuttons">
    <button
  onClick={() => addToCart(product)
  }
>
  Add To Cart
</button>
   <button
  onClick={() => { setCart([product]);

    navigate({
      to: "/checkout",
    });

  }}
>
  Buy Now
</button>
</div> 
    </div>
    
  );
}

export default ProductCard;