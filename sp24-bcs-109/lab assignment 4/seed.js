const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect("mongodb://127.0.0.1:27017/allbirds-clone-website");

const products = [
    {
        name: "iPhone 15",
        price: 1200,
        category: "Electronics",
        rating: 4.8,
        stock: 10,
        image: "/public/images/iphone.jpg"
    },
    {
        name: "Gaming Laptop",
        price: 1800,
        category: "Electronics",
        rating: 4.5,
        stock: 5,
        image: "/public/images/laptop.jpg"
    },
    {
        name: "Men Hoodie",
        price: 60,
        category: "Fashion",
        rating: 4.2,
        stock: 20,
        image: "/public/images/hoodie.jpg"
    }
];

async function seedData() {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Database Seeded");
    mongoose.connection.close();
}

seedData();