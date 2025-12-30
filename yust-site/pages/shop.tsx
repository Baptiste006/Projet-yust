import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { products, Product } from "../data/products";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />

      <main className="bg-black min-h-screen text-white pt-32 pb-20 px-6 sm:px-12">
        {/* Titre */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Nos Produits</h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Découvrez la collection YUST — conçue par des jeunes, pour des jeunes.
          </p>
        </section>

        {/* Recherche + Filtre */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-neutral-900 border border-neutral-700 text-white placeholder-gray-400 
                       rounded-xl px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-neutral-900 border border-neutral-700 text-white rounded-xl px-4 py-2 
                       w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <option value="all">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Grille avec espacement généreux */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 justify-items-center px-2 sm:px-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-500 mt-10">
              Aucun produit trouvé.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
