const { ObjectId } = require("mongodb");
const Branch = require("../models/Branch");
const Movie = require("../models/Movie");
const Screening = require("../models/Screening");
const moment = require("moment-timezone");

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
const getBranch = async (req, res) => {
  let { cineplex, city } = req.query;
  let options;
  if (city) {
    options.city = city;
  }
  if (cineplex) {
    options.cineplex = cineplex;
  }
  let result = await Branch.find({ ...options });
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
  let result = await Screening.aggregate([
    { $match: { branch: new ObjectId(branch_id), ...options } },
    { $match: { showtime: { $gte: new Date() } } },
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
        runtime_minutes: { $first: "$movie.runtime_minutes" },
        screenings: { $push: { screening_id: "$_id", showtime: "$showtime" } },
      },
    },
    {
      $project: {
        _id: 0,
        title: { $arrayElemAt: ["$title", 0] },
        img: { $arrayElemAt: ["$img", 0] },
        runtime_minutes: { $arrayElemAt: ["$runtime_minutes", 0] },
        screenings: {
          $sortArray: { input: "$screenings", sortBy: { showtime: 1 } },
        },
      },
    },
  ]);
  return res.status(200).send(result);
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
    { $match: { showtime: { $gte: new Date() } } },
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

module.exports = {
  getNowShowingMovie,
  getMovieDetails,
  getBranch,
  getScreeningByBranch,
  getScreeningByMovie,
};
