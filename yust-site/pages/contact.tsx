"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* CONTENU */}
      <main className="max-w-3xl mx-auto mt-32 px-6 pb-32">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact</h1>

        <p className="text-center text-white mb-12">
          Une question ? Une demande particulière ? Envoyez-nous un message via ce formulaire.
        </p>

        <form
          action="mailto:contact@tonmail.com" // Remplace le mail "mailto:contact@tonmail.com" par l'adresse mail clinet de la société quand le site sera finalisé
          method="POST"
          encType="text/plain"
          className="space-y-6"
        >
          {/* Nom */}
          <div className="flex flex-col">
            <label className="font-medium">Nom</label>
            <input
              type="text"
              name="nom"
              required
              className="border border-black px-4 py-2 mt-1"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="border border-black px-4 py-2 mt-1"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label className="font-medium">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              className="border border-black px-4 py-2 mt-1"
            ></textarea>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition w-full"
          >
            Envoyer
          </button>
        </form>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
