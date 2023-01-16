const express = require('express');
const { sequelize, Customer } = require('../models');
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

route.get('/customers', (req, res) => {
    Customer.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/customers', (req, res) => {
    Customer.create({ 
                      name: req.body.name,
                      username: req.body.username,
                      password: req.body.password 
                    })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
});

route.delete('/customers', async (req, res) => {
    const customer = await Customer.findOne({ where: { id: req.body.id } });
    customer.destroy();
    res.send(customer);
})

route.put('/customers', async (req, res) => {
    nameHere = req.body.combobox.split(";")[0];
    usernameHere = req.body.combobox.split(";")[1];
    const customer = await Customer.findOne({ where: { name: nameHere, username: usernameHere } });
    customer.name = req.body.name;
    customer.username = req.body.username;
    await customer.save();
    res.send(customer);
})

module.exports = route;