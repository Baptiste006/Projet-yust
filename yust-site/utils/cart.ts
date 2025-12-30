// utils/cart.ts

export function addToCart(product: any) {
  try {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // 🔹 Cherche si le produit existe déjà dans le panier
    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      // Si le produit existe déjà, on augmente juste la quantité
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Sinon, on l’ajoute avec une quantité initiale
      existingCart.push({ ...product, quantity: product.quantity ?? 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Notifie le Header que le panier a changé
    window.dispatchEvent(new Event("storage"));
  } catch (error) {
    console.error("Erreur lors de l’ajout au panier :", error);
  }
}

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
}

export function removeFromCart(productId: string | number) {
  try {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.filter((item: any) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Met à jour le header
    window.dispatchEvent(new Event("storage"));
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
  }
}

export function clearCart() {
  try {
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("storage"));
  } catch (error) {
    console.error("Erreur lors du vidage du panier :", error);
  }
}
