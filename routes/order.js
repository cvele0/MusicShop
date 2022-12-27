const express = require("express");
const { sequelize, Order } = require("../models");

const route = express.Router();

module.exports = route;

route.get("/", async (req, res) => {
  try {
    const allOrders = await Order.findAll();
    return res.json(allOrders);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

