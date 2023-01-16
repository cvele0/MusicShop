const express = require('express');
const { sequelize, Manufacturer } = require('../models');
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

route.get('/manufacturers', (req, res) => {
   Manufacturer.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/manufacturers', (req, res) => {
   Manufacturer.create({ 
                      name: req.body.name
                    })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
});

route.delete('/manufacturers', async (req, res) => {
    const manufacturer = await Manufacturer.findOne({ where: { id: req.body.id } });
    manufacturer.destroy();
    res.send(manufacturer);
})

route.put('/manufacturers', async (req, res) => {
    const manufacturer = await Manufacturer.findOne({ where: { name: req.body.combobox } });
    manufacturer.name = req.body.name;
    await manufacturer.save();
    res.send(manufacturer);
})

module.exports = route;