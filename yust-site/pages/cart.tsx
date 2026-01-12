"use client";

import { useCart } from "@/context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  // Calcul du total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => router.push("/checkout");

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto h-[650px] p-6 mt-24">
        <h1 className="text-3xl font-bold mb-6 text-center">Mon Panier</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Votre panier est vide.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1 ml-4">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-700">{item.price.toFixed(2)} €</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-2 py-1 border rounded hover:bg-gray-200"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-2 py-1 border rounded hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2 text-red-600 hover:underline text-sm"
                  >
                    Supprimer
                  </button>
                </div>

                <div className="font-semibold">
                  {(item.price * item.quantity).toFixed(2)} €
                </div>
              </div>
            ))}

            <div className="mt-6 text-right border-t pt-4">
              <div className="font-bold text-lg mb-2">
                Total : {total.toFixed(2)} €
              </div>
              <button
                onClick={handleCheckout}
                className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
              >
                Passer à la caisse
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
