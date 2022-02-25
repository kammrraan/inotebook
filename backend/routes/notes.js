const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Notes = require("../models/Notes");
require("dotenv").config();
const auth = require('./verifytoken');

// GET request

router.get("/",auth, async (req, res) => {
  try {
    const result = await Notes.find();
    res.json(result);
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/", async (req, res) => {
  const savedNote = await Notes.create({
    title: req.body.title,
    desc: req.body.desc,
  });

  res.json(savedNote);
});

module.exports = router;
