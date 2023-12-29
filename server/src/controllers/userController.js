require("dotenv").config();
const { nanoid, customAlphabet } = require("nanoid");
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
const Event = require("../models/Event");
const EventCategory = require("../models/EventCategory");
const EventTicket = require("../models/EventTicket");
const Review = require("../models/Review");
const { ObjectId } = require("mongodb");
const EventTransaction = require("../models/EventTransaction");
const Promotor = require("../models/Promotor");
const moment = require("moment-timezone");
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
    movie_img: findScreening.movie.img,
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
function generateTransactionId() {
  const timestamp = new Date().getTime();
  const transactionId = `CPX${timestamp}-${customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    8
  )()}`;
  return transactionId;
}
function generateTransactionIdEvent() {
  const timestamp = new Date().getTime();
  const transactionId = `EVX${timestamp}-${customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    8
  )()}`;
  return transactionId;
}

const createSnap = async (req, res) => {
  const { foods, seats, screening_id, discount_amount } = req.body;
  const findScreening = await Screening.findById(screening_id);
  if (findScreening == null) {
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
  let foodTotal = 0;
  for (let i = 0; i < foods.length; i++) {
    const element = foods[i];
    let findFood = await Menu.findOne({
      _id: element._id,
      cineplex: findScreening.cineplex,
    });
    if (findFood == null) {
      return res.status(400).send({ message: "Invalid addon input" });
    }
    foodTotal += findFood.price * element.quantity;
  }
  let customer = await User.findById(req.userId);
  let amounts_paid = 0;
  if (discount_amount != 0) {
    amounts_paid =
      findScreening.price * seats.length +
      foodTotal +
      4000 * findSeats.length -
      discount_amount;
  } else {
    amounts_paid = findScreening.price * seats.length + foodTotal + 4000;
  }
  let order_id = generateTransactionId();
  let midtrans = await axios.post(
    "https://app.sandbox.midtrans.com/snap/v1/transactions",
    {
      transaction_details: {
        order_id: order_id,
        gross_amount: amounts_paid,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: customer.email,
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
    return res.status(201).send({
      message: "Order created. Please pay.",
      order_id: order_id,
      ...midtrans.data,
    });
  }
  return;
};
const createSnapEvent = async (req, res) => {
  const { event_category, quantity } = req.body;
  const findEventCategory = await EventCategory.findById(event_category);
  if (findEventCategory == null) {
    return res.status(404).send({ message: "Category not found" });
  }
  const findEvent = await Event.findOne({
    _id: findEventCategory.event,
    verified: true,
  });
  if (findEvent == null) {
    return res.status(404).send({ message: "Event not found" });
  }
  if (findEvent.sale_end_date < new Date()) {
    return res.status(404).send({ message: "Event not found" });
  }
  if (findEventCategory.slot < quantity) {
    return res.status(400).send({ message: "Not enough slot" });
  }
  let customer = await User.findById(req.userId);
  let amounts_paid = 0;
  amounts_paid = findEventCategory.price * quantity + 10000*quantity;
  let order_id = generateTransactionIdEvent();
  let midtrans = await axios.post(
    "https://app.sandbox.midtrans.com/snap/v1/transactions",
    {
      transaction_details: {
        order_id: order_id,
        gross_amount: amounts_paid,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: customer.email,
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
    return res.status(201).send({
      message: "Order created. Please pay.",
      order_id: order_id,
      ...midtrans.data,
    });
  }
  return;
};
const createTicket = async (req, res) => {
  const {
    foods,
    seats,
    screening_id,
    discount_amount,
    order_id,
    status,
    midtrans_token,
    promo_code,
  } = req.body;
  const findScreening = await Screening.findById(screening_id);
  if (findScreening == null) {
    return res.status(404).send({ message: "Screening not found" });
  }
  const findSeats = await Seat.find({
    studio: findScreening.studio,
    _id: { $in: seats },
  });
  if (findSeats.length != seats.length) {
    return res.status(400).send({ message: "Invalid seat input" });
  }

  let foodItems = [];
  let foodTickets = [];
  let foodTotal = 0;
  for (let i = 0; i < foods.length; i++) {
    const element = foods[i];
    let findFood = await Menu.findOne({
      _id: element._id,
      cineplex: findScreening.cineplex,
    });
    if (findFood == null) {
      return res.status(400).send({ message: "Invalid addon input" });
    }
    foodItems.push({
      food_name: findFood.item_name,
      food_price: findFood.price,
      quantity: element.quantity,
    });
    foodTickets.push({
      food_id: element._id,
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
  let promo = null;
  if (discount_amount != 0) {
    promo = { promo_code, discount_amount };
    amounts_paid =
      findScreening.price * seats.length +
      foodTotal +
      4000 * findSeats.length -
      discount_amount;
  } else {
    amounts_paid =
      findScreening.price * seats.length + foodTotal + 4000 * findSeats.length;
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
    if (status == "SUCCESS") {
      let refund = await axios.post(
        `https://api.sandbox.midtrans.com/v2/${order_id}/refund`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: process.env.MIDTRANS_AUTH_STRING,
          },
        }
      );
      let newMovieTransaction = new MovieTransaction({
        _id: order_id,
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
        status: "REFUND",
        midtrans_token: midtrans_token,
        price_per_seat: findScreening.price,
        studio_type: findStudio.type,
        promo,
      });
      await newMovieTransaction.save();
      return res.status(201).send({
        message: "Created",
        order_id: newMovieTransaction._id,
      });
    }
    if (status == "PENDING") {
      let cancel = await axios.post(
        `https://api.sandbox.midtrans.com/v2/${order_id}/cancel`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: process.env.MIDTRANS_AUTH_STRING,
          },
        }
      );
      let newMovieTransaction = new MovieTransaction({
        _id: order_id,
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
        status: "FAILED",
        midtrans_token: midtrans_token,
        price_per_seat: findScreening.price,
        studio_type: findStudio.type,
        promo,
      });
      await newMovieTransaction.save();
      return res.status(201).send({
        message: "Created",
        order_id: newMovieTransaction._id,
      });
    }
  }
  let newMovieTransaction = new MovieTransaction({
    _id: order_id,
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
    status: status,
    midtrans_token: midtrans_token,
    price_per_seat: findScreening.price,
    studio_type: findStudio.type,
    promo,
  });
  await newMovieTransaction.save();
  if (status == "FAILED") {
    return res.status(201).send({
      message: "Created",
      order_id: newMovieTransaction._id,
    });
  }
  let newTicket = new MovieTicket({
    cineplex: findCineplex._id,
    customer: customer._id,
    screening: findScreening._id,
    seats: seats,
    foods: foodTickets,
    transaction: newMovieTransaction._id,
  });
  await newTicket.save();
  return res.status(201).send({
    message: "Created",
    order_id: newMovieTransaction._id,
  });
};
const createTicketEvent = async (req, res) => {
  const { quantity, event_category, order_id, status, midtrans_token } =
    req.body;
  const findEventCategory = await EventCategory.findById(event_category);
  if (findEventCategory == null) {
    return res.status(404).send({ message: "Category not found" });
  }
  const findEvent = await Event.findOne({
    _id: findEventCategory.event,
  });
  let customer = await User.findById(req.userId);
  let amounts_paid = 0;
  amounts_paid = findEventCategory.price * quantity + 10000;
  let findPromotor = await Promotor.findById(findEvent.promotor);
  if (findEventCategory.slot < quantity) {
    if (status == "SUCCESS") {
      let refund = await axios.post(
        `https://api.sandbox.midtrans.com/v2/${order_id}/refund`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: process.env.MIDTRANS_AUTH_STRING,
          },
        }
      );
      let newEventTransaction = new EventTransaction({
        _id: order_id,
        promotor: findEvent.promotor,
        promotor_brand: findPromotor.brand_name,
        event_name: findEvent.event_name,
        event_category_name: findEventCategory.category_name,
        price_per_seat: findEventCategory.price,
        customer_email: customer.email,
        customer_id: customer._id,
        customer_name: customer.full_name,
        amounts_paid: amounts_paid,
        payment_method: "-",
        status: "REFUND",
        quantity: quantity,
        event_id: findEvent._id,
        venue: findEvent.venue,
        midtrans_token: midtrans_token,
      });
      await newEventTransaction.save();
      return res.status(201).send({
        message: "Created",
        order_id: newEventTransaction._id,
      });
    }
    if (status == "PENDING") {
      let cancel = await axios.post(
        `https://api.sandbox.midtrans.com/v2/${order_id}/cancel`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: process.env.MIDTRANS_AUTH_STRING,
          },
        }
      );
      let newEventTransaction = new EventTransaction({
        _id: order_id,
        promotor: findEvent.promotor,
        promotor_brand: findPromotor.brand_name,
        event_name: findEvent.event_name,
        event_category_name: findEventCategory.category_name,
        price_per_seat: findEventCategory.price,
        customer_email: customer.email,
        customer_id: customer._id,
        customer_name: customer.full_name,
        amounts_paid: amounts_paid,
        payment_method: "-",
        status: "FAILED",
        quantity: quantity,
        event_id: findEvent._id,
        venue: findEvent.venue,
        midtrans_token: midtrans_token,
      });
      await newEventTransaction.save();
      return res.status(201).send({
        message: "Created",
        order_id: newEventTransaction._id,
      });
    }
  }
  let newEventTransaction = new EventTransaction({
    _id: order_id,
    promotor: findEvent.promotor,
    promotor_brand: findPromotor.brand_name,
    event_name: findEvent.event_name,
    event_category_name: findEventCategory.category_name,
    price_per_seat: findEventCategory.price,
    customer_email: customer.email,
    customer_id: customer._id,
    customer_name: customer.full_name,
    amounts_paid: amounts_paid,
    payment_method: "-",
    status: status,
    quantity: quantity,
    event_id: findEvent._id,
    venue: findEvent.venue,
    midtrans_token: midtrans_token,
  });
  await newEventTransaction.save();
  if (status == "FAILED") {
    return res.status(201).send({
      message: "Created",
      order_id: newEventTransaction._id,
    });
  }

  for (let i = 0; i < quantity; i++) {
    let newTicket = new EventTicket({
      promotor: findPromotor._id,
      customer: customer._id,
      event: findEvent._id,
      event_category: findEventCategory._id,
      transaction: newEventTransaction._id,
    });
    await newTicket.save();
  }
  
  await findEventCategory.save();
  return res.status(201).send({
    message: "Created",
    order_id: newEventTransaction._id,
  });
};

const getHistory = async (req, res) => {
  let findHistory = await MovieTransaction.find({
    customer_id: req.userId,
  })
    .sort({ createdAt: -1 })
    .lean();
  let findEventHistory = await EventTransaction.find({
    customer_id: req.userId,
  })
    .sort({ createdAt: -1 })
    .lean();
  let allHistory = [];
  findHistory.forEach((movie_history) => {
    allHistory.push({ ...movie_history, history_type: "MOVIE" });
  });
  findEventHistory.forEach((event_history) => {
    allHistory.push({ ...event_history, history_type: "EVENT" });
  });
  allHistory.sort(function (a, b) {
    return a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0;
  });
  return res.status(200).send(allHistory);
};
const getTickets = async (req, res) => {
  let findTickets = await MovieTicket.aggregate()
    .match({
      via: "MAGNETICKET",
      customer: new ObjectId(req.userId),
      claimed: false,
    })
    .lookup({
      from: "movie_transactions",
      localField: "transaction",
      foreignField: "_id",
      as: "transaction",
    })
    .lookup({
      from: "seats",
      localField: "seats",
      foreignField: "_id",
      as: "seats",
    })
    .lookup({
      from: "screenings",
      localField: "screening",
      foreignField: "_id",
      as: "screening",
    })
    .unwind("$transaction")
    .unwind("$screening")
    .match({ "transaction.status": "SUCCESS" });
  let findTicketsEvent = await EventTicket.aggregate()
    .match({
      customer: new ObjectId(req.userId),
      claimed: false,
    })
    .lookup({
      from: "event_transactions",
      localField: "transaction",
      foreignField: "_id",
      as: "transaction",
    })
    .lookup({
      from: "events",
      localField: "event",
      foreignField: "_id",
      as: "event",
    })
    .lookup({
      from: "event_categories",
      localField: "event_category",
      foreignField: "_id",
      as: "event_category",
    })
    .unwind("$transaction")
    .unwind("$event")
    .unwind("$event_category")
    .match({ "transaction.status": "SUCCESS" });
  let allTickets = [];
  findTickets.forEach((ticket) => {
    allTickets.push({ ...ticket, ticket_type: "MOVIE" });
  });
  let today = new Date().toISOString();
  findTicketsEvent.forEach((ticket) => {
    let hmin2 = moment(ticket.event.showtime)
      .tz("Asia/Jakarta")
      .subtract(2, "days")
      .startOf("day")
      .toISOString();
    if (today > hmin2) {
      allTickets.push({ ...ticket, ticket_type: "EVENT" });
    }
  });
  const sortByShowtime = (a, b) => {
    const showtimeA = new Date(
      a.screening ? a.screening.showtime : a.event.showtime
    );
    const showtimeB = new Date(
      b.screening ? b.screening.showtime : b.event.showtime
    );
    return showtimeA - showtimeB;
  };
  allTickets.sort(sortByShowtime);
  return res.status(200).send(allTickets);
};

const getDetailHistory = async (req, res) => {
  let findHistory = await MovieTransaction.findById(req.params.history_id);
  if (findHistory == null) {
    return res.status(404).send({ message: "Not Found" });
  }
  if (findHistory.customer_id != req.userId) {
    return res.status(403).send({ message: "Forbidden" });
  }
  return res.status(200).send(findHistory);
};
const getDetailHistoryEvent = async (req, res) => {
  let findHistory = await EventTransaction.findById(req.params.history_id);
  if (findHistory == null) {
    return res.status(404).send({ message: "Not Found" });
  }
  if (findHistory.customer_id != req.userId) {
    return res.status(403).send({ message: "Forbidden" });
  }
  return res.status(200).send(findHistory);
};
const getSingleEvent = async (req, res) => {
  const { event_id } = req.params;
  try {
    let result = await Event.findById(event_id);
    if (!result) {
      return res.status(404).send({ error: "Event not found" });
    }
    return res.status(200).send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};
const getSingleEventCategory = async (req, res) => {
  // let { event_id } = req.params;
  // let temp = await EventTicket.find({event_category:event_id});
  // return res.status(200).send(temp);
  const { event_id } = req.params;
  try {
    let result = await EventCategory.find({ event: event_id });
    let result2 = await Promise.all(
      result.map(async (item) => {
        let booked = await EventTicket.find({ event_category: item._id });
        let ticketLeft = item.slot - booked.length;
        return { ...item._doc, ticketLeft };
      })
    );
    result = result2;
    if (!result) {
      return res.status(404).send({ error: "Event not found" });
    }
    return res.status(200).send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

const getAndUpdateTransactions = async (req, res) => {};

const createReview = async (req, res) => {
  const userId = req.userId;
  const movieId = req.params.movieId;
  const { rating } = req.body;

  try {
    // Check if the movie exists
    const findMovie = await Movie.findById(movieId);
    if (!findMovie) {
      return res.status(404).send({ message: "Movie not found" });
    }
    // Create a new review
    const newReview = new Review({
      reviewer: userId,
      movie: movieId,
      rating: rating,
    });
    // Save the review to the database
    const savedReview = await newReview.save();
    return res
      .status(201)
      .json({ message: "Review created successfully", review: savedReview });
  } catch (error) {
    console.error("Error creating review:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};
const getReview = async (req, res) => {
  let findReview = await Review.findOne({
    reviewer: req.userId,
    movie: req.query.movie_id,
  });
  return res.status(200).send(findReview);
};

module.exports = {
  verifyUserCookie,
  createTicket,
  createTicketEvent,
  createSnap,
  createSnapEvent,
  getSeatsInfo,
  findMenuByScreening,
  findPromoByScreening,
  getHistory,
  getDetailHistory,
  getSingleEvent,
  getSingleEventCategory,
  createReview,
  getReview,
  getTickets,
  getDetailHistoryEvent,
};
