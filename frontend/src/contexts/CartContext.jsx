import React, { createContext, useState, useContext } from "react";
import API from "../api";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]); // Store placed orders

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          { 
            id: product._id, 
            name: product.name, 
            price: product.price.amount, 
            unit: product.price.unit || "unit",
            quantity 
          }
        ];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  // Place order (simulate or call backend)
  const placeOrder = async (paymentMethod, deliveryAddress) => {
    if (cartItems.length === 0) return;

    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
          unit: item.unit
        })),
        totalAmount: cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        paymentMethod,
        deliveryAddress,
      };

      // Call backend API
      const response = await API.post("orders/create", orderPayload);

      // Add to local orders state
      setOrders((prev) => [response.data.order, ...prev]);

      clearCart();
      return response.data.order;
    } catch (err) {
      console.error("Place order error:", err);
      throw err;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        setOrders, // optional, for refreshing orders from backend
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
