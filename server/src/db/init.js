const Branch = require("../models/Branch");
const Cineplex = require("../models/Cineplex");
const Movie = require("../models/Movie");
const Screening = require("../models/Screening");
const MovieTicket = require("../models/MovieTicket");
const Review = require("../models/Review");
const Seat = require("../models/Seat");
const Studio = require("../models/Studio");
const User = require("../models/User");

module.exports = async () => {
  User.createCollection().then(() => console.log("User collection synced"));
  Cineplex.createCollection().then(() =>
    console.log("Cineplex collection synced")
  );
  Branch.createCollection().then(() => console.log("Branch collection synced"));
  Studio.createCollection().then(() => console.log("Studio collection synced"));
  Movie.createCollection().then(() => console.log("Movie collection synced"));
  Screening.createCollection().then(() =>
    console.log("Screening collection synced")
  );
  Review.createCollection().then(() => console.log("Review collection synced"));
  Seat.createCollection().then(() => console.log("Seat collection synced"));
  MovieTicket.createCollection().then(() =>
    console.log("Movie Ticket collection synced")
  );
};
