const User = require("../models/User");

exports.registerPage = (req, res) => {

    res.render("auth/register");
};

exports.loginPage = (req, res) => {

    res.render("auth/login");
};
exports.registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    const existingUser =
        await User.findOne({ email });

    if (existingUser) {

        req.flash(
            "error",
            "Email already exists"
        );

        return res.redirect("/register");
    }

    await User.create({
        name,
        email,
        password
    });

    req.flash(
        "success",
        "Account created successfully. Please login."
    );

    res.redirect("/login");
};
exports.loginUser = async (req, res) => {

    const { email, password } = req.body;

    const user =
        await User.findOne({ email });

    if (
        !user ||
        !(await user.comparePassword(password))
    ) {

        req.flash(
            "error",
            "Invalid email or password"
        );

        return res.redirect("/login");
    }

    req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    res.redirect("/");
};
exports.logoutUser = (req, res) => {

    req.session.destroy(() => {

        res.redirect("/");
    });
};