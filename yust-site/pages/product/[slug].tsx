import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { products } from "../../data/products";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { addToCart } = useCart();

  // Trouver le produit correspondant au slug
  const product = products.find((p) => p.slug === slug);

  // Force le scroll en haut quand on arrive sur cette page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Produit introuvable
      </main>
    );
  }

  const handleAddToCart = () => {
    // Garantit qu'on a toujours un identifiant unique
    const productToAdd = {
      ...product,
      id: product.id ?? product.slug,
    };

    console.log("Ajout au panier :", productToAdd); // Debug console
    addToCart(productToAdd);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Image produit */}
          <div className="flex-1 flex items-center justify-center bg-[#f2f2f2] rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="object-contain w-full max-h-[600px]"
            />
          </div>

          {/* Infos produit */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-gray-300 mb-6">{product.price} €</p>
            <p className="text-gray-400 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Bouton ajouter au panier */}
            <button
              onClick={handleAddToCart}
              className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300 w-fit"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
