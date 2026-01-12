import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Section Hero / Bannière */}
      <section
        className="relative h-[750px] flex flex-col items-center justify-center 
                   bg-gradient-to-b from-white via-neutral-100 to-neutral-200 overflow-hidden"
        translate="no" // Protège tout le bloc contre la traduction
      >
        {/* Fond subtil */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_0%,transparent_70%)]"></div>

        {/* Titre principal stylé */}
        <h1
          className="relative text-5xl sm:text-7xl md:text-8xl font-black text-black tracking-tight z-10
                     font-['Cinzel_Decorative'] drop-shadow-[0_3px_6px_rgba(0,0,0,0.3)]
                     animate-[fadeIn_1.5s_ease-out]"
        >
          FASHION FORWARD
        </h1>

        {/* Slogan secondaire */}
        <p
          className="relative mt-4 text-lg sm:text-2xl text-neutral-600 z-10 font-light tracking-wide
                     uppercase animate-[fadeIn_2s_ease-out]"
        >
          conçus par des jeunes — pour des jeunes
        </p>

        {/* Ligne décorative */}
        <div className="w-24 h-[2px] bg-black mt-6 mb-10 animate-[fadeIn_2.5s_ease-out]"></div>

        {/* Bouton Shop */}
        <Link
          href="/shop"
          className="relative z-10 px-8 py-3 border-2 border-black text-black font-semibold rounded-full 
                     hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-wider
                     animate-[fadeIn_3s_ease-out]"
        >
          Shop Now
        </Link>

        {/* Halo lumineux subtil */}
        <div className="absolute -bottom-10 w-[500px] h-[300px] bg-white opacity-30 blur-3xl rounded-full"></div>
      </section>

      {/* Section Produits */}
      <main className="max-w-7xl mx-auto p-6 mt-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Nos Produits</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
