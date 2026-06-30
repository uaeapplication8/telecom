import { Device } from "@/types";

export const devices: Device[] = [
  {
    id: "iphone-15-pro",
    brand: "Apple",
    name: "iPhone 15 Pro",
    image: "https://images.unsplash.com/photo-1696446702183-cbd13d014d1f?w=800",
    price: 4599,
    monthlyFrom: 192,
    colors: ["Natural Titanium", "Blue Titanium", "Black Titanium"],
    storageOptions: ["128GB", "256GB", "512GB"],
    specs: [
      { label: "Display", value: "6.1\" Super Retina XDR" },
      { label: "Chip", value: "A17 Pro" },
      { label: "Camera", value: "48MP triple camera" },
      { label: "5G", value: "Yes" },
    ],
  },
  {
    id: "galaxy-s24-ultra",
    brand: "Samsung",
    name: "Galaxy S24 Ultra",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800",
    price: 4399,
    monthlyFrom: 183,
    colors: ["Titanium Black", "Titanium Gray", "Titanium Violet"],
    storageOptions: ["256GB", "512GB", "1TB"],
    specs: [
      { label: "Display", value: "6.8\" Dynamic AMOLED 2X" },
      { label: "Chip", value: "Snapdragon 8 Gen 3" },
      { label: "Camera", value: "200MP quad camera" },
      { label: "5G", value: "Yes" },
    ],
  },
  {
    id: "pixel-8-pro",
    brand: "Google",
    name: "Pixel 8 Pro",
    image: "https://images.unsplash.com/photo-1697294857355-2e72f5b04ba6?w=800",
    price: 3699,
    monthlyFrom: 154,
    colors: ["Obsidian", "Porcelain", "Bay"],
    storageOptions: ["128GB", "256GB"],
    specs: [
      { label: "Display", value: "6.7\" LTPO OLED" },
      { label: "Chip", value: "Google Tensor G3" },
      { label: "Camera", value: "50MP triple camera" },
      { label: "5G", value: "Yes" },
    ],
  },
  {
    id: "mi-router-ax6000",
    brand: "Xiaomi",
    name: "Mesh Router AX6000",
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800",
    price: 899,
    monthlyFrom: 38,
    colors: ["White"],
    storageOptions: ["Single Unit", "2-Pack Mesh"],
    specs: [
      { label: "WiFi", value: "WiFi 6, AX6000" },
      { label: "Ports", value: "4x Gigabit LAN" },
      { label: "Coverage", value: "Up to 300 sqm (mesh)" },
    ],
  },
];

export const getDeviceById = (id: string) => devices.find((d) => d.id === id);
