import { createContext, useState , useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

const [cart, setCart] = useState(() => {

  const savedCart =
    localStorage.getItem("cart");

  return savedCart
    ? JSON.parse(savedCart)
    : [];

});  console.log(cart);
useEffect(() => {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}, [cart]);
 const addToCart = (product) => {

  setCart((prevCart) => {

    const exists =
      prevCart.find(
        (item) =>
          item.id === product.id
      );

  if (exists) {

  alert("Product already in cart");

  return prevCart;

}

    return [
      ...prevCart,
      product,
    ];

  });

};

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
    

  );
};