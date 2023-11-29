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
  { name: "informasiKategori", maxCount: 1 }
]);

const createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  let { nama, venue, tanggal, deskripsi, kategori, address, kota } = req.body;
  let arrKategori = JSON.parse(kategori)

  if (!req.files?.surat ) {
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

  if (!req.files?.informasiKategori ) {
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

  if (!req.files?.poster ) {
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

  if (!req.files?.banner ) {
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
    path.join(
      __dirname,
      `../../uploads/promotor/eventzona-${newEvent._id}.jpg`
    )
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
      slot: arrKategori[i].slotTiket
    })

    await newKategori.save()
  }

  // return res.status(201).send({
  //   message: "Event created",
  //   newEvent: newEvent
  // });
};

module.exports = {
  verifyPromotorCookie, createEvent, createEventMulter
};
