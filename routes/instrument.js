const express = require("express");
const { sequelize, Instrument } = require("../models");

const route = express.Router();

module.exports = route;

route.get("/", async (req, res) => {
  try {
    const allInstruments = await Instrument.findAll();
    return res.json(allInstruments);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

