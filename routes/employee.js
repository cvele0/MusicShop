const express = require('express');
const { sequelize, Employee } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json((err)=>{ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

route.get('/employees', (req, res) => {
    Employee.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/employees', (req, res) => {
    Employee.create({ 
                      name: req.body.name,
                      surname: req.body.surname
                    })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
});

route.delete('/employees', async (req, res) => {
    const employee = await Employee.findOne({ where: { id: req.body.id } });
    employee.destroy();
    res.send(employee);
})

route.put('/employees', async (req, res) => {
    nameHere = req.body.combobox.split(";")[0];
    surnameHere = req.body.combobox.split(";")[1];
    const employee = await Employee.findOne({ where: { name: nameHere, surname: surnameHere } });
    employee.name = req.body.name;
    employee.surname = req.body.surname;
    await employee.save();
    res.send(employee);
})

module.exports = route;