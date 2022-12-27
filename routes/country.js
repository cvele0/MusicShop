const express = require('express');
const { sequelize, Country } = require('../models');
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

route.get('/countries', (req, res) => {
    Country.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/countries', (req, res) => {
    Country.create({ country: req.body.country })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
    /*Country.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin) {
                Country.create({ country: req.body.country })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );*/
        
});

module.exports = route;