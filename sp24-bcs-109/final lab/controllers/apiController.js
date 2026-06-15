const jwt = require("jsonwebtoken");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

const getProductFilter = (req) => {
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

    return { filter, page, limit, skip };
};

exports.getProducts = async (req, res) => {
    try {
        const { filter, page, limit, skip } = getProductFilter(req);

        const totalProducts = await Product.countDocuments(filter);
        const products = await Product.find(filter).skip(skip).limit(limit);
        const totalPages = Math.ceil(totalProducts / limit);

        res.json({
            products,
            currentPage: page,
            totalPages,
            totalProducts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { user_id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { productId, quantity, items } = req.body;
        let normalizedItems = [];

        if (Array.isArray(items) && items.length > 0) {
            normalizedItems = items;
        } else if (productId) {
            normalizedItems = [{ productId, quantity: quantity || 1 }];
        }

        if (!normalizedItems.length) {
            return res.status(400).json({ message: "At least one product is required" });
        }

        let totalAmount = 0;
        const orderItems = [];

        for (const entry of normalizedItems) {
            const product = await Product.findById(entry.productId);

            if (!product) {
                return res.status(404).json({ message: `Product not found: ${entry.productId}` });
            }

            const requestedQuantity = entry.quantity || 1;

            if (product.stock < requestedQuantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
            }

            orderItems.push({
                productId: product._id,
                name: product.name,
                quantity: requestedQuantity,
                price: product.price
            });

            totalAmount += product.price * requestedQuantity;
        }

        const order = await Order.create({
            user: req.user.id,
            items: orderItems,
            totalAmount,
            status: "pending"
        });

        res.status(201).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};
