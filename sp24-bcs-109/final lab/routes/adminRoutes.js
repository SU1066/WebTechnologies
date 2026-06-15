const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const upload = require("../middleware/upload");

const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

router.get("/", (req, res) => {
    res.redirect("/admin/login");
});

router.get("/login", (req, res) => {
    res.render("admin/login");
});

router.post("/login", async (req, res) => {

    const admin = await Admin.findOne({
        email: req.body.email
    });

    if (!admin) {
        return res.send("Invalid Email");
    }

    const validPassword =
        await bcrypt.compare(
            req.body.password,
            admin.password
        );

    if (!validPassword) {
        return res.send("Invalid Password");
    }

    req.session.adminId = admin._id;

    res.redirect("/admin/dashboard");
});


router.get("/dashboard", auth, async (req, res) => {

    const products = await Product.find();

    res.render("admin/dashboard", {
        products
    });

});

router.get("/add", auth, async (req, res) => {

    res.render("admin/add-product");
});

router.post("/add",upload.single("image"),async (req, res) => {

        const {
            name,
            price,
            category,
            stock,
            rating
        } = req.body;

        if (
            !name ||
            !price ||
            !category
        ) {
            return res.send("Required fields missing");
        }

        await Product.create({
            name,
            price,
            category,
            stock,
            rating,
            image: req.file
                ? "/uploads/" + req.file.filename
                : ""
        });

        res.redirect("/admin");
    }
);

router.get("/edit/:id", auth, async (req, res) => {

    const product =
        await Product.findById(req.params.id);

    res.render("admin/edit-product", {
        product
    });
});

router.post("/edit/:id",upload.single("image"), auth, async (req, res) => {

        const updateData = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            rating: req.body.rating
        };

        if (req.file) {
            updateData.image =
                "/uploads/" + req.file.filename;
        }

        await Product.findByIdAndUpdate(
            req.params.id,
            updateData
        );

        res.redirect("/admin");
    }
);

router.post("/delete/:id", auth, async (req, res) => {

        await Product.findByIdAndDelete(
            req.params.id
        );

        res.redirect("/admin");
    }
);

router.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.redirect("/admin/login");

    });

});

module.exports = router;