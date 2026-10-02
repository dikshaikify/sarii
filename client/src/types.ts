export type Saree = {
  id: number;
  name: string;
  category: string;
  fabric: string;
  color: string;
  occasion: string;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  ratingCount: number;
  image: string;
  description: string;
  inStock: boolean;
};

export type Meta = {
  categories: string[];
  fabrics: string[];
  colors: string[];
  occasions: string[];
};