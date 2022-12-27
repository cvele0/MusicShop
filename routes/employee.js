const express = require("express");
const { sequelize, Employee } = require("../models");

const route = express.Router();

module.exports = route;

route.get("/", async (req, res) => {
  try {
    const allEmployees = await Employee.findAll();
    return res.json(allEmployees);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
});

/*route.get("/:id", async (req, res) => {
  try{
    let employee = await Employee.findByPk(req.params.id);
    let studenti = await smer.getStudents();
    return res.json( studenti );    
  } catch(err){
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
}
});*/
