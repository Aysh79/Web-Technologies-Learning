const express = require("express");
const router = express.Router();

const Product = require("../models/product");


// PRODUCTS PAGE
router.get("/products", async (req, res) => {

    try {

        // =========================
        // 1. QUERY VALUES
        // =========================
        const page = parseInt(req.query.page) || 1;
        const limit = 8;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";
        const category = req.query.category || "";
        const minPrice = req.query.minPrice || 0;
        const maxPrice = req.query.maxPrice || 10000000;
        const sort = req.query.sort || "";


        // =========================
        // 2. BUILD FILTER OBJECT
        // =========================
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
            $gte: Number(minPrice),
            $lte: Number(maxPrice)
        };
        // SORTING LOGIC
        let sortOption = {};

        if (sort === "priceLow") sortOption.price = 1;
        if (sort === "priceHigh") sortOption.price = -1;
        if (sort === "ratingHigh") sortOption.rating = -1;

        // =========================
        // 3. GET DATA
        // =========================
        const totalProducts = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limit)
            
        const totalPages = Math.ceil(totalProducts / limit);

        // =========================
        // 4. SEND TO EJS
        // =========================
        res.render("products", {
            products,
            currentPage: page,
            totalPages,
            search: search || "",
            category: category || "",
            minPrice: minPrice || "",
            maxPrice: maxPrice || ""
        });

    } catch (error) {
        console.log(error);
        res.send("Error in filtering system");
    }

});

module.exports = router;