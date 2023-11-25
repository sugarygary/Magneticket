require("dotenv").config();
const jwt = require("jsonwebtoken");
const MovieTicket = require("../models/MovieTicket");
const Screening = require("../models/Screening");
const Seat = require("../models/Seat");
const User = require("../models/User");
const MovieTransaction = require("../models/MovieTransaction");
const Cineplex = require("../models/Cineplex");
const Movie = require("../models/Movie");
const Studio = require("../models/Studio");
const Branch = require("../models/Branch");
const { default: axios } = require("axios");
const Menu = require("../models/Menu");
const Promotion = require("../models/Promotion");

const verifyUserCookie = async (req, res, next) => {
  try {
    const token = req.cookies.magneticket_token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (verified.role != "USER") {
      // res.clearCookie("magneticket_token");
      return res.status(403).json({ message: "Forbidden" });
    }
    let findUser = await User.findById(verified.userId);
    if (findUser == null) {
      return res.status(401).json({ message: "Unauthorized Here" });
    }
    req.userId = verified.userId;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized here" });
  }
};
const getSeatsInfo = async (req, res) => {
  const { screening_id } = req.params;
  const findScreening = await Screening.findById(screening_id)
    .populate("movie")
    .populate("branch");
  if (findScreening == null) {
    return res.status(404).send({ message: "Screening not found" });
  }
  if (findScreening.showtime < new Date()) {
    return res.status(404).send({ message: "Screening not found" });
  }
  const findStudio = await Studio.findById(findScreening.studio);
  const findTicket = await MovieTicket.find({
    screening: screening_id,
  })
    .populate({
      path: "transaction",
      match: {
        $or: [{ status: "PENDING" }, { status: "SUCCESS" }],
      },
    })
    .populate("seats")
    .select({ seats: 1, _id: 0, transaction: 0 });
  let taken_seats = [];
  findTicket.forEach((element) => {
    for (let i = 0; i < element.seats.length; i++) {
      const seat = element.seats[i];
      taken_seats.push({
        _id: seat._id,
        cineplex: seat.cineplex,
        studio: seat.studio,
        seat_number: seat.seat_number,
        __v: seat.__v,
      });
    }
  });
  const allSeat = await Seat.find({ studio: findScreening.studio });
  let takenSeats = taken_seats.map((seat) => seat.seat_number);
  let allSeats = allSeat;
  let seats = allSeats.map((seat) => ({
    _id: seat._id,
    seat_number: seat.seat_number,
    taken: takenSeats.includes(seat.seat_number),
  }));
  return res.status(200).send({
    branch_name: findScreening.branch.branch_name,
    showtime: findScreening.showtime,
    price: findScreening.price,
    movie_title: findScreening.movie.title,
    studio_name: findStudio.studio_name,
    studio_type: findStudio.type,
    seating_layout: findStudio.seating_layout,
    row: findStudio.row,
    seats,
  });
};
const findMenuByScreening = async (req, res) => {
  let { screening_id } = req.params;
  let findScreening = await Screening.findById(screening_id);
  if (findScreening == null) {
    return res.status(404).send({ message: "Screening not found" });
  }
  let findMenu = await Menu.find({ cineplex: findScreening.cineplex });
  return res.status(200).send(findMenu);
};

const findPromoByScreening = async (req, res) => {
  let { screening_id } = req.params;
  let findScreening = await Screening.findById(screening_id);
  if (findScreening == null) {
    return res.status(404).send({ message: "Screening not found" });
  }
  let findPromo = await Promotion.find({ cineplex: findScreening.cineplex });
  return res.status(200).send(findPromo);
};

const createTicket = async (req, res) => {
  const { foods, seats, screening_id, discount_amount } = req.body;
  console.log(discount_amount)
  const findScreening = await Screening.findById(screening_id);
  if (findScreening == null) {
    return res.status(404).send({ message: "Screening not found" });
  }
  if (findScreening.showtime < new Date()) {
    return res.status(404).send({ message: "Screening not found" });
  }
  const findSeats = await Seat.find({
    studio: findScreening.studio,
    _id: { $in: seats },
  });
  if (findSeats.length != seats.length) {
    return res.status(400).send({ message: "Invalid seat input" });
  }
  const findTicket = await MovieTicket.find({
    screening: screening_id,
    seats: { $in: seats },
  }).populate({
    path: "transaction",
    match: {
      $or: [{ status: "PENDING" }, { status: "SUCCESS" }],
    },
  });
  if (findTicket.length > 0) {
    return res.status(400).send({ message: "Seats already booked" });
  }
  let foodItems = [];
  let foodTotal = 0;
  for (let i = 0; i < foods.length; i++) {
    const element = foods[i];
    let findFood = await Menu.findOne({
      _id: element.food_id,
      cineplex: findScreening.cineplex,
    });
    if (findFood == null) {
      return res.status(400).send({ message: "Invalid addon input" });
    }
    foodItems.push({
      food_name: findFood.item_name,
      quantity: element.quantity,
    });
    foodTotal += findFood.price * element.quantity;
  }
  let displaySeats = [];
  findSeats.forEach((seat) => {
    displaySeats.push(seat.seat_number);
  });
  let findCineplex = await Cineplex.findById(findScreening.cineplex);
  let findBranch = await Branch.findById(findScreening.branch);
  let findStudio = await Studio.findById(findScreening.studio);
  let customer = await User.findById(req.userId);
  let movie = await Movie.findById(findScreening.movie);
  let amounts_paid = 0;
  if(discount_amount != 0){
    amounts_paid = findScreening.price * seats.length + foodTotal + 4000 - discount_amount;
    console.log(amounts_paid)
  } else {
    amounts_paid = findScreening.price * seats.length + foodTotal + 4000
  }

  let newMovieTransaction = new MovieTransaction({
    cineplex_brand: findCineplex.brand_name,
    cineplex_id: findCineplex._id,
    customer_email: customer.email,
    customer_id: customer._id,
    customer_name: customer.full_name,
    movie_title: movie.title,
    movie_id: movie._id,
    movie_img: movie.img,
    amounts_paid: amounts_paid,
    branch_name: findBranch.branch_name,
    studio_name: findStudio.studio_name,
    seats: displaySeats,
    foods: foodItems,
    payment_method: "-",
  });
  let midtrans = await axios.post(
    "https://app.sandbox.midtrans.com/snap/v1/transactions",
    {
      transaction_details: {
        order_id: newMovieTransaction._id,
        gross_amount: newMovieTransaction.amounts_paid,
      },
      credit_card: {
        secure: true,
      },
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: process.env.MIDTRANS_AUTH_STRING,
      },
    }
  );
  if (midtrans.data.token) {
    newMovieTransaction.midtrans_token = midtrans.data.token;
  }
  await newMovieTransaction.save();
  let newTicket = new MovieTicket({
    cineplex: findCineplex._id,
    customer: customer._id,
    screening: findScreening._id,
    seats: seats,
    foods: foods,
    transaction: newMovieTransaction._id,
  });
  await newTicket.save();
  return res
    .status(201)
    .send({ message: "Order created. Please pay.", ...midtrans.data });
};
const getAndUpdateTransactions = async (req, res) => {};

module.exports = {
  verifyUserCookie,
  createTicket,
  getSeatsInfo,
  findMenuByScreening,
  findPromoByScreening
};
