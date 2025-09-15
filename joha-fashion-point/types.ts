export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  category: string;
}