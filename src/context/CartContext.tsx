import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { API_ADD_TO_CART, API_CART_ITEMS, API_DECREASE_ITEM_CART, API_UPDATE_CART } from "../constants/api";
import useFetch from "../hooks/useFetch";

// Interface untuk Cart Item
interface CartItem {
  id: number;
  product_name: string;
  product_id: number;
  total_price: number;
  quantity: number;
  image_url: string;  // Jika Anda ingin menambahkan gambar produk
}

// Interface untuk CartContext
interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  clearCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantityChange: number) => void;
}

interface Response {
  data: CartItem[];
  message: string;
  status: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Retrieve access token from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      setAccessToken(token);
    }
  }, []);

  // Memoize headers to prevent unnecessary re-renders
  const headers = useMemo(() => {
    if (!accessToken) return undefined;
    return { Authorization: `Bearer ${accessToken}` };
  }, [accessToken]);

  // Fetch cart items
  const fetchCartItems = async () => {
    if (!headers) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_CART_ITEMS, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`Error fetching cart items: ${response.statusText}`);
      }

      const result: { data: CartItem[] } = await response.json();
      setCartItems(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Failed to fetch cart items:", err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when `accessToken` changes
  useEffect(() => {
    if (headers) {
      fetchCartItems();
    }
  }, []);

  const addToCart = async (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });

    try {
      const response = await fetch(API_ADD_TO_CART, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({product_id: item.product_id}),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      console.log("Item added to cart:", item);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== id));

    const fetchToUpdateCart = async () => {
      try {
        const response = await fetch(API_UPDATE_CART, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
          },
          body: JSON.stringify({
            product_id: id,
            quantity: 0
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        console.log("Removed item from cart:", id);
      } catch (error) {
        console.error(error);
      };
    }

    fetchToUpdateCart();
  };

  const updateQuantity = async (id: number, quantityChange: number) => {
    // Calculate the new quantity without updating the state
    let newQuantity = 0;
    const currentCart = [...cartItems]; // Assuming cartItems is your state
  
    const item = currentCart.find((item) => item.product_id === id);
    if (!item) {
      console.error("Item not found in the cart.");
      return;
    }
  
    newQuantity = item.quantity + quantityChange;
  
    // Prevent sending the request if the quantity is less than 1
    if (newQuantity < 1) {
      console.error("Quantity cannot be less than 1.");
      return;
    }
  
    try {
      // Send the update request to the backend
      const response = await fetch(API_UPDATE_CART, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          product_id: id,
          quantity: newQuantity,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      // If successful, update the cart state
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
  
      console.log("Item quantity updated:", id, newQuantity);
    } catch (error) {
      console.error("Failed to update quantity on the server:", error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };
  

  return (
    <CartContext.Provider value={{ cartItems, loading, error, clearCart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};