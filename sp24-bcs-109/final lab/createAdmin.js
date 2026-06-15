const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect(
    "mongodb://127.0.0.1:27017/allbirds-clone-website"
);

async function createAdmin() {

    const hashedPassword =
        await bcrypt.hash(
            "admin123",
            10
        );

    await Admin.create({
        email: "admin@allbirds.com",
        password: hashedPassword
    });

    console.log("Admin created");

    process.exit();
}

createAdmin();