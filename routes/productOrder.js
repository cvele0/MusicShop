const express = require("express");
const { sequelize, ProductOrder } = require("../models");

const route = express.Router();

module.exports = route;

route.get("/", async (req, res) => {
  try {
    const allProductOrders = await ProductOrder.findAll();
    return res.json(allProductOrders);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

