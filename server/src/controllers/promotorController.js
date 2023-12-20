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
const { ObjectId } = require("mongodb");
const Promotion = require("../models/Promotion");
const Menu = require("../models/Menu");
const Event = require("../models/Event");
const EventCategory = require("../models/EventCategory");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const MovieTicket = require("../models/MovieTicket");
const EventTicket = require("../models/EventTicket");

const verifyPromotorCookie = async (req, res, next) => {
  try {
    const token = req.cookies.magneticket_token;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized kalo tidak ada cookie aktif" });
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (verified.role != "PROMOTOR") {
      return res
        .status(403)
        .json({ message: "Forbidden BUKAN AKUN AKUN PROMOTOR HEHEH" });
    }
    req.userId = verified.userId;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

let storage_event = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/promotor"));
  },

  filename: function (req, file, cb) {
    let filename = file.fieldname + "_" + file.originalname;
    cb(null, filename);
  },
});
let upload_event = multer({
  storage: storage_event,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype != "image/jpg" &&
      file.mimetype != "image/jpeg" &&
      file.mimetype != "image/png"
    ) {
      return cb(new Error("Invalid file format"), null);
    }
    cb(null, true);
  },
});
let createEventMulter = upload_event.fields([
  { name: "surat", maxCount: 1 },
  { name: "banner", maxCount: 1 },
  { name: "poster", maxCount: 1 },
  { name: "informasiKategori", maxCount: 1 },
]);

const createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  let { nama, venue, tanggal, deskripsi, kategori, address, kota } = req.body;
  let arrKategori = JSON.parse(kategori);

  if (!req.files?.surat) {
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/promotor/${req.files.surat[0].filename}`
      )
    );
    return res.status(400).send({ message: "Image must be included" });
  }
  if (!errors.isEmpty()) {
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/promotor/${req.files.surat[0].filename}`
      )
    );
    return res.status(400).send({ errors: errors.array() });
  }

  if (!req.files?.informasiKategori) {
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/promotor/${req.files.informasiKategori[0].filename}`
      )
    );
    return res.status(400).send({ message: "Image must be included" });
  }
  if (!errors.isEmpty()) {
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/promotor/${req.files.informasiKategori[0].filename}`
      )
    );
    return res.status(400).send({ errors: errors.array() });
  }

  if (!req.files?.poster) {
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/promotor/${req.files.poster[0].filename}`
      )
    );
    return res.status(400).send({ message: "Image must be included" });
  }
  if (!errors.isEmpty()) {
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/promotor/${req.files.poster[0].filename}`
      )
    );
    return res.status(400).send({ errors: errors.array() });
  }

  if (!req.files?.banner) {
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/promotor/${req.files.banner[0].filename}`
      )
    );
    return res.status(400).send({ message: "Image must be included" });
  }
  if (!errors.isEmpty()) {
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/promotor/${req.files.banner[0].filename}`
      )
    );
    return res.status(400).send({ errors: errors.array() });
  }

  let newEvent = new Event({
    promotor: req.userId,
    event_name: nama,
    event_description: deskripsi,
    venue: venue,
    address: address,
    city: kota,
    showtime: new Date(tanggal),
    sale_end_date: new Date(tanggal),
  });

  fs.renameSync(
    path.join(
      __dirname,
      `../../uploads/promotor/${req.files.surat[0].filename}`
    ),
    path.join(
      __dirname,
      `../../uploads/promotor/eventsurat-${newEvent._id}.jpg`
    )
  );

  fs.renameSync(
    path.join(
      __dirname,
      `../../uploads/promotor/${req.files.informasiKategori[0].filename}`
    ),
    path.join(__dirname, `../../uploads/promotor/eventzona-${newEvent._id}.jpg`)
  );

  fs.renameSync(
    path.join(
      __dirname,
      `../../uploads/promotor/${req.files.poster[0].filename}`
    ),
    path.join(
      __dirname,
      `../../uploads/promotor/eventposter-${newEvent._id}.jpg`
    )
  );

  fs.renameSync(
    path.join(
      __dirname,
      `../../uploads/promotor/${req.files.banner[0].filename}`
    ),
    path.join(
      __dirname,
      `../../uploads/promotor/eventbanner-${newEvent._id}.jpg`
    )
  );

  await newEvent.save();

  for (let i = 0; i < arrKategori.length; i++) {
    const newKategori = new EventCategory({
      event: newEvent._id,
      category_name: arrKategori[i].namaKategori,
      price: arrKategori[i].hargaTiket,
      slot: arrKategori[i].slotTiket,
    });

    await newKategori.save();
  }

  // return res.status(201).send({
  //   message: "Event created",
  //   newEvent: newEvent
  // });
};
const getEventTicket = async (req, res) => {
  const eventTickets = await EventTicket.find({ promotor: req.userId })
    .populate("event")
    .populate("event_category")
    .populate("customer")
    .populate("transaction");

  res.status(200).json({ eventTickets });
};
const getAPIKey = async (req, res) => {
  return res.status(200).send({ api_key: req.userId });
};
const getSingleEventTicket = async (req, res) => {
  try {
    const eventTicket = await EventTicket.findById(req.params.id)
      .populate("promotor")
      .populate("event")
      .populate("event_category")
      .populate("customer")
      .populate("transaction");

    if (!eventTicket) {
      return res.status(404).json({ error: "EventTicket not found" });
    }
    res.status(200).json({ eventTicket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllEvents = async (req, res) => {
  const promotorId = req.userId;
  try {
    const eventsByPromotor = await Event.find({ promotor: promotorId });
    res.status(200).json({ events: eventsByPromotor });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const eventTicket = await Event.findById(req.params.id);

    if (!eventTicket) {
      return res.status(404).json({ error: "EventTicket not found" });
    }
    res.status(200).json({ eventTicket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getKategoriEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const kategoriTickets = await EventCategory.findByEvent(eventId);

    if (kategoriTickets.length === 0) {
      return res
        .status(404)
        .json({ error: "No categories found for the event" });
    }

    res.status(200).json({ kategoriTickets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getEventTicket };

module.exports = {
  verifyPromotorCookie,
  createEvent,
  createEventMulter,
  getEventTicket,
  getSingleEventTicket,
  getAllEvents,
  getSingleEvent,
  getKategoriEvent,
  getAPIKey,
};
