const express = require('express');
const { sequelize, AvailableInstruments } = require('../models');
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

route.get('/availableInstruments', (req, res) => {
    AvailableInstruments.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

// route.delete('/availableInstruments', async (req, res) => {
//     const instrument = await AvailableInstruments.findOne({ where: { name: req.body.name, brand: req.body.brand } });
//     instrument.destroy();
//     res.send(instrument);
// })

module.exports = route;