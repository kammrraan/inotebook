const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = joi.object({
  name: joi.string().required().min(3).max(15),
  email: joi.string().email(),
  password: joi.string().required().min(5).max(15),
});

//GET request
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

//POST request/register user

router.post("/register/", async (req, res) => {
  //validate against scehema
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ errors: error.details[0].message });
  } else {
    try {
      //Hashing
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      //INSERT to db
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      res.json(user.email + "  registered successfully");
      console.log("user created successfulluy");
    } catch (err) {
      console.log(err);
      res.send("email alread taken");
    }
  }
});

//LOGIN ROUTE

router.post("/login/", async (req, res) => {
  //find user against email
  const findUser = await User.findOne({ email: req.body.email });

  if (!findUser) {
    res.send("email not found");
  } else {
    // compare passwords
    const verfied = await bcrypt.compare(req.body.password, findUser.password);

    if (verfied) {
      const token = jwt.sign(
        { _id: findUser._id, iat: Date.now() },
        process.env.SECRET
      );
      res.send(token);
    } else {
      res.send("email or password is wrong");
    }
  }
});
module.exports = router;
