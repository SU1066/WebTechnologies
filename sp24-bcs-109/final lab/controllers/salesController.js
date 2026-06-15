const Order = require("../models/Order");

const getSalesStats = async () => {
    const [summary] = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
                totalOrders: { $sum: 1 }
            }
        }
    ]);

    const [topProduct] = await Order.aggregate([
        { $unwind: "$items" },
        {
            $group: {
                _id: "$items.productId",
                name: { $first: "$items.name" },
                quantitySold: { $sum: "$items.quantity" },
                revenue: {
                    $sum: {
                        $multiply: ["$items.price", "$items.quantity"]
                    }
                }
            }
        },
        { $sort: { quantitySold: -1, revenue: -1 } },
        { $limit: 1 }
    ]);

    const recentTransactions = await Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("items totalAmount status createdAt")
        .lean();

    return {
        totalRevenue: summary ? summary.totalRevenue : 0,
        totalOrders: summary ? summary.totalOrders : 0,
        topProduct: topProduct || null,
        recentTransactions
    };
};

exports.renderSalesDashboard = async (req, res) => {
    try {
        const salesData = await getSalesStats();

        res.render("sales", {
            layout: "layouts/admin",
            title: "Sales Dashboard",
            activePage: "sales",
            salesData
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Unable to load sales dashboard");
    }
};

exports.getSalesData = async (req, res) => {
    try {
        const salesData = await getSalesStats();

        res.json(salesData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to fetch sales data" });
    }
};
