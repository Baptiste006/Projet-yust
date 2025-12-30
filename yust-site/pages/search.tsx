"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { products } from "@/data/products"; // <-- IMPORT OFFICIEL

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  }, [query]);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-black pt-28 px-6 text-white">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-semibold mb-4">Rechercher un article</h1>

          <input
            type="text"
            placeholder="Quel article cherchez-vous ?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-500 bg-black rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none transition"
          />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
          {results.length > 0 ? (
            results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden group"
              >
                <div className="relative w-full h-60">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 text-black">
                  <h2 className="font-medium mb-1">{product.name}</h2>
                  <p className="text-sm">{product.price.toFixed(2)} €</p>
                </div>
              </Link>
            ))
          ) : query ? (
            <p className="text-center col-span-full text-gray-400">
              Aucun article trouvé
            </p>
          ) : (
            <p className="text-center col-span-full text-gray-500 italic"></p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
