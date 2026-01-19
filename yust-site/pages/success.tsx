import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 text-black">
      <Head><title>Commande Confirmée — Merci</title></Head>
      <div className="max-w-md w-full border-4 border-black p-12 text-center shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] bg-white">
        <div className="mb-8 inline-block bg-black p-5 text-white">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <h1 className="text-4xl font-black uppercase mb-4 tracking-tighter">Merci beaucoup !</h1>
        <p className="font-bold uppercase text-[10px] mb-10 tracking-[0.2em] text-gray-400">Votre commande est en préparation.</p>
        <Link href="/" className="block w-full bg-black text-white py-5 font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all">
          Retour au shop
        </Link>
      </div>
    </div>
  );
}