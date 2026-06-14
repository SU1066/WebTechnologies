const User = require("../models/User");

exports.registerPage = (req, res) => {

    res.render("auth/register");
};

exports.loginPage = (req, res) => {

    res.render("auth/login");
};
exports.registerUser = async (req,res)=>{

    try{

        const {
            name,
            email,
            password
        } = req.body;

        const existingUser =
            await User.findOne({email});

        if(existingUser){

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
            "Account created successfully"
        );

        res.redirect("/login");

    }

    catch(err){

        console.log(err);

        res.redirect("/register");
    }
};
exports.loginUser = async (req,res)=>{

    try{

        const {
            email,
            password
        } = req.body;

        const user =
            await User.findOne({email});

        if(!user){

            req.flash(
                "error",
                "Invalid credentials"
            );

            return res.redirect("/login");
        }

        const match =
            await user.comparePassword(
                password
            );

        if(!match){

            req.flash(
                "error",
                "Invalid credentials"
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

    }

    catch(err){

        console.log(err);

        res.redirect("/login");
    }
};
exports.logoutUser = (req, res) => {

    req.session.destroy(() => {

        res.redirect("/");
    });
};