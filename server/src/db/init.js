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
const Menu = require("../models/Menu");
const MovieTransaction = require("../models/MovieTransaction");
const Promotion = require("../models/Promotion");
const Event = require("../models/Event");
const EventCategory = require("../models/EventCategory");
const EventTicket = require("../models/EventTicket");
const Promotor = require("../models/Promotor");
const EventTransaction = require("../models/EventTransaction");
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
  Menu.createCollection().then(() => console.log("Menu collection synced"));
  Promotion.createCollection().then(() =>
    console.log("Promotion collection synced")
  );
  Event.createCollection().then(() => console.log("Event collection synced"));
  EventCategory.createCollection().then(() =>
    console.log("Event Category collection synced")
  );
  EventTicket.createCollection().then(() =>
    console.log("Event Ticket collection synced")
  );
  EventTransaction.createCollection().then(() =>
    console.log("Event Ticket collection synced")
  );
  Promotor.createCollection().then(() =>
    console.log("Promotor collection synced")
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
    brand_name: "CGV Cinema 2",
    email: "cgv2@gmail.com",
    password: "cgv",
    activated: true,
    verified: true,
  });
  let newPromotor = new Promotor({
    company_name: "PT. Puh Kee Entertainment",
    brand_name: "PK Entertainment",
    email: "pk2@pk.com",
    password: "pk",
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
  let newEvent = new Event({
    promotor: new ObjectId("6554a1d0fe889c9fef5aa52a"),
    event_name: "Coldplay | Music of the Spheres",
    event_description: "Hello World",
    venue: "Gelora Bung Karno Stadium",
    address: "Jalan Gelora Bung Karno Jakarta",
    city: "JAKARTA",
    sale_end_date: new Date() + 1000 * 3600 + 24 * 30,
    showtime: new Date() + 1000 * 3600 + 24 * 60,
    verified: true,
  });
  let newEventCategory = new EventCategory({
    category_name: "VIP+",
    event: new ObjectId("6554a61ced32f3821f68f81e"),
    price: 12000000,
    slot: 300,
  });
  let newEventTrans = new EventTransaction({
    customer_id: new ObjectId("654ef289161f8e8b691975a6"),
    customer_name: "Gary Trisanto",
    customer_email: "Abc@gmail.com",
    amounts_paid: 2500000,
    payment_method: "MANDIRI",
    promotor: new ObjectId("6554a1d0fe889c9fef5aa52a"),
    promotor_brand: "PK Entertainment",
    event_name: "Coldplay | Music of the Spheres",
    event_category_name: "VIP+",
  });
  let newEventTicket = new EventTicket({
    customer: new ObjectId("654ef289161f8e8b691975a6"),
    promotor: new ObjectId("6554a1d0fe889c9fef5aa52a"),
    event: new ObjectId("6554a61ced32f3821f68f81e"),
    event_category: new ObjectId("6554a72d7dacd2f010305298"),
    transaction: new ObjectId("6554aa8a06278eeaae23e77c"),
  });
  let newStudio = new Studio({
    branch: new ObjectId("654ef2d439a17ddd07fe6b55"),
    cineplex: new ObjectId("654e0c198633d758a7d52a5e"),
    studio_name: "Studio 1",
    row: 10,
    seating_layout: "4-6-4",
    type: "IMAX",
  });
  let newSeat = new Seat({
    cineplex: new ObjectId("654e0c198633d758a7d52a5e"),
    studio: new ObjectId("655457da76bc012e335303e9"),
    seat_number: "A01",
  });
  let newReview = new Review({
    reviewer: new ObjectId("654ef289161f8e8b691975a6"),
    movie: "tt1121200120",
    rating: 5,
  });
  let newMenu = new Menu({
    cineplex: new ObjectId("654e0c198633d758a7d52a5e"),
    item_name: "Popcorn Small",
    item_description:
      "Sambut aroma menggoda dan rasa gurih yang meleleh di mulut dengan popcorn asin istimewa kami, dirancang khusus untuk menciptakan pengalaman bioskop yang tak terlupakan. Setiap gigitan adalah perpaduan sempurna antara renyah dan lembut, dihasilkan dari biji jagung berkualitas terbaik yang diproses dengan hati-hati.  ",
    price: 60000,
  });
  let newPromotion = new Promotion({
    cineplex: new ObjectId("654ef289161f8e8b691975a7"),
    discount_amount: 20000,
    minimum_transaction: 100000,
    promo_code: "SDPBahagia",
    valid_until: new Date() + 1000 * 3600 * 24 * 30,
  });
  let newMovieTransaction = new MovieTransaction({
    cineplex_brand: "CGV Cinema",
    cineplex_id: new ObjectId("654ef289161f8e8b691975a7"),
    customer_email: "Abc@gmail.com",
    customer_id: new ObjectId("654ef289161f8e8b691975a6"),
    customer_name: "Gary Trisanto",
    movie_title: "Ini Film",
    movie_id: "tt1121200120",
    amounts_paid: 150000,
    branch_name: "CGV Marvell",
    studio_name: "Studio 1",
    seats: ["A01"],
    foods: [{ food_name: "Popcorn Small", quantity: 2 }],
    payment_method: "BCA",
  });
  let newTicket = new MovieTicket({
    cineplex: new ObjectId("654ef289161f8e8b691975a7"),
    customer: new ObjectId("654ef289161f8e8b691975a6"),
    screening: new ObjectId("654ef289161f8e8b691975a7"),
    seats: [new ObjectId("655459dc2ba529082a99066a")],
    foods: [{ food_id: new ObjectId("655471c80e9c07c7aac4b515"), quantity: 2 }],
    transaction: new ObjectId("65547b73694770fed318577b"),
  });
  try {
    // await newUser.save().catch(function (err) {
    //   console.log(err);
    // });
    // await newMov.save().catch(function (err) {
    //   console.log(err);
    // });
    // await newCineplex.save().catch(function (err) {
    //   console.log(err);
    // });
    // await newPromotor.save().catch(function (err) {
    //   console.log(err);
    // });
    // await newScreening.save().catch(function (err) {
    //   console.log(err);
    // });
    // await newEvent.save().catch(function (err) {
    //   console.log(err);
    // });
    // await newEventCategory.save().catch(function (err) {
    //   console.log(err);
    // });
    // await newEventTrans.save().catch(function (err) {
    //   console.log(err);
    // });
    // await newEventTicket.save().catch(function (err) {
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
    // await newStudio.save().catch(function (err) {
    //   console.log(err);
    // });
    // await newSeat.save().catch(function (err) {
    //   console.log(err);
    // });
    // await newReview.save().catch(function (err) {
    //   console.log(err);
    // });
    // await newMenu.save().catch(function (err) {
    //   console.log(err);
    // });
    // await newPromotion.save().catch(function (err) {
    //   console.log(err);
    // });
    // await newMovieTransaction.save().catch(function (err) {
    //   console.log(err);
    // });
    // await newTicket.save().catch(function (err) {
    //   console.log(err);
    // });
    // }
  } catch (error) {
    console.log(error);
  }
};
