import React, { useState } from 'react';
import Head from 'next/head';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext'; 

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutForm = ({ totalTTC }: { totalTTC: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || cart.length === 0) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(totalTTC * 100) }), 
      });
      
      const data = await response.json();
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement)! },
      });

      if (result.error) {
        setErrorMessage(result.error.message || "Erreur de paiement.");
        setLoading(false);
      } else if (result.paymentIntent?.status === 'succeeded') {
        window.location.href = "/success";
      }
    } catch (err) {
      setErrorMessage("Erreur de connexion.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section>
        <h2 className="text-lg font-black uppercase mb-4 tracking-tighter italic">1. Informations de livraison</h2>
        <input type="email" placeholder="E-mail" required className="w-full p-4 border-2 border-black mb-4 outline-none font-bold focus:bg-gray-50" />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="Prénom" required className="p-4 border-2 border-black outline-none font-bold focus:bg-gray-50" />
          <input type="text" placeholder="Nom" required className="p-4 border-2 border-black outline-none font-bold focus:bg-gray-50" />
        </div>
        <input type="text" placeholder="Adresse complète" required className="w-full p-4 border-2 border-black outline-none font-bold focus:bg-gray-50" />
      </section>

      <section className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-lg font-black uppercase mb-4 tracking-tighter">2. Paiement sécurisé</h2>
        <div className="p-4 border-2 border-black bg-white">
          <CardElement options={{ style: { base: { fontSize: '16px', fontWeight: '700', color: '#000' } } }} />
        </div>
        {errorMessage && <p className="text-red-600 font-bold mt-4 uppercase text-[10px] tracking-widest">{errorMessage}</p>}
      </section>

      <button 
        type="submit" 
        disabled={!stripe || loading || cart.length === 0}
        className="w-full bg-black text-white py-6 font-black uppercase text-xl border-2 border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
      >
        {loading ? "Chargement..." : `Payer ${totalTTC.toFixed(2)} €`}
      </button>
    </form>
  );
};

export default function PaymentPage() {
  const { cart } = useCart();
  
  // LOGIQUE DE CALCUL
  const subtotalTTC = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFees = subtotalTTC >= 100 ? 0 : 5.00; // Gratuit si > 100€
  
  const tvaRate = 0.20;
  const totalTTC = subtotalTTC + shippingFees;
  const subtotalHT = subtotalTTC / (1 + tvaRate);
  const tvaAmount = subtotalTTC - subtotalHT;

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-white text-black font-sans">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row border-t-4 border-black">
          
          {/* GAUCHE : FORMULAIRE */}
          <main className="flex-1 p-8 md:p-16 border-r-0 md:border-r-4 border-black">
             <h1 className="text-5xl font-black uppercase mb-12 italic tracking-tighter">Checkout</h1>
             <CheckoutForm totalTTC={totalTTC} />
          </main>

          {/* DROITE : RÉCAPITULATIF */}
          <aside className="w-full md:w-5/12 bg-gray-50 p-8 md:p-16">
            <h2 className="text-2xl font-black uppercase mb-8 border-b-4 border-black pb-2 tracking-tighter">Résumé de commande</h2>
            
            <div className="space-y-6 mb-10">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center font-bold uppercase text-xs">
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-[10px] text-gray-400 font-normal italic">Quantité: {item.quantity}</span>
                  </div>
                  <span>{(item.price * item.quantity).toFixed(2)} €</span>
                </div>
              ))}
            </div>
            
            <div className="border-t-2 border-black pt-6 space-y-3 font-bold uppercase text-[10px] tracking-widest text-gray-600">
               <div className="flex justify-between"><span>Sous-total HT</span><span>{subtotalHT.toFixed(2)} €</span></div>
               <div className="flex justify-between"><span>TVA (20%)</span><span>{tvaAmount.toFixed(2)} €</span></div>
               <div className="flex justify-between text-black font-black pt-2 border-t border-black/10">
                  <span>Livraison</span>
                  <span>{shippingFees === 0 ? "OFFERTE" : `${shippingFees.toFixed(2)} €`}</span>
               </div>
            </div>

            <div className="border-t-4 border-black mt-8 pt-8 flex justify-between text-5xl font-black tracking-tighter">
              <span>TOTAL</span>
              <span>{totalTTC.toFixed(2)} €</span>
            </div>
          </aside>
        </div>
      </div>
    </Elements>
  );
}