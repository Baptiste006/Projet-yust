"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Product } from "../data/products";

export type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  message: string | null;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  // Charger le panier depuis localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  }, [cart]);

  // Ajouter un produit
  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Afficher la notification stylée
    setMessage(`${product.name} ajouté au panier`);
    setTimeout(() => setMessage(null), 2500);
  }

  // Supprimer un produit
  function removeFromCart(productId: string | number) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  // Mettre à jour la quantité
  function updateQuantity(productId: string | number, quantity: number) {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }

  // Vider le panier
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, message }}
    >
      {children}

      {/* Notification "Los Angeles streetwear" */}
      {message && (
        <div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2
                     bg-[rgba(0,0,0,0.7)] backdrop-blur-md text-white
                     px-8 py-4 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.4)]
                     text-base sm:text-lg font-['Cinzel_Decorative'] tracking-wide
                     border border-[rgba(255,255,255,0.2)] z-50
                     animate-fadeInUp"
        >
          <span className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
            {message}
          </span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
