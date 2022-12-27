const express = require("express");
const { sequelize, Shop } = require("../models");

const route = express.Router();

module.exports = route;

route.get("/", async (req, res) => {
  try {
    const allShops = await Shop.findAll();
    return res.json(allShops);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

