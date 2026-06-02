const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/allbirds-clone-website";

mongoose.connect(dbUrl)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const productRoutes = require("./routes/productRoutes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("."));
app.use("/products", productRoutes);

console.log("Products routes loaded");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "website.html"));
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
console.log("Test route initialized");