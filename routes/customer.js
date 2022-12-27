const express = require("express");
const { sequelize, Customer } = require("../models");

const route = express.Router();

module.exports = route;

route.get("/", async (req, res) => {
  try {
    const allCustomers = await Customer.findAll();
    return res.json(allCustomers);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

