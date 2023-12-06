require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const notificationsRouter = express.Router();
const expressAsyncHandler = require("express-async-handler");
const MovieTransaction = require("../models/MovieTransaction");
const MovieTicket = require("../models/MovieTicket");

notificationsRouter.post(
  "/handler",
  expressAsyncHandler(async (req, res) => {
    const inputString = `${req.body.order_id}${req.body.status_code}${req.body.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`;
    const sha512Hash = crypto.createHash("sha512");
    sha512Hash.update(inputString, "utf-8");
    const verifySignatureKey = sha512Hash.digest("hex");
    if (verifySignatureKey != req.body.signature_key) {
      return res.sendStatus(401);
    }
    console.log(req.body);
    if (req.body.status_code == 201) {
      return res.sendStatus(200);
    }
    if (req.body.transaction_status == "capture") {
      if (req.body.fraud_status == "accept") {
        console.log("MASUK ACCEPT");
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        //jangan lupa cek refund!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        let findTransaction = await MovieTransaction.findById(
          req.body.order_id
        );
        findTransaction.payment_method = req.body.payment_type;
        findTransaction.status = "SUCCESS";
        await findTransaction.save();
        return res.sendStatus(200);
      }
    } else if (req.body.transaction_status == "settlement") {
      // TODO set transaction status on your database to 'success'
      // and response with 200 OK
      // cek jika sudah sukses return 200
      console.log("MASUK ACCEPT");
      let findTransaction = await MovieTransaction.findById(req.body.order_id);
      findTransaction.payment_method = req.body.payment_type;
      findTransaction.status = "SUCCESS";
      await findTransaction.save();
      return res.sendStatus(200);
    } else if (
      req.body.transaction_status == "cancel" ||
      req.body.transaction_status == "deny" ||
      req.body.transaction_status == "expire"
    ) {
      // TODO set transaction status on your database to 'failure'
      // and response with 200 OK
      console.log("MASUK FAIL");
      MovieTicket.deleteOne({ transaction: req.body.order_id });
      let findTransaction = await MovieTransaction.findById(req.body.order_id);
      findTransaction.payment_method = req.body.payment_type;
      findTransaction.status = "FAILED";
      await findTransaction.save();
      return res.sendStatus(200);
    } else if (req.body.transaction_status == "pending") {
      console.log("MASUK PENDING");
      let findTransaction = await MovieTransaction.findById(req.body.order_id);
      findTransaction.payment_method = req.body.payment_type;
      if (findTransaction.status == "-") {
        findTransaction.status = "PENDING";
      }
      await findTransaction.save();
      return res.sendStatus(200);
    } else {
      console.log("ZONK");
      return res.sendStatus(200);
    }
  })
);

module.exports = notificationsRouter;
