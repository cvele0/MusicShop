const express = require('express');
const { sequelize, Instrument } = require('../models');
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

route.get('/instruments', (req, res) => {
    Instrument.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/instruments', (req, res) => {
    Instrument.create({ 
                      name: req.body.name,
                      brand: req.body.brand
                    })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
});

route.delete('/instruments', async (req, res) => {
    const instrument = await Instrument.findOne({ where: { id: req.body.id } });
    instrument.destroy();
    res.send(instrument);
})

module.exports = route;