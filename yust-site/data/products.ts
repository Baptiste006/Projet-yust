export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  description: string;
  sizes?: string[];
  category: string; // catégorie ajoutée
};

export const products: Product[] = [
  {
    id: "yust-hoodie-01",
    name: "", // Nom du produit à ajouté quand le site sera finalisé et les noms des produit trouvés
    slug: "ffwrd-hoodie",
    price: 69,
    image: "/images/hoodie.jpg",
    description: "Hoodie oversized, label FFWRD brodé. Confort et style street.",
    sizes: ["S", "M", "L", "XL"],
    category: "Hoodie",
  },
  {
    id: "yust-tshirt-01",
    name: "", // Nom du produit à ajouté quand le site sera finalisé et les noms des produit trouvés
    slug: "ffwrd-tshirt",
    price: 35,
    image: "/images/tshirt.jpg",
    description: "T-shirt streetwear confortable et stylé.",
    sizes: ["S", "M", "L", "XL"],
    category: "T-Shirt",
  },
  {
    id: "yust-cap-01",
    name: "", // Nom du produit à ajouté quand le site sera finalisé et les noms des produit trouvés
    slug: "ffwrd-cap",
    price: 25,
    image: "/images/cap.jpg",
    description: "Casquette streetwear unisexe.",
    sizes: [],
    category: "Casquette",
  },
  // Ajoute d'autres produits ici...
];
