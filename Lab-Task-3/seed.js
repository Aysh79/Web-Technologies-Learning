const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

const products = [
  // ELECTRONICS
  {
    name: "iPhone 15 Pro",
    price: 250000,
    category: "Electronics",
    rating: 4.9,
    stock: 10,
    image: "https://images.unsplash.com/photo-1696446700391-1c5c0f0c2d7c"
  },
  {
    name: "Samsung Galaxy S24",
    price: 220000,
    category: "Electronics",
    rating: 4.7,
    stock: 12,
    image: "https://images.unsplash.com/photo-1701081796810-6c8d3d2c1a2b"
  },
  {
    name: "MacBook Pro M3",
    price: 450000,
    category: "Electronics",
    rating: 4.8,
    stock: 5,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    name: "Gaming Laptop ASUS",
    price: 320000,
    category: "Electronics",
    rating: 4.6,
    stock: 7,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    name: "Apple AirPods Pro",
    price: 55000,
    category: "Electronics",
    rating: 4.7,
    stock: 20,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5"
  },
  {
    name: "Smart Watch Series 9",
    price: 65000,
    category: "Electronics",
    rating: 4.5,
    stock: 18,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  },

  // FASHION
  {
    name: "Nike Running Shoes",
    price: 18000,
    category: "Fashion",
    rating: 4.6,
    stock: 25,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    name: "Adidas Hoodie",
    price: 12000,
    category: "Fashion",
    rating: 4.4,
    stock: 30,
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38"
  },
  {
    name: "Leather Jacket",
    price: 25000,
    category: "Fashion",
    rating: 4.7,
    stock: 15,
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38"
  },
  {
    name: "Casual T-Shirt Pack",
    price: 5000,
    category: "Fashion",
    rating: 4.3,
    stock: 40,
    image: "https://images.unsplash.com/photo-1520975958222-5b0e6b4b0b4d"
  },

  // HOME
  {
    name: "Wooden Dining Table",
    price: 55000,
    category: "Home",
    rating: 4.5,
    stock: 8,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  },
  {
    name: "Office Chair Ergonomic",
    price: 22000,
    category: "Home",
    rating: 4.6,
    stock: 12,
    image: "https://images.unsplash.com/photo-1505843490701-5be5d0b19d2a"
  },
  {
    name: "Modern Sofa Set",
    price: 140000,
    category: "Home",
    rating: 4.8,
    stock: 4,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  },
  {
    name: "Study Table Lamp",
    price: 3500,
    category: "Home",
    rating: 4.2,
    stock: 50,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  },

  // EXTRA MIX
  {
    name: "Bluetooth Speaker JBL",
    price: 15000,
    category: "Electronics",
    rating: 4.4,
    stock: 22,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab"
  },
  {
    name: "Mechanical Keyboard RGB",
    price: 18000,
    category: "Electronics",
    rating: 4.6,
    stock: 18,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae"
  },
  {
    name: "Gaming Mouse Logitech",
    price: 7000,
    category: "Electronics",
    rating: 4.5,
    stock: 30,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db"
  },
  {
    name: "Backpack Travel Bag",
    price: 4500,
    category: "Fashion",
    rating: 4.3,
    stock: 35,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  {
    name: "Perfume Luxury Edition",
    price: 9000,
    category: "Fashion",
    rating: 4.6,
    stock: 20,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601"
  },
  {
    name: "Wall Clock Modern",
    price: 3000,
    category: "Home",
    rating: 4.1,
    stock: 40,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  }
];

async function seedData() {
  await Product.deleteMany();
  await Product.insertMany(products);

  console.log("BIG Dataset Inserted");
  mongoose.connection.close();
}

seedData();