require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");

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
app.use(flash());
app.use((req, res, next) => {

    res.locals.user =
        req.session.user;

    res.locals.success =
        req.flash("success");

    res.locals.error =
        req.flash("error");

    next();
});
const productRoutes = require("./routes/productRoutes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", false);

app.use(express.json());
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
console.log("Test route initialized");

const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
const salesRoutes = require("./routes/salesRoutes");

app.use(authRoutes);
app.use("/api/v1", apiRoutes);
app.use(salesRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
