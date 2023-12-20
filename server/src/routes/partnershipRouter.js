require("dotenv").config();
const express = require("express");
const partnershipRouter = express.Router();
const expressAsyncHandler = require("express-async-handler");
const Cineplex = require("../models/Cineplex");
const MovieTicket = require("../models/MovieTicket");
const MovieTransaction = require("../models/MovieTransaction");
const Screening = require("../models/Screening");
const Seat = require("../models/Seat");
const { ObjectId } = require("mongodb");

partnershipRouter.post(
  "/cineplex/claim-ticket",
  expressAsyncHandler(async (req, res) => {
    let { authorization } = req.headers;
    let { ticket_id } = req.body;
    if (!ticket_id) {
      return res.status(400).send({ message: "Ticket ID Missing" });
    }
    if (!authorization) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    let findCineplex = await Cineplex.findById(authorization);
    if (!findCineplex) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    let findTicket = await MovieTicket.findById(ticket_id);
    console.log(findTicket);
    if (!findTicket.cineplex.equals(findCineplex._id)) {
      return res.status(403).send({ message: "Forbidden" });
    }
    if (findTicket.claimed) {
      return res.status(400).send({ message: "Ticket already claimed" });
    }
    findTicket.claimed = true;
    await findTicket.save();
    let findTransaction = await MovieTransaction.findById(
      findTicket.transaction
    ).lean();
    return res.status(200).send({
      message: "Ticket claimed",
      ticket_id,
      transaction: { ...findTransaction },
    });
  })
);
partnershipRouter.post(
  "/cineplex/offline-transaction",
  expressAsyncHandler(async (req, res) => {
    let { authorization } = req.headers;
    let { id_screening, seat_number } = req.body;

    if (!id_screening || !seat_number) {
      return res.status(400).send({ message: "Bad Request" });
    }
    if (!authorization) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    let findCineplex = await Cineplex.findById(authorization);
    if (!findCineplex) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    let findScreening = await Screening.findById(id_screening);
    if (!findScreening.cineplex.equals(findCineplex._id)) {
      return res.status(403).send({ message: "Forbidden" });
    }
    let findSeat = await Seat.findOne({
      seat_number,
      studio: findScreening.studio,
    });
    if (!findSeat) {
      return res.status(400).send({ message: "Invalid Seat Input" });
    }
    //cek kursi sudah dibeli lewat magneticket atau belum
    const findTicket = await MovieTicket.find({
      screening: id_screening,
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
    let takenSeats = taken_seats.map((seat) => seat.seat_number);
    if (takenSeats.includes(seat_number)) {
      return res
        .status(409)
        .send({ message: "Seat already booked via Magneticket" });
    }
    //cek kursi sudah dibeli lewat offline belum
    let findOfflineTicket = await MovieTicket.findOne({
      screening: id_screening,
      via: "OFFLINE",
      seats: [findSeat._id],
    });
    if (findOfflineTicket) {
      return res
        .status(409)
        .send({ message: "Seat already booked via Offline" });
    }
    let newTicket = new MovieTicket({
      cineplex: authorization,
      screening: id_screening,
      seats: [findSeat._id],
      via: "OFFLINE",
      claimed: true,
    });
    await newTicket.save();

    return res.status(200).send({
      message: `Seat ${seat_number} succesfully booked VIA OFFLINE`,
    });
  })
);

module.exports = partnershipRouter;
