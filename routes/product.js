const express = require("express");
const { sequelize, Product } = require("../models");

const route = express.Router();

module.exports = route;

route.get("/", async (req, res) => {
  try {
    const allProducts = await Product.findAll();
    return res.json(allProducts);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

