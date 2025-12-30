"use client";

import Link from "next/link";
import { Product } from "../data/products";
import { addToCart } from "@/utils/cart";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // empêche le clic d’ouvrir la page produit
    e.preventDefault();

    const productToAdd = {
      id: product.id ?? product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    addToCart(productToAdd);
  };

  const handleOpenProduct = () => {
    window.scrollTo(0, 0); // corrige le problème de scroll bloqué
    router.push(`/product/${product.slug}`);
  };

  return (
    <div
      onClick={handleOpenProduct}
      className="
        cursor-pointer bg-[#f2f2f2] overflow-hidden
        transition-all duration-300 hover:scale-[1.02]
        w-full max-w-[500px]
      "
    >
      {/* Image */}
      <div className="flex items-center justify-center bg-[#f2f2f2] aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-[75%] h-[75%] transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Texte + bouton */}
      <div className="text-center py-5 bg-white">
        <h3 className="text-sm sm:text-base font-medium uppercase text-black tracking-wide">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{product.price} €</p>
      </div>
    </div>
  );
}
