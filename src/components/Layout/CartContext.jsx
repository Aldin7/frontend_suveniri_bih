import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:3000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const products = res.data.products || [];
      setCartItems(products);
      setCartCount(products.reduce((acc, item) => acc + item.quantity, 0));
    } catch (err) {
      console.error("Greška kod dohvaćanja korpe:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;