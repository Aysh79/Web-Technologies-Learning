const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

const products = [

{
    name: "iPhone 15",
    price: 250000,
    category: "Electronics",
    rating: 4.8,
    stock: 10
},

{
    name: "Gaming Laptop",
    price: 320000,
    category: "Electronics",
    rating: 4.7,
    stock: 5
},

{
    name: "Shoes",
    price: 5000,
    category: "Fashion",
    rating: 4.2,
    stock: 20
},

{
    name: "Jacket",
    price: 8000,
    category: "Fashion",
    rating: 4.5,
    stock: 15
},

{
    name: "Dining Table",
    price: 25000,
    category: "Home",
    rating: 4.1,
    stock: 7
},

{
    name: "Office Chair",
    price: 12000,
    category: "Home",
    rating: 4.4,
    stock: 12
}

];

async function seedData() {

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products Inserted");

    mongoose.connection.close();
}

seedData();