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
  
    if (token == null) return res.status(401).json({ msg: err });
  
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

module.exports = route;