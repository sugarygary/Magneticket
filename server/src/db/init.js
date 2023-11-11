const Branch = require("../models/Branch");
const Cineplex = require("../models/Cineplex");
const Movie = require("../models/Movie");
const Screening = require("../models/Screening");
const MovieTicket = require("../models/MovieTicket");
const Review = require("../models/Review");
const Seat = require("../models/Seat");
const Studio = require("../models/Studio");
const User = require("../models/User");
const { ObjectId } = require("mongodb");

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
  let newUser = new User({
    email: "Abc@gmail.com",
    password: "inipassword",
    full_name: "Gary Trisanto",
  });
  let newMov = new Movie({
    _id: "tt1121200120",
    title: "Ini Film",
    img: "inimg",
    synopsis: "blbalbalblalbal",
    rating: "R-17",
    runtime_minutes: 123,
    director: {
      _id: "namamcsmasmc",
      director_name: "Steven Spielberg",
      img: "img",
    },
    casts: [
      {
        _id: "andiasnsidn",
        cast_name: "Leo Dicaprio",
        img: "wdoqokd",
      },
      {
        _id: "andiasasasnsidn",
        cast_name: "Leo Dicaprio2",
        img: "wdoqokd",
      },
    ],
  });
  let newCineplex = new Cineplex({
    company_name: "PT Cahaya Guntur Vivalavida",
    brand_name: "CGV Cinema",
    email: "cgv@gmail.com",
    password: "cgv",
    activated: true,
    verified: true,
  });
  let newScreening = new Screening({
    cineplex: new ObjectId("654ef289161f8e8b691975a7"),
    movie: "TTTTT",
    price: 50000,
    showtime: new Date(),
    studio: new ObjectId("654ef289161f8e8b691975a7"),
  });
  // try {
  // await newUser.save().catch(function (err) {
  //   console.log(err);
  // });
  // await newMov.save().catch(function (err) {
  //   console.log(err);
  // });
  // await newCineplex.save().catch(function (err) {
  //   console.log(err);
  // });
  // await newScreening.save().catch(function (err) {
  //   console.log(err);
  // });
  // let findCineplex = await Cineplex.findOne({ email: "cgv@gmail.com" });
  // if (findCineplex !== null) {
  //   let newBranch = new Branch({
  //     cineplex: new ObjectId("654e0c198633d758a7d52a5e"),
  //     branch_name: "CGV Marvell",
  //     address: "Ngagel Jaya Tengah",
  //     city: "Surbabaya",
  //   });
  // await newBranch.save().catch(function (err) {
  //   console.log(err);
  // });
  // }
  // } catch (error) {
  //   console.log(error);
  // }
};
