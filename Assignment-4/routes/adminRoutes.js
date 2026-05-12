const fs = require("fs");

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const Product = require("../models/Product");

// STORAGE CONFIG
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);
    }

});

const upload = multer({ storage: storage });


router.get("/admin", async (req, res) => {

    const products = await Product.find();

    res.render("admin/dashboard", {
        products
    });

});

router.get("/admin/add", (req, res) => {

    res.render("admin/addProduct");

});

router.post(
    "/admin/add",

    upload.single("image"),

    async (req, res) => {

        try {

            const newProduct = new Product({

                name: req.body.name,

                price: req.body.price,

                category: req.body.category,

                stock: req.body.stock,

                rating: req.body.rating,

                image: "/uploads/" + req.file.filename

            });

            await newProduct.save();

            res.redirect("/admin");

        }

        catch(error){

            console.log(error);

        }

    }
);


router.get(
    "/admin/edit/:id",

    async (req, res) => {

        try{

            const product =
                await Product.findById(req.params.id);

            res.render(
                "admin/editProduct",
                { product }
            );

        }

        catch(error){

            console.log(error);

        }

    }
);

router.post(
    "/admin/edit/:id",

    upload.single("image"),

    async (req, res) => {

        try{

            const updatedData = {

                name: req.body.name,

                price: req.body.price,

                category: req.body.category,

                stock: req.body.stock,

                rating: req.body.rating

            };

            // if NEW image uploaded

            if(req.file){

                updatedData.image =
                    "/uploads/" + req.file.filename;

            }

            await Product.findByIdAndUpdate(
                req.params.id,
                updatedData
            );

            res.redirect("/admin");

        }

        catch(error){

            console.log(error);

        }

    }
);


router.get(
    "/admin/delete/:id",

    async (req, res) => {

        try{

            const product =
                await Product.findById(req.params.id);

            // DELETE IMAGE FILE

            if(product.image){

                const imagePath =
                    path.join(
                        __dirname,
                        "../public",
                        product.image
                    );

                // check file exists

                if(fs.existsSync(imagePath)){

                    fs.unlinkSync(imagePath);

                }

            }

            // DELETE PRODUCT FROM DATABASE

            await Product.findByIdAndDelete(
                req.params.id
            );

            res.redirect("/admin");

        }

        catch(error){

            console.log(error);

        }

    }
);

module.exports = router;