const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");

const app = express();

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/allbirds-clone-website";
const adminRoutes = require("./routes/adminRoutes");

mongoose.connect(dbUrl)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use(
    session({
        secret: "allbirds-secret-key",
        resave: false,
        saveUninitialized: false
    })
);

const productRoutes = require("./routes/productRoutes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/products", productRoutes);


app.use("/admin", adminRoutes);

console.log("Products routes loaded");

const Product = require("./models/Product");

app.get("/", async (req, res) => {

    const featuredProducts =
        await Product.find().limit(4);

    res.render("landing", {
        featuredProducts
    });
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
console.log("Test route initialized");