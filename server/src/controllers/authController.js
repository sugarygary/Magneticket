require("dotenv").config();
const User = require("../models/User");
const { GMAIL_ACC, GMAIL_APP_PASSWORD, BACKEND_URL, FRONTEND_URL } =
  process.env;
const nodemailer = require("nodemailer");
const multer = require("multer");
const { body, validationResult } = require("express-validator");
const generateToken = require("../util/generateToken");
const Cineplex = require("../models/Cineplex");
const Promotor = require("../models/Promotor");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_ACC,
    pass: GMAIL_APP_PASSWORD,
  },
});

const validateRegister = [
  body("email")
    .notEmpty()
    .withMessage("Field cannot be empty")
    .isEmail()
    .withMessage("Invalid e-mail address"),
  body("password").notEmpty().withMessage("Field cannot be empty"),
  body("full_name").notEmpty().withMessage("Field cannot be empty"),
];
const validateRegisterCineplex = [
  body("email")
    .notEmpty()
    .withMessage("Field cannot be empty")
    .isEmail()
    .withMessage("Invalid e-mail address"),
  body("password").notEmpty().withMessage("Field cannot be empty"),
  body("company_name").notEmpty().withMessage("Field cannot be empty"),
  body("brand_name").notEmpty().withMessage("Field cannot be empty"),
];

const registerUser = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  let { email, password, full_name } = req.body;
  let findUser = await User.findOne({ email });
  if (findUser !== null) {
    res.status(409);
    throw new Error("Email already exists");
  }
  let newUser = new User({
    email: email,
    password: password,
    full_name: full_name,
  });
  await newUser.save();
  const link = `${BACKEND_URL}/api/auth/activate-user/${newUser._id.toString()}`;
  const result = await transporter.sendMail({
    from: GMAIL_ACC,
    to: email,
    subject: "Activate Your Account",
    html: `
      Activate your account with the link below
      <br>
      <table width="100%" cellspacing="0" cellpadding="0">
              <tr>
                 <td>
                  <table cellspacing="0" cellpadding="0">
                  <tr>
                      <td style="border-radius: 2px;" bgcolor="#1F2A37">
                          <a href="${link}" target="_blank" style="padding: 8px 12px; border: 1px solid #1F2A37; border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
                              Activate Your Accunt
                          </a>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
    </table>`,
  });
  return res.status(201).send({
    message: "User created, please verify email",
    _id: newUser._id.toString(),
    email: newUser.email,
    full_name: newUser.full_name,
    activated: newUser.activated,
  });
};

const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Field cannot be empty")
    .isEmail()
    .withMessage("Invalid e-mail address"),
  body("password").notEmpty().withMessage("Field cannot be empty"),
];

const loginUser = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const findUser = await User.findByEmail(email);
  if (findUser === null) {
    res.status(400);
    throw new Error("Invalid email or password");
  }
  let matchPassword = await findUser.comparePassword(password);
  if (!matchPassword) {
    res.status(400);
    throw new Error("Invalid email or password");
  }
  if (!findUser.activated) {
    res.status(403);
    throw new Error("Please activate your account");
  }
  generateToken(
    res,
    findUser._id.toString(),
    "USER",
    findUser.email,
    findUser.full_name
  );
  return res.status(200).send({
    message: "Login success",
    _id: findUser._id.toString(),
    email: findUser.email,
    full_name: findUser.full_name,
    activated: findUser.activated,
  });
};

const currentUser = async function (req, res) {
  const token = req.cookies.magneticket_token;
  if (!token) {
    return res
      .status(200)
      .send({ userId: null, role: null, email: null, display_name: null });
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return res.status(200).send({
    userId: verified.userId,
    role: verified.role,
    email: verified.email,
    display_name: verified.display_name,
  });
};

const logout = async function (req, res) {
  res.clearCookie("magneticket_token");
  res.status(200);
  return res.send({ message: "Logout success" });
};

const activateUser = async function (req, res) {
  let findUser = await User.findById(req.params.user_id);
  if (findUser == null) {
    return res.status(404).send({ message: "Invalid Code" });
  }
  await findUser.activate();
  res.status(301).redirect(FRONTEND_URL);
};

//#region bioskop
const storage_npwp_cineplex = multer.diskStorage({
  destination: "uploads/cineplex",
  filename: function (req, file, cb) {
    if (file.fieldname === "npwp") {
      cb(null, file.fieldname + +"_abc" + +path.extname(file.originalname));
    } else if (file.fieldname === "surat") {
      cb(
        null,
        file.fieldname + +"_" + "abc" + +path.extname(file.originalname)
      );
    }
  },
});
// const upload_cineplex = multer({
//   dest: path.join(__dirname, "public/uploads"),
//   limits: { fileSize: 1000000 },
//   fileFilter: function (req, file, cb) {
//     if (
//       file.mimetype != "image/jpg" &&
//       file.mimetype != "image/jpeg" &&
//       file.mimetype != "image/png"
//     ) {
//       return cb(new Error("Invalid file format"), null);
//     }
//     cb(null, true);
//   },
// });
// const uploadFile = upload_cineplex.single("photo");
let storage_cineplex = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/cineplex"));
  },

  filename: function (req, file, cb) {
    let filename = file.fieldname + "_" + file.originalname;
    cb(null, filename);
  },
});

let upload_cineplex = multer({
  storage: storage_cineplex,
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
let registerCineplexMulter = upload_cineplex.fields([
  { name: "npwp", maxCount: 1 },
  { name: "surat", maxCount: 1 },
]);
const registerCineplex = async function (req, res) {
  const errors = validationResult(req);
  if (!req.files?.npwp || !req.files?.surat) {
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/cineplex/${req.files.npwp[0].filename}`
      )
    );
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/cineplex/${req.files.surat[0].filename}`
      )
    );
    return res.status(400).send({ message: "Image must be included" });
  }
  if (!errors.isEmpty()) {
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/cineplex/${req.files.npwp[0].filename}`
      )
    );
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/cineplex/${req.files.surat[0].filename}`
      )
    );
    return res.status(400).send({ errors: errors.array() });
  }
  let { email, password, company_name, brand_name } = req.body;
  let findCineplex = await Cineplex.findByEmail(email);
  if (findCineplex !== null) {
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/cineplex/${req.files.npwp[0].filename}`
      )
    );
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/cineplex/${req.files.surat[0].filename}`
      )
    );
    res.status(409);
    throw new Error("Email already exists");
  }
  let newCineplex = new Cineplex({
    email: email,
    password: password,
    company_name: company_name,
    brand_name: brand_name,
  });
  fs.renameSync(
    path.join(
      __dirname,
      `../../uploads/cineplex/${req.files.npwp[0].filename}`
    ),
    path.join(__dirname, `../../uploads/cineplex/npwp-${newCineplex._id}.jpg`)
  );
  fs.renameSync(
    path.join(
      __dirname,
      `../../uploads/cineplex/${req.files.surat[0].filename}`
    ),
    path.join(__dirname, `../../uploads/cineplex/surat-${newCineplex._id}.jpg`)
  );
  await newCineplex.save();
  const link = `${BACKEND_URL}/api/auth/activate-cineplex/${newCineplex._id.toString()}`;
  const result = await transporter.sendMail({
    from: GMAIL_ACC,
    to: email,
    subject: "Activate Your Account",
    html: `
      Activate your account with the link below
      <br>
      <table width="100%" cellspacing="0" cellpadding="0">
              <tr>
                 <td>
                  <table cellspacing="0" cellpadding="0">
                  <tr>
                      <td style="border-radius: 2px;" bgcolor="#1F2A37">
                          <a href="${link}" target="_blank" style="padding: 8px 12px; border: 1px solid #1F2A37; border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
                              Activate Your Accunt
                          </a>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
    </table>`,
  });
  return res.status(201).send({
    message: "Cineplex created, please verify email",
    _id: newCineplex._id.toString(),
    email: newCineplex.email,
    company_name: newCineplex.company_name,
    brand_name: newCineplex.brand_name,
    activated: newCineplex.activated,
    verified: newCineplex.verified,
  });
};
const activateCineplex = async function (req, res) {
  let findCineplex = await Cineplex.findById(req.params.cineplex_id);
  if (findCineplex == null) {
    return res.status(404).send({ message: "Invalid Code" });
  }
  await findCineplex.activate();
  res.status(301).redirect(FRONTEND_URL);
};
const loginCineplex = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const temp = await Cineplex.find();
  const findCineplex = await Cineplex.findByEmail(email);
  if (findCineplex === null) {
    res.status(400);
    throw new Error("Invalid email or password");
  }
  let matchPassword = await findCineplex.comparePassword(password);
  if (!matchPassword) {
    res.status(400);
    throw new Error("Invalid email or password");
  }
  if (!findCineplex.activated) {
    res.status(403);
    throw new Error("Please activate your account");
  }
  if (!findCineplex.verified) {
    res.status(403);
    throw new Error("Please wait for the verification for your account :)");
  }
  generateToken(
    res,
    findCineplex._id.toString(),
    "CINEPLEX",
    findCineplex.email,
    findCineplex.brand_name
  );
  return res.status(200).send({
    message: "Login success",
    _id: findCineplex._id.toString(),
    email: findCineplex.email,
    company_name: findCineplex.company_name,
    brand_name: findCineplex.brand_name,
    activated: findCineplex.activated,
    verified: findCineplex.verified,
  });
};

//#endregion

//#region promotor
let storage_promotor = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/promotor"));
  },

  filename: function (req, file, cb) {
    let filename = file.fieldname + "_" + file.originalname;
    cb(null, filename);
  },
});
let upload_promotor = multer({
  storage: storage_promotor,
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
let registerPromotorMulter = upload_promotor.fields([
  { name: "npwp", maxCount: 1 },
  { name: "surat", maxCount: 1 },
]);
const registerPromotor = async function (req, res) {
  const errors = validationResult(req);
  if (!req.files?.npwp || !req.files?.surat) {
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/promotor/${req.files.npwp[0].filename}`
      )
    );
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
        `../../uploads/promotor/${req.files.npwp[0].filename}`
      )
    );
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/promotor/${req.files.surat[0].filename}`
      )
    );
    return res.status(400).send({ errors: errors.array() });
  }
  let { email, password, company_name, brand_name } = req.body;
  let findPromotor = await Promotor.findByEmail(email);
  if (findPromotor !== null) {
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/promotor/${req.files.npwp[0].filename}`
      )
    );
    fs.unlinkSync(
      path.join(
        __dirname,
        `../../uploads/promotor/${req.files.surat[0].filename}`
      )
    );
    res.status(409);
    throw new Error("Email already exists");
  }
  let newPromotor = new Promotor({
    email: email,
    password: password,
    company_name: company_name,
    brand_name: brand_name,
  });
  fs.renameSync(
    path.join(
      __dirname,
      `../../uploads/promotor/${req.files.npwp[0].filename}`
    ),
    path.join(__dirname, `../../uploads/promotor/npwp-${newPromotor._id}.jpg`)
  );
  fs.renameSync(
    path.join(
      __dirname,
      `../../uploads/promotor/${req.files.surat[0].filename}`
    ),
    path.join(__dirname, `../../uploads/promotor/surat-${newPromotor._id}.jpg`)
  );
  await newPromotor.save();
  const link = `${BACKEND_URL}/api/auth/activate-promotor/${newPromotor._id.toString()}`;
  const result = await transporter.sendMail({
    from: GMAIL_ACC,
    to: email,
    subject: "Activate Your Account",
    html: `
      Activate your account with the link below
      <br>
      <table width="100%" cellspacing="0" cellpadding="0">
              <tr>
                 <td>
                  <table cellspacing="0" cellpadding="0">
                  <tr>
                      <td style="border-radius: 2px;" bgcolor="#1F2A37">
                          <a href="${link}" target="_blank" style="padding: 8px 12px; border: 1px solid #1F2A37; border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
                              Activate Your Accunt
                          </a>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
    </table>`,
  });
  return res.status(201).send({
    message: "Promotor created, please verify email",
    _id: newPromotor._id.toString(),
    email: newPromotor.email,
    company_name: newPromotor.company_name,
    brand_name: newPromotor.brand_name,
    activated: newPromotor.activated,
    verified: newPromotor.verified,
  });
};
const activatePromotor = async function (req, res) {
  let findPromotor = await Promotor.findById(req.params.promotor_id);
  if (findPromotor == null) {
    return res.status(404).send({ message: "Invalid Code" });
  }
  await findPromotor.activate();
  res.status(301).redirect(FRONTEND_URL);
};
const loginPromotor = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const findPromotor = await Promotor.findByEmail(email);
  if (findPromotor === null) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  let matchPassword = await findPromotor.comparePassword(password);
  if (!matchPassword) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  if (!findPromotor.activated) {
    res.status(403);
    throw new Error("Please activate your account");
  }
  if (!findPromotor.verified) {
    res.status(403);
    throw new Error("Please wait for the verification for your account :)");
  }
  generateToken(
    res,
    findPromotor._id.toString(),
    "PROMOTOR",
    findPromotor.email,
    findPromotor.brand_name
  );
  return res.status(200).send({
    message: "Login success",
    _id: findPromotor._id.toString(),
    email: findPromotor.email,
    company_name: findPromotor.company_name,
    brand_name: findPromotor.brand_name,
    activated: findPromotor.activated,
    verified: findPromotor.verified,
  });
};
const validateRegisterPromotor = [
  body("email")
    .notEmpty()
    .withMessage("Field cannot be empty")
    .isEmail()
    .withMessage("Invalid e-mail address"),
  body("password").notEmpty().withMessage("Field cannot be empty"),
  body("company_name").notEmpty().withMessage("Field cannot be empty"),
  body("brand_name").notEmpty().withMessage("Field cannot be empty"),
];
//#endregion
module.exports = {
  registerUser,
  loginUser,
  validateLogin,
  activateUser,
  validateRegister,
  logout,
  registerCineplex,
  loginCineplex,
  validateRegisterCineplex,
  activateCineplex,
  validateRegisterPromotor,
  registerPromotor,
  activatePromotor,
  loginPromotor,
  currentUser,
  registerCineplexMulter,
  registerPromotorMulter,
};
