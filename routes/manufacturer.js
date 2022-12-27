const express = require("express");
const { sequelize, Manufacturer } = require("../models");

const route = express.Router();

module.exports = route;

route.get("/", async (req, res) => {
  try {
    const allManufacturers = await Manufacturer.findAll();
    return res.json(allManufacturers);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

