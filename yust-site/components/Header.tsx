"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { LuMenu }  from "react-icons/lu"
import { BsBag, BsList, BsSearch } from "react-icons/bs";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true); // header visible ou non
  const [cartCount, setCartCount] = useState(0);
  const lastScrollY = useRef(0);
  const router = useRouter();

  // --- Scroll detection ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY.current || window.scrollY < 50) {
        // scroll vers le haut ou proche du top
        setShowHeader(true);
      } else {
        // scroll vers le bas
        setShowHeader(false);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Lecture du panier depuis localStorage ---
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cartData = localStorage.getItem("cart");
        if (cartData) {
          const cart = JSON.parse(cartData);
          setCartCount(cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0));
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error("Erreur de lecture du panier :", error);
      }
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  const handleSearchClick = () => router.push("/search");

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex justify-between items-center p-4 relative">
        {/* --- Menu gauche --- */}
        <div className="flex space-x-6 items-center">
       <BsList className="text-black size-6"  />
        </div>

        {/* --- Logo --- */}
        <div className="absolute left-1/2 transform -translate-x-1/2 perspective-1000">
          <Link href="/">
            <div className="relative w-[100px] h-[100px] animate-spin-3d group cursor-pointer">
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src="/images/logo.png"
                  alt="YUST Logo"
                  width={50}
                  height={15}
                  priority
                  className="object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full mix-blend-overlay animate-reflect"></div>
              </div>
            </div>
          </Link>
        </div>

        {/* --- Menu droit --- */}
        <div className="flex space-x-6 items-center relative">
          {/* Loupe */}
          <button
            onClick={handleSearchClick}
            className="transition-colors duration-300 transform hover:scale-110 text-black hover:text-gray-700"
            aria-label="Rechercher"
          >
            <BsSearch className="size-5"/>
          </button>

          {/* Panier */}
          <div className="relative">
            <Link
              href="/cart"
              className="transition-colors duration-300 transform hover:scale-110 text-black hover:text-gray-700"
              aria-label="Panier"
            >
              <BsBag size-6 className="size-5" />
            </Link>

            {/* Badge dynamique */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] font-semibold rounded-full px-1.5 py-0.5 bg-black text-white">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
