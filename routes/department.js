const express = require("express");
const { sequelize, Department } = require("../models");

const route = express.Router();

module.exports = route;

route.get("/", async (req, res) => {
  try {
    const allDepartments = await Department.findAll();
    return res.json(allDepartments);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

