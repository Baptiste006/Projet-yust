import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart(); // <- ajouter clearCart
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmOrder = () => {
    alert("Commande confirmée ! Merci pour ton achat chez YUST 🖤");
    clearCart(); // <- vide le panier
    router.push("/"); // redirection vers l'accueil
  };

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto h-[700px] p-6">
        <h1 className="text-3xl font-bold mb-6">Résumé de la commande</h1>

        {cart.length === 0 ? (
          <p>Ton panier est vide.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border p-4 rounded"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1 ml-4">
                  <h2 className="font-medium">{item.name}</h2>
                  <p>
                    {item.quantity} x {item.price} € = {item.quantity * item.price} €
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-6 text-right font-bold text-lg">
              Total : {total} €
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={handleConfirmOrder}
                className="px-6 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition"
              >
                Confirmer la commande
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
