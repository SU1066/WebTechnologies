const mongoose = require("mongoose");
const Product = require("./models/Product");

console.log("Seed file started...");

mongoose.connect("mongodb://127.0.0.1:27017/allbirds-clone-website")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Connection Error:", err);
});

const products = [

    // MEN

    {
        name: "Tree Runner",
        price: 120,
        category: "Men",
        rating: 4.8,
        stock: 40,
        image: "/public/images/Tree-Runner.jpg"
    },

    {
        name: "Wool Runner",
        price: 110,
        category: "Men",
        rating: 4.6,
        stock: 35,
        image: "/public/images/Wool-Runner.jpg"
    },

    {
        name: "Tree Dasher 2",
        price: 135,
        category: "Men",
        rating: 4.7,
        stock: 28,
        image: "/public/images/Tree-Dasher-2.jpg"
    },

    {
        name: "Trail Runner SWT",
        price: 145,
        category: "Men",
        rating: 4.5,
        stock: 20,
        image: "/public/images/Trail-Runner-SWT.jpg"
    },

    {
        name: "Tree Flyer",
        price: 160,
        category: "Men",
        rating: 4.8,
        stock: 22,
        image: "/public/images/Tree-Flyer.jpg"
    },

    {
        name: "Wool Dasher Mizzle",
        price: 155,
        category: "Men",
        rating: 4.4,
        stock: 18,
        image: "/public/images/Wool-Dasher-Mizzle.jpg"
    },

    {
        name: "Tree Lounger",
        price: 100,
        category: "Men",
        rating: 4.3,
        stock: 30,
        image: "/public/images/Tree-Lounger.jpg"
    },

    {
        name: "Courier Sneaker",
        price: 125,
        category: "Men",
        rating: 4.5,
        stock: 25,
        image: "/public/images/Courier-Sneaker.jpg"
    },

    // WOMEN

    {
        name: "Women's Tree Runner",
        price: 120,
        category: "Women",
        rating: 4.9,
        stock: 45,
        image: "/public/images/Women's-Tree-Runner.jpg"
    },

    {
        name: "Women's Wool Runner",
        price: 110,
        category: "Women",
        rating: 4.7,
        stock: 40,
        image: "/public/images/Women's-Wool-Runner.jpg"
    },

    {
        name: "Women's Tree Dasher 2",
        price: 135,
        category: "Women",
        rating: 4.8,
        stock: 32,
        image: "/public/images/Women's-Tree-Dasher-2.jpg"
    },

    {
        name: "Women's Tree Flyer",
        price: 160,
        category: "Women",
        rating: 4.9,
        stock: 26,
        image: "/public/images/Women's-Tree-Flyer.jpg"
    },

    {
        name: "Women's Trail Runner SWT",
        price: 145,
        category: "Women",
        rating: 4.6,
        stock: 24,
        image: "/public/images/Women's-Trail-Runner-SWT.jpg"
    },

    {
        name: "Women's Wool Runner Mizzle",
        price: 150,
        category: "Women",
        rating: 4.5,
        stock: 18,
        image: "/public/images/Women's-Wool-Runner-Mizzle.jpg"
    },

    {
        name: "Women's Tree Lounger",
        price: 100,
        category: "Women",
        rating: 4.4,
        stock: 30,
        image: "/public/images/Women's-Tree-Lounger.jpg"
    },

    {
        name: "Women's Courier Sneaker",
        price: 125,
        category: "Women",
        rating: 4.5,
        stock: 28,
        image: "/public/images/Women's-Courier-Sneaker.jpg"
    },

    // APPAREL

    {
        name: "Everyday Hoodie",
        price: 90,
        category: "Apparel",
        rating: 4.5,
        stock: 20,
        image: "/public/images/Everyday-Hoodie.jpg"
    },

    {
        name: "Organic Cotton Tee",
        price: 45,
        category: "Apparel",
        rating: 4.4,
        stock: 35,
        image: "/public/images/Organic-Cotton-Tee.jpg"
    },

    {
        name: "R&R Sweatpant",
        price: 80,
        category: "Apparel",
        rating: 4.6,
        stock: 22,
        image: "/public/images/R&R-Sweatpant.jpg"
    },

    {
        name: "Merino Wool Cardigan",
        price: 120,
        category: "Apparel",
        rating: 4.7,
        stock: 15,
        image: "/public/images/Merino-Wool-Cardigan.jpg"
    },

    {
        name: "Wool Jumper",
        price: 95,
        category: "Apparel",
        rating: 4.5,
        stock: 18,
        image: "/public/images/Wool-Jumper.jpg"
    },

    {
        name: "Everyday Crew Sweatshirt",
        price: 75,
        category: "Apparel",
        rating: 4.3,
        stock: 24,
        image: "/public/images/Everyday-Crew-Sweatshirt.jpg"
    },

    {
        name: "Organic Relaxed Tee",
        price: 50,
        category: "Apparel",
        rating: 4.4,
        stock: 28,
        image: "/public/images/Organic-Relaxed-Tee.jpg"
    },

    // ACCESSORIES

    {
        name: "Trino Sprinters Socks",
        price: 18,
        category: "Accessories",
        rating: 4.6,
        stock: 60,
        image: "/public/images/Trino-Sprinters-Socks.jpg"
    },

    {
        name: "Anytime Crew Socks",
        price: 16,
        category: "Accessories",
        rating: 4.4,
        stock: 55,
        image: "/public/images/Anytime-Crew-Socks.jpg"
    },

    {
        name: "Wool Insole",
        price: 25,
        category: "Accessories",
        rating: 4.7,
        stock: 40,
        image: "/public/images/Wool-Insole.jpg"
    },

    {
        name: "Tree Insole",
        price: 25,
        category: "Accessories",
        rating: 4.6,
        stock: 42,
        image: "/public/images/Tree-Insole.jpg"
    },

    {
        name: "Featherbed-Insole-Medium-Grey",
        price: 35,
        category: "Accessories",
        rating: 4.3,
        stock: 20,
        image: "/public/images/Featherbed-Insole-Medium-Grey.jpg"
    },

    {
        name: "Blizard Socks",
        price: 30,
        category: "Accessories",
        rating: 4.5,
        stock: 25,
        image: "/public/images/Blizard-Socks.jpg"
    },

    {
        name: "Tree Cap",
        price: 28,
        category: "Accessories",
        rating: 4.4,
        stock: 30,
        image: "/public/images/Tree-Cap.jpg"
    }
];

async function seedDB() {
    try {

        await Product.deleteMany({});
        console.log("Old products deleted");

        await Product.insertMany(products);
        console.log(`${products.length} products inserted successfully`);

        mongoose.connection.close();
        console.log("Database connection closed");

    } catch (err) {
        console.log("Seeding Error:", err);
    }
}

seedDB();