import { createFileRoute } from "@tanstack/react-router";
import { useState, useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {

  const navigate = Route.useNavigate();

  const { cart, setCart } =
    useContext(CartContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const handleOrder = (e) => {

    e.preventDefault();

    alert("Order placed successfully");

    setCart([]);

    localStorage.removeItem("cart");

    navigate({
      to: "/",
    });

  };

  

  return (
    <div className="checkout-container">

      <div className="checkout-form">

        <h1>Checkout</h1>

        <form onSubmit={handleOrder}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) =>
              setPincode(e.target.value)
            }
          />

          <button type="submit">
            Place Order
          </button>

        </form>

      </div>

      <div className="order-summary">

        <h2>Order Summary</h2>

        {cart.map((item) => (

          <div
            key={item.id}
            className="summary-item"
          >

            <img
              src={item.image}
              alt={item.name}
            />

            <div>

              <h4>{item.name}</h4>

              <p>₹ {item.price}</p>

            </div>

          </div>

        ))}

        <h3>Total: ₹ {total}</h3>

      </div>

    </div>
  );
}