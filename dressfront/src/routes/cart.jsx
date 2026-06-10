import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {

  const navigate = Route.useNavigate();

  const { cart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price,
    0
  );

  return (

    <div className="cart-container">

      <h1>My Cart</h1>

      {cart.map((item) => (

        <div
          key={item.id}
          className="cart-item"
        >

          <img
            src={item.image}
            alt={item.name}
          />

          <div>

            <h3>{item.name}</h3>

            <p>₹ {item.price}</p>

          </div>

        </div>

      ))}

      <h2>
        Total: ₹ {total}
      </h2>

      <button
        onClick={() =>
          navigate({
            to: "/checkout",
          })
        }
      >
        Buy Now
      </button>

    </div>

  );
}