const user = require("../../models/user/user.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const twilioClient = require("../../utils/twilio");

module.exports = {
  doSignup: async (req, res) => {
    try {
      let { email, mobileNumber } = req.body;

      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json(errors);
        return;
      }

      // check existing user
      let existingUser;
      if (email) {
        existingUser = await user.findOne({ email: email });
      } else {
        existingUser = await user.findOne({ mobileNumber: mobileNumber });
      }

      if (existingUser) {
        res.json({ error: "User Already registerd" });
      } else {
        req.body.password = crypto
          .createHmac("sha256", req.body.password)
          .update("secret")
          .digest("hex");
        let newUser = await new user(req.body);
        let saveUser = await newUser.save();
        res.json(saveUser);
      }
    } catch (e) {
      res.status(402).json({ error: "something went wrong!" });
    }
  },

  //   loginuser
  doLogin: async function (req, res) {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json(errors);
        return;
      }

      let { email, mobileNumber, password } = req.body;

      let checkUserExist;
      if (email) {
        checkUserExist = await user.findOne({ email });
      } else {
        checkUserExist = await user.findOne({ mobileNumber });
      }

      if (!checkUserExist) {
        res.json({ error: "User not found" });
        return;
      }

      let hashPassword = await crypto
        .createHmac("sha256", password)
        .update("secret")
        .digest("hex");
      if (checkUserExist.password === hashPassword) {
        let userToken = await jwt.sign({ id: checkUserExist._id },process.env.JWT_SECRET);
        res.json({ success: true, userToken, user: checkUserExist });
      } else {
        res.json({ error: "validation failed" });
      }
    } catch (e) {
      console.log(e);
      res.json({ error: "something went wrong" });
    }
  },

  doLoginWithGoogle: async function (req, res) {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
      return;
    }

    try {
      let { email } = req.body;
      let existingUser = await user.findOne({ email: email });
      let userToken;

      if (!existingUser) {
        let newUser = await new user(req.body);
        let saveUser = await newUser.save();
        userToken = await jwt.sign(
          { id: saveUser._id },
          process.env.JWT_SECRET
        );
        res.json({ success: true, userToken, user: saveUser });
      } else {
        userToken = await jwt.sign(
          { id: existingUser._id },
          process.env.JWT_SECRET
        );
        res.json({ success: true, userToken, user: existingUser });
      }
    } catch (e) {
      console.log(e);
      res.json({ error: "something went wrong" });
    }
  },

  getMobileOtp: async function (req, res) {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json(errors);
        return;
      }

      let { mobileNumber, countryCode } = req.body;
      let fullNumber = countryCode.toString() + mobileNumber.toString();

      let response = await twilioClient.verify
        .services(process.env.TWILIO_SERVICE_ID)
        .verifications.create({ to: fullNumber, channel: "sms" });
      res.json(response);
    } catch (e) {
      console.log(e);
      res.json({ error: "something went wrong!!" });
    }
  },

  verifyMobileOtp: async function (req, res) {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json(errors);
        return;
      }

      let { mobileNumber, otp } = req.body;

      let response = await twilioClient.verify
        .services(process.env.TWILIO_SERVICE_ID)
        .verificationChecks.create({ to: mobileNumber, code: otp });

      if (!response.status) {
        res.json({ error: "otp verification failed" });
        return;
      }

      let existingUser = await user.findOne({ mobileNumber });
      let userToken;
      if (!existingUser) {
        let newUser = await new user({ mobileNumber });
        let saveUser = await newUser.save();
        userToken = await jwt.sign(
          { id: saveUser._id },
          process.env.JWT_SECRET
        );
        res.json({ success: true, userToken, user: saveUser });
      } else {
        userToken = await jwt.sign(
          { id: checkUserExist._id },
          process.env.JWT_SECRET
        );
        res.json({ success: true, userToken, user: existingUser });
      }
    } catch (e) {
      console.log(e.message);
      res.json({ error: "something went wrong" });
    }
  },
};
