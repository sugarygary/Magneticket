require("dotenv").config();
const { body, validationResult } = require("express-validator");
const generateToken = require("../util/generateToken");
const Cineplex = require("../models/Cineplex");
const jwt = require("jsonwebtoken");
const Branch = require("../models/Branch");
const { ObjectId } = require("mongodb");
const Promotion = require("../models/Promotion");
const Menu = require("../models/Menu");
const { db } = require("../db/connection");
const Studio = require("../models/Studio");
const Seat = require("../models/Seat");
const axios = require("axios");
const Movie = require("../models/Movie");
const Screening = require("../models/Screening");
const moment = require("moment-timezone");

const verifyCineplexCookie = async (req, res, next) => {
  try {
    const token = req.cookies.magneticket_token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (verified.role != "CINEPLEX") {
      // res.clearCookie("magneticket_token");
      return res.status(403).json({ message: "Forbidden" });
    }
    let findCineplex = Cineplex.findById(verified.userId);
    if (findCineplex == null) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = verified.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
const createPromo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  let { promo_code, valid_until, discount_amount, minimum_transaction } =
    req.body;
  if (!minimum_transaction || minimum_transaction == "") {
    minimum_transaction = 0;
  }
  let newPromotion = new Promotion({
    cineplex: req.userId,
    promo_code: promo_code,
    valid_until: valid_until,
    discount_amount: discount_amount,
    minimum_transaction: minimum_transaction,
  });
  await newPromotion.save();

  return res.status(201).send({
    message: "Promo has been created",
    cineplex: req.userId,
    promo_code: promo_code,
    valid_until: valid_until,
    discount_amount: discount_amount,
    minimum_transaction: minimum_transaction,
  });
};
const createMenu = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  let { item_name, item_description, price } = req.body;

  let newMenu = new Menu({
    cineplex: req.userId,
    item_name: item_name,
    item_description: item_description,
    price: parseInt(price),
  });
  await newMenu.save();

  return res.status(201).send({
    message: "Menu has been created",
    item_name: item_name,
    item_description: item_description,
    price: price,
  });
};
const createBranch = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  let { branch_name, address, city } = req.body;
  let findBranch = await Branch.findByBranchName(branch_name);
  if (findBranch !== null) {
    res.status(409);
    throw new Error("Branch already exists");
  }
  let newBranch = new Branch({
    cineplex: req.userId,
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
    city: newBranch.city,
  });
};

const validateCreateStudio = [
  body("branch_id").notEmpty().withMessage("Field cannot be empty"),
  body("studio_name").notEmpty().withMessage("Field cannot be empty"),
  body("type").notEmpty().withMessage("Field cannot be empty"),
  body("row")
    .notEmpty()
    .withMessage("Field cannot be empty")
    .isInt({ min: 1, max: 26 })
    .withMessage("Row must be a number between 1 and 26"),
  body("seating_layout")
    .notEmpty()
    .withMessage("Field cannot be empty")
    .matches(/^(\d+-)+\d+$/)
    .withMessage("Invalid seating layout input"),
];
const createStudio = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  let { branch_id, studio_name, type, row, seating_layout } = req.body;
  let findBranch = await Branch.findById(branch_id);
  if (findBranch == null) {
    return res.status(404).send({ message: "Branch not found" });
  }
  if (findBranch.cineplex != req.userId) {
    return res.status(403).send({ message: "Forbidden" });
  }
  let column = seating_layout.split("-");
  let totalColumn = column.reduce((total, col) => {
    return parseInt(total) + parseInt(col);
  });
  if (totalColumn > 99 || totalColumn < 0) {
    return res.status(400).send({ message: "Invalid column input" });
  }
  const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const session = await db.startSession();
  try {
    session.startTransaction();
    let newStudio = new Studio({
      cineplex: req.userId,
      branch: branch_id,
      studio_name,
      type,
      row,
      seating_layout,
    });
    let seats = [];
    for (let i = 0; i < row; i++) {
      const rowLetter = alphabets[i];
      for (let j = 0; j < totalColumn; j++) {
        seats.push({
          cineplex: req.userId,
          studio: newStudio._id,
          seat_number: rowLetter + (j + 1).toString().padStart(2, 0),
        });
      }
    }
    await newStudio.save({ session });
    await Seat.insertMany(seats, { session });
    await session.commitTransaction();
    return res.status(201).send({ message: "Studio created succesfully" });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: error.message });
  }
};

const validateCreateScreening = [
  body("studio_id").notEmpty().withMessage("Field cannot be empty"),
  body("movie_id").notEmpty().withMessage("Field cannot be empty"),
  body("price")
    .notEmpty()
    .withMessage("Field cannot be empty")
    .isInt({ min: 1 })
    .withMessage("Price cannot be less than 1"),
  body("showtime")
    .notEmpty()
    .withMessage("Field cannot be empty")
    .isDate()
    .withMessage("Showtime must be a recognizable javascript date"),
];
const createScreening = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  let { studio_id, movie_id, price, showtime } = req.body;
  let findStudio = await Studio.findById(studio_id);
  if (findStudio == null) {
    return res.status(404).send({ message: "Studio not found" });
  }
  if (findStudio.cineplex != req.userId) {
    return res.status(403).send({ message: "Forbidden" });
  }
  let showtime_date = new Date(showtime).getTime();
  let end = moment().tz("Asia/Jakarta").add(1, "days").endOf("day").toDate();
  if (showtime_date <= end.getTime()) {
    return res
      .status(400)
      .send({ message: "Date must be greater than 2 days from now" });
  }
  const options = {
    method: "GET",
    url: "https://online-movie-database.p.rapidapi.com/title/get-overview-details",
    params: {
      tconst: movie_id,
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.IMDB_API_HOST,
    },
  };
  let movie;
  try {
    movie = await axios.request(options);
    if (movie.data == "" || movie.status == 204) {
      return res.status(404).send({ message: "Film not found" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
  if (movie.data.title.titleType != "movie") {
    return res.status(400).send({ message: "Title is not a movie" });
  }
  let findMovie = await Movie.findById(movie_id);
  if (findMovie != null) {
    const newScreening = new Screening({
      cineplex: findStudio.cineplex,
      branch: findStudio.branch,
      movie: movie_id,
      studio: studio_id,
      price: price,
      showtime: showtime,
    });
    await newScreening.save();
    return res.status(201).send({ message: "Screening created succesfully" });
  }
  const credit_options = {
    method: "GET",
    url: "https://online-movie-database.p.rapidapi.com/title/get-full-credits",
    params: {
      tconst: movie_id,
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.IMDB_API_HOST,
    },
  };
  let movie_credits;
  try {
    movie_credits = await axios.request(credit_options);
    if (movie_credits.data == "" || movie.status == 204) {
      return res.status(404).send({ message: "Film not found" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
  const session = await db.startSession();
  try {
    session.startTransaction();
    let casts = [];
    movie_credits.data.cast.slice(0, 10).map((cast) => {
      casts.push({
        _id: cast.id.split("/")[2],
        cast_name: cast.name,
        img: cast?.image?.url,
      });
    });
    const newMovie = new Movie({
      _id: movie_id,
      title: movie.data.title.title,
      img: movie.data.title.image.url,
      synopsis: movie.data.plotOutline.text,
      age_rating: movie.data.certificates?.US[0].certificate,
      runtime_minutes: movie.data.title.runningTimeInMinutes,
      director: {
        _id: movie_credits.data.crew.director[0].id.split("/")[2],
        director_name: movie_credits.data.crew.director[0].name,
        img: movie_credits.data.crew.director[0]?.image.url,
      },
      casts: casts,
    });
    await newMovie.save();
    const newScreening = new Screening({
      cineplex: findStudio.cineplex,
      branch: findStudio.branch,
      movie: movie_id,
      studio: studio_id,
      price: price,
      showtime: showtime,
    });
    await newScreening.save();
    await session.commitTransaction();
    return res.status(201).send({ message: "Screening created succesfully" });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: error.message });
  }
};
const getBranch = async (req, res) => {
  const branches = await Branch.find({ cineplex: req.userId });
  res.status(200).json({ branches });
};
const getScreening = async (req, res) => {
  const screenings = await Screening.find({ cineplex: req.userId });
  res.status(200).json({ screenings });
};
const getPromo = async (req, res) => {
  const promos = await Promotion.find({ cineplex: req.userId });
  res.status(200).json({ promos });
};
const getMenu = async (req, res) => {
  const menus = await Menu.find({ cineplex: req.userId });
  res.status(200).json({ menus });
};
const getStudio = async (req, res) => {
  const studios = await Studio.find({ cineplex: req.userId });
  res.status(200).json({ studios });
};
module.exports = {
  verifyCineplexCookie,
  createBranch,
  createPromo,
  createMenu,
  createStudio,
  validateCreateStudio,
  createScreening,
  validateCreateScreening,
  getBranch,
  getScreening,
  getPromo,
  getMenu,
  getStudio,
};
