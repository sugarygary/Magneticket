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
const createBranch = asyncHandler(async (req, res) => {
    // return res.status(200).json({ message: "halooooo" });
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
}