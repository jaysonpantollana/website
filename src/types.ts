export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category?: string;
  specs?: Record<string, string>;
  created_at: string;
}

export interface Seller {
  name: string;
  phone: string;
  social: { platform: string; url: string }[];
}
