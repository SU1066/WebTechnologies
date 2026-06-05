const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = 8;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";
        const category = req.query.category || "";

        const minPrice = Number(req.query.minPrice) || 0;
        const maxPrice = Number(req.query.maxPrice) || 100000;

        let filter = {};

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        if (category) {
            filter.category = category;
        }

        filter.price = {
            $gte: minPrice,
            $lte: maxPrice
        };

        const totalProducts = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(totalProducts / limit);

        res.render("products", {
            products,
            currentPage: page,
            totalPages,
            search,
            category,
            minPrice,
            maxPrice
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

console.log("Product routes file active");

module.exports = router;