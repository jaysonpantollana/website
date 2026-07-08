import { Product, Seller } from '../types';

export const mockSeller: Seller = {
  name: "Jayson Pantollana's shop",
  phone: "+1-800-555-0199",
  social: [
    { platform: "GitHub", url: "https://github.com" },
    { platform: "Twitter", url: "https://twitter.com" }
  ]
};

export const mockProducts: Product[] = [
  {
    id: "lpt-x1-pro",
    title: "ApexBook Pro 16",
    description: "Engineered for uncompromising performance. The ApexBook Pro 16 features a machined aluminum chassis, advanced thermal routing, and a factory-calibrated display for creative professionals and engineers.",
    price: 2499.00,
    stock: 14,
    images: ["https://picsum.photos/seed/laptop1/800/800", "https://picsum.photos/seed/laptop2/800/800"],
    category: "Laptops",
    specs: {
      "Processor": "M-Series Ultra 12-Core",
      "Memory": "32GB Unified LPDDR5",
      "Storage": "1TB NVMe PCIe 4.0",
      "Display": "16.2-inch Mini-LED 120Hz"
    },
    created_at: new Date().toISOString()
  },
  {
    id: "gpu-rtx-4090",
    title: "NVIDIA GeForce RTX 4090 FE",
    description: "The ultimate GeForce GPU. It brings an enormous leap in performance, efficiency, and AI-powered graphics. Experience ultra-high performance gaming and incredibly detailed virtual worlds.",
    price: 1599.00,
    stock: 0, // Out of stock example
    images: ["https://picsum.photos/seed/gpu1/800/800"],
    category: "Components",
    specs: {
      "Architecture": "Ada Lovelace",
      "VRAM": "24GB GDDR6X",
      "CUDA Cores": "16384",
      "TDP": "450W"
    },
    created_at: new Date().toISOString()
  },
  {
    id: "ssd-990-pro",
    title: "Samsung 990 PRO 2TB",
    description: "Blistering fast NVMe SSD designed for hardcore gamers, tech enthusiasts, and professionals who need the absolute highest performance storage solution.",
    price: 189.99,
    stock: 45,
    images: ["https://picsum.photos/seed/ssd1/800/800"],
    category: "Storage",
    specs: {
      "Interface": "PCIe Gen 4.0 x4, NVMe 2.0",
      "Seq. Read": "Up to 7,450 MB/s",
      "Seq. Write": "Up to 6,900 MB/s",
      "Form Factor": "M.2 (2280)"
    },
    created_at: new Date().toISOString()
  },
  {
    id: "per-mx-master",
    title: "Logitech MX Master 3S",
    description: "An iconic mouse remastered. Feel every moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Clicks and an 8,000 DPI track-on-glass sensor.",
    price: 99.99,
    stock: 3, // Low stock example
    images: ["https://picsum.photos/seed/mouse1/800/800"],
    category: "Peripherals",
    specs: {
      "Sensor": "8000 DPI Optical",
      "Buttons": "7",
      "Connectivity": "Bluetooth / Logi Bolt",
      "Battery": "Up to 70 days"
    },
    created_at: new Date().toISOString()
  }
];
