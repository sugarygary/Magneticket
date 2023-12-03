const { ObjectId } = require("mongodb");
const Branch = require("../models/Branch");
const Movie = require("../models/Movie");
const Screening = require("../models/Screening");
const moment = require("moment-timezone");
const Cineplex = require("../models/Cineplex");
const Event = require("../models/Event");
const Promotor = require("../models/Promotor");
const EventCategory = require("../models/EventCategory");
const EventTicket = require("../models/EventTicket");
const { isValidObjectId } = require("mongoose");

require("dotenv").config();
const getNowShowingMovie = async (req, res) => {
  let start = moment().tz("Asia/Jakarta").startOf("day").toDate();
  let end = moment().tz("Asia/Jakarta").endOf("day").toDate();
  let jadwal = await Screening.aggregate()
    .match({ showtime: { $gte: start, $lt: end } })
    .group({ _id: "$movie" })
    .lookup({
      from: "movies",
      localField: "_id",
      foreignField: "_id",
      as: "movie",
    })
    .unwind("$movie")
    .project({ _id: 0, movie: 1 });
  return res.status(200).send(jadwal);
};
const getPresales = async (req, res) => {
  let start = moment()
    .tz("Asia/Jakarta")
    .add(1, "days")
    .startOf("day")
    .toDate();
  let jadwal = await Screening.aggregate()
    .match({ showtime: { $gte: start } })
    .group({ _id: "$movie" })
    .lookup({
      from: "movies",
      localField: "_id",
      foreignField: "_id",
      as: "movie",
    })
    .unwind("$movie")
    .project({ _id: 0, movie: 1 });
  return res.status(200).send(jadwal);
};
const getBranch = async (req, res) => {
  let { cineplex, city } = req.query;
  let options = {};

  if (city) {
    options.city = city;
  }

  if (cineplex) {
    options.cineplex = cineplex;
  }
  if (!city && !cineplex) {
    let result = await Branch.find();
    return res.status(200).send(result);
  } else {
    let result = await Branch.find({ ...options });
    return res.status(200).send(result);
  }
};
const getCineplex = async (req, res) => {
  let result = await Cineplex.find({}, { _id: 1, brand_name: 1 });
  return res.status(200).send(result);
};
const getScreeningByBranch = async (req, res) => {
  let { branch_id } = req.params;
  let { date } = req.query;
  let options;
  if (date) {
    let start = moment(date).tz("Asia/Jakarta").startOf("day").toDate();
    let end = moment(date).tz("Asia/Jakarta").endOf("day").toDate();
    options = { showtime: { $gte: start, $lte: end } };
  }
  let findBranch = await Branch.findById(branch_id);
  if (findBranch == null) {
    return res.status(404).send({ message: "Branch not found" });
  }
  let result = await Screening.aggregate([
    { $match: { branch: new ObjectId(branch_id), ...options } },
    {
      $match: {
        showtime: {
          $gte: moment().tz("Asia/Jakarta").startOf("day").toDate(),
        },
      },
    },
    {
      $lookup: {
        from: "movies",
        localField: "movie",
        foreignField: "_id",
        as: "movie",
      },
    },
    {
      $group: {
        _id: "$movie._id",
        title: { $first: "$movie.title" },
        img: { $first: "$movie.img" },
        age_rating: { $first: "$movie.age_rating" },
        runtime_minutes: { $first: "$movie.runtime_minutes" },
        screenings: { $push: { screening_id: "$_id", showtime: "$showtime" } },
      },
    },
    {
      $project: {
        _id: 0,
        title: { $arrayElemAt: ["$title", 0] },
        age_rating: { $arrayElemAt: ["$age_rating", 0] },
        img: { $arrayElemAt: ["$img", 0] },
        runtime_minutes: { $arrayElemAt: ["$runtime_minutes", 0] },
        screenings: {
          $sortArray: { input: "$screenings", sortBy: { showtime: 1 } },
        },
      },
    },
  ]);
  return res
    .status(200)
    .send({ branch_name: findBranch.branch_name, screenings: result });
};
const getScreeningByMovie = async (req, res) => {
  let { movie_id } = req.params;
  let { date, city } = req.query;
  let options = {};
  let optionsCity = {};
  if (date) {
    let start = moment(date).tz("Asia/Jakarta").startOf("day").toDate();
    let end = moment(date).tz("Asia/Jakarta").endOf("day").toDate();
    options = { showtime: { $gte: start, $lte: end } };
  }
  if (city) {
    optionsCity = { city: city };
  }
  let result = await Screening.aggregate([
    { $match: { movie: movie_id, ...options } },
    {
      $match: {
        showtime: {
          $gte: moment().tz("Asia/Jakarta").startOf("day").toDate(),
        },
      },
    },
    {
      $lookup: {
        from: "branches",
        localField: "branch",
        foreignField: "_id",
        as: "branch",
      },
    },
    {
      $group: {
        _id: "$branch._id",
        branch_name: { $first: "$branch.branch_name" },
        city: { $first: "$branch.city" },
        screenings: { $push: { screening_id: "$_id", showtime: "$showtime" } },
      },
    },
    { $match: { ...optionsCity } },
    {
      $project: {
        _id: 0,
        branch_name: { $arrayElemAt: ["$branch_name", 0] },
        city: { $arrayElemAt: ["$city", 0] },
        screenings: {
          $sortArray: { input: "$screenings", sortBy: { showtime: 1 } },
        },
      },
    },
  ]);
  return res.status(200).send(result);
};
const getMovieDetails = async (req, res) => {
  let movie_id = req.params.movie_id;
  let movie_details = await Movie.findById(movie_id);
  if (movie_details == null) {
    return res.status(404).send({ message: "Movie not found" });
  }
  return res.status(200).send(movie_details);
};

const getOngoingEvent = async (req, res) => {
  // const { city } = req.query;//harusnya ini
  const city = ""; // Assuming city is defined somewhere

  let matchStage = {};
  if (city) {
    matchStage = { city: city };
  }

  try {
    let result = await Event.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "promotors",
          localField: "promotor",
          foreignField: "_id",
          as: "promotorData",
        },
      },
      { $unwind: "$promotorData" }, // If promotor field is an array, unwind it
      {
        $group: {
          _id: "$promotorData._id",
          promotor_name: { $first: "$promotorData.promotor_name" },
          city: { $first: "$city" },
          events: {
            $push: {
              event_id: "$_id",
              event_name: "$event_name",
              event_img: "$event_img",
              event_start: "$event_start",
              event_end: "$event_end",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          promotor_name: 1,
          city: 1,
          events: 1,
        },
      },
    ]);

    // Event.populate(result, { path: "events" });

    // result=result.populate("events.event_id", "event_name event_img event_start event_end");
    return res.status(200).send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
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

module.exports = {
  getNowShowingMovie,
  getMovieDetails,
  getBranch,
  getScreeningByBranch,
  getScreeningByMovie,
  getCineplex,
  getOngoingEvent,
  getSingleEvent,
  getSingleEventCategory,
  getPresales,
};
