const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const User = require("../models/User");



/* REGISTER PAGE */

router.get("/register", (req,res)=>{

    res.render("register");

});


/* REGISTER USER */

router.post("/register", async(req,res)=>{

    try{

        const {
            name,
            email,
            password
        } = req.body;

        // CHECK EXISTING USER

        const existingUser =
            await User.findOne({ email });

        if(existingUser){

            req.flash(
                "error",
                "Email already exists"
            );

            return res.redirect("/register");

        }

        // CREATE USER

        const user = new User({

            name,

            email,

            password

        });

        await user.save();

        req.flash(
            "success",
            "Registration successful"
        );

        res.redirect("/login");

    }

    catch(error){

        console.log(error);

    }

});


/* LOGIN PAGE */

router.get("/login", (req,res)=>{

    res.render("login");

});


/* LOGIN USER */

router.post("/login", async(req,res)=>{

    try{

        const {
            email,
            password
        } = req.body;

        // FIND USER

        const user =
            await User.findOne({ email });

        if(!user){

            return res.render("login", { error: "Invalid credentials" });
        }

        // COMPARE PASSWORD

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if(!isMatch){

            req.flash(
                "error",
                "Invalid email or password"
            );

            return res.redirect("/login");

        }

        // SAVE USER IN SESSION

        req.session.user = {

            id: user._id,

            name: user.name,

            email: user.email,

            role: user.role

        };

        req.flash(
            "success",
            "Welcome back " + user.name
        );

        res.redirect("/");

    }

    catch(error){

        console.log(error);

    }

});


/* LOGOUT */

router.get("/logout", (req,res)=>{

    req.session.destroy(()=>{

        res.redirect("/login");

    });

});

router.get("/profile", (req,res)=>{

    if(!req.session.user){

        return res.redirect("/login");

    }

    res.render("profile");

});

module.exports = router;