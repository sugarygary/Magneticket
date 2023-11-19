require("dotenv").config();
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { GMAIL_ACC, GMAIL_APP_PASSWORD, BACKEND_URL, FRONTEND_URL } =
    process.env;
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const generateToken = require("../util/generateToken");
const Cineplex = require("../models/Cineplex");
const jwt = require("jsonwebtoken");
const Branch = require("../models/Branch");
const { ObjectId } = require('mongodb');
const Promotion = require("../models/Promotion");
const Menu = require("../models/Menu");

//verify middleware
const verifyCineplexCookie = async (req, res, next) => {
    try {
        const token = req.cookies.magneticket_token;
        if (!token) return res.status(401).json({ message: "Unauthorized kalo tidak ada cookie aktif" });
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (verified.role != "CINEPLEX") {
            return res.status(403).json({ message: "Forbidden BUKAN AKUN AKUN CINEPLEX HEHEH" });
        }
        req.userId = verified.userId;
        next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: "Unauthorized token ngawur " });
    }
}
const createPromo = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    let { cineplex, promo_code, valid_until, discount_amount, minimum_transaction } = req.body;
    const token = req.cookies.magneticket_token;
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (verified.userId != cineplex) {
        res.status(403);
        throw new Error("You are not the owner of this company");
    }
    if (!minimum_transaction || minimum_transaction == "") {
        minimum_transaction = 0;
    }
    let newPromotion = new Promotion({
        cineplex: cineplex,
        promo_code: promo_code,
        valid_until: valid_until,
        discount_amount: discount_amount,
        minimum_transaction: minimum_transaction
    });
    await newPromotion.save();

    return res.status(201).send({
        message: "Promo has been created",
        cineplex: cineplex,
        promo_code: promo_code,
        valid_until: valid_until,
        discount_amount: discount_amount,
        minimum_transaction: minimum_transaction
    });
})
const createMenu = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    let { cineplex, item_name, item_description, price, minimum_transaction } = req.body;
    const token = req.cookies.magneticket_token;
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (verified.userId != cineplex) {
        res.status(403);
        throw new Error("You are not the owner of this company");
    }

    let newMenu = new Menu({
        cineplex: cineplex,
        item_name: item_name,
        item_description: item_description,
        price: price,
    });
    await newMenu.save();

    return res.status(201).send({
        message: "Menu has been created",
        cineplex: cineplex,
        item_name: item_name,
        item_description: item_description,
        price: price,
    });
})
const createBranch = asyncHandler(async (req, res) => {
    // return res.status(200).json({ message: "halooooo" });
    console.log(new Date() + 1000 * 3600 * 24 * 30)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    let { cineplex, branch_name, address, city } = req.body;
    const token = req.cookies.magneticket_token;
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (verified.userId != cineplex) {
        res.status(403);
        throw new Error("You are not the owner of this company");
    }
    // let findCineplex = await Cineplex.findById(cineplex);
    // console.log(findCineplex);
    let findBranch = await Branch.findByBranchName(branch_name);
    if (findBranch !== null) {
        res.status(409);
        throw new Error("Branch already exists");
    }
    let newBranch = new Branch({
        cineplex: cineplex,
        branch_name: branch_name,
        address: address,
        city: city,
    });
    await newBranch.save();

    return res.status(201).send({
        message: "Branch created",
        cineplex: newBranch.cineplex,
        branch_name: newBranch.branch_name,
        address: newBranch.address,
        city: newBranch.city
    });
})



module.exports = {
    verifyCineplexCookie,
    createBranch,
    createPromo,
    createMenu,
}